import type {
	Blueprint,
	GapItem,
	ReadinessAssessment,
	SkillDomain,
	SkillRecord
} from '$lib/domain/ontology';
import { skillDomains } from '$lib/domain/ontology';
import { inferArchetypeSignals } from '$lib/intelligence/patterns';

type ComplexitySignals = {
	entityCount: number;
	actionCount: number;
	ruleCount: number;
	flowCount: number;
	assumptionCount: number;
	riskCount: number;
};

export type IntelligenceResult = {
	readiness: ReadinessAssessment;
	complexityScore: number;
	reducedScopeRecommendation: string[];
	learnBeforeBuild: string[];
};

const domainDepthWeights: Record<SkillDomain, number> = {
	productDiscovery: 2,
	frontend: 3,
	backend: 3,
	dataModeling: 4,
	authSecurity: 4,
	testingQuality: 3,
	deploymentOps: 3,
	architecture: 5
};

const domainKeywords: Record<SkillDomain, string[]> = {
	productDiscovery: ['problem', 'user', 'outcome', 'scope'],
	frontend: ['screen', 'ui', 'interaction', 'component'],
	backend: ['api', 'server', 'service', 'worker'],
	dataModeling: ['entity', 'schema', 'relationship', 'state'],
	authSecurity: ['auth', 'permission', 'role', 'security'],
	testingQuality: ['test', 'quality', 'validation', 'gate'],
	deploymentOps: ['deploy', 'environment', 'observability', 'infra'],
	architecture: ['tradeoff', 'architecture', 'boundary', 'modular']
};

const proficiencyDepth: Record<SkillRecord['proficiencyBand'], number> = {
	novice: 1,
	developing: 2,
	operational: 3,
	advanced: 4
};

export function computeComplexitySignals(blueprint: Blueprint): ComplexitySignals {
	return {
		entityCount: blueprint.entities.length,
		actionCount: blueprint.actions.length,
		ruleCount: blueprint.rules.length,
		flowCount: blueprint.flows.length,
		assumptionCount: blueprint.projectIntent.assumptions.length,
		riskCount: blueprint.risks.length
	};
}

export function inferComplexityScore(signals: ComplexitySignals): number {
	const weighted =
		signals.entityCount * 1.2 +
		signals.actionCount * 1.1 +
		signals.ruleCount * 1.6 +
		signals.flowCount * 1.3 +
		signals.assumptionCount * 0.7 +
		signals.riskCount * 0.9;

	return Math.min(1, weighted / 25);
}

function inferRequiredDepth(blueprint: Blueprint, domain: SkillDomain): number {
	const content = [
		blueprint.projectIntent.problemStatement,
		blueprint.projectIntent.coreOutcome,
		blueprint.architectureDirection.notes,
		...blueprint.rules.map((rule) => rule.description),
		...blueprint.actions.map((action) => action.intent)
	]
		.join(' ')
		.toLowerCase();

	const keywordHits = domainKeywords[domain].filter((keyword) => content.includes(keyword)).length;
	const rulePressure = blueprint.rules.length / Math.max(1, blueprint.actions.length);
	const depth = Math.ceil((keywordHits + rulePressure + domainDepthWeights[domain] / 2) / 2);

	return Math.min(5, Math.max(1, depth));
}

function demonstratedDepth(skills: SkillRecord[], domain: SkillDomain): number {
	const skill = skills.find((item) => item.domain === domain);
	if (!skill) return 1;
	return Math.min(5, proficiencyDepth[skill.proficiencyBand] + Math.round(skill.confidence));
}

function mapGapToImpact(gapSeverity: number): GapItem['projectImpact'] {
	if (gapSeverity >= 3) return 'critical';
	if (gapSeverity >= 2) return 'high';
	if (gapSeverity >= 1) return 'medium';
	return 'low';
}

function recommendationForDomain(domain: SkillDomain, gapSeverity: number): string {
	if (gapSeverity < 1) return `Maintain current ${domain} strength with milestone-linked practice.`;
	if (gapSeverity < 2) return `Add targeted ${domain} refreshers before phase 2 milestones.`;
	return `Block high-risk milestones until ${domain} capability is reinforced with a concrete practice task.`;
}

export function runHybridReasoning(
	projectId: string,
	blueprint: Blueprint,
	skills: SkillRecord[]
): IntelligenceResult {
	const signals = computeComplexitySignals(blueprint);
	const complexityScore = inferComplexityScore(signals);
	const archetypes = inferArchetypeSignals(
		[
			blueprint.projectIntent.title,
			blueprint.projectIntent.problemStatement,
			blueprint.projectIntent.coreOutcome
		].join(' ')
	);

	const gaps: GapItem[] = skillDomains.map((domain) => {
		const requiredDepth = inferRequiredDepth(blueprint, domain);
		const demonstrated = demonstratedDepth(skills, domain);
		const gapSeverity = Math.max(0, requiredDepth - demonstrated);

		return {
			domain,
			requiredDepth,
			demonstratedDepth: demonstrated,
			gapSeverity,
			projectImpact: mapGapToImpact(gapSeverity),
			recommendation: recommendationForDomain(domain, gapSeverity)
		};
	});

	const readinessByDomain = Object.fromEntries(
		gaps.map((gap) => [gap.domain, Math.max(0.1, 1 - gap.gapSeverity / 4)])
	) as ReadinessAssessment['readinessByDomain'];

	const overall =
		Object.values(readinessByDomain).reduce((sum, score) => sum + score, 0) / skillDomains.length;
	const highRiskGaps = gaps.filter(
		(gap) => gap.projectImpact === 'critical' || gap.projectImpact === 'high'
	);

	const overreachSignal = complexityScore > 0.55 && overall < 0.55 && highRiskGaps.length >= 2;
	const goNoGoRecommendation = overreachSignal
		? 'goWithReducedScope'
		: overall > 0.62
			? 'go'
			: 'pauseAndUpskill';

	const reducedScopeRecommendation = [
		'Focus v1 on single-user workspace and defer collaboration.',
		'Keep architecture modular-monolith until throughput metrics justify split.',
		'Implement only critical-path flows before template expansion.'
	];
	const archetypeHints = archetypes.flatMap((pattern) => pattern.impliedRequirements).slice(0, 2);

	const learnBeforeBuild = highRiskGaps
		.map((gap) => `${gap.domain}: ${gap.recommendation}`)
		.slice(0, 4);

	const readiness: ReadinessAssessment = {
		projectId,
		readinessByDomain,
		confidenceBands: {
			overall,
			uncertaintyDrivers: [
				`Complexity signal score: ${complexityScore.toFixed(2)}`,
				`${highRiskGaps.length} high-risk capability gaps detected`
			]
		},
		goNoGoRecommendation,
		scopeAdjustmentProposal: reducedScopeRecommendation,
		gaps,
		explainabilityTrace: [
			'Deterministic layer evaluated decomposition density and rule complexity.',
			`Pattern layer matched archetypes: ${archetypes.map((item) => item.name).join(', ') || 'none'}.`,
			`Archetype implications: ${archetypeHints.join('; ') || 'N/A'}.`,
			'Recommendation layer generated milestone-safe scope reductions.'
		]
	};

	return {
		readiness,
		complexityScore,
		reducedScopeRecommendation,
		learnBeforeBuild
	};
}
