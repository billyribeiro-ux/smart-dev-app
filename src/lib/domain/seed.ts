import { nanoid } from 'nanoid';
import type {
	Blueprint,
	DecisionLog,
	Milestone,
	Project,
	ReadinessAssessment,
	ReflectionSummary,
	RoadmapItem,
	SkillRecord
} from '$lib/domain/ontology';

const projectId = nanoid(8);
const blueprintId = nanoid(8);

export const seedProject: Project = {
	id: projectId,
	status: 'blueprinting',
	blueprintId,
	createdAt: new Date().toISOString(),
	updatedAt: new Date().toISOString(),
	intent: {
		title: 'Architect: Developer Thinking OS',
		targetUser: 'Self-taught developers and aspiring engineers',
		problemStatement:
			'Builders can code in frameworks but cannot reliably decompose product ideas into buildable plans.',
		coreOutcome:
			'Users move from ambiguity to a complete software execution blueprint with readiness and sequencing.',
		constraints: ['8-12 week execution cycles', 'Single product owner initially'],
		assumptions: ['Users will maintain a decision journal', 'Users accept structured guidance'],
		domainType: 'Developer tooling',
		stackPreferences: ['SvelteKit', 'TypeScript strict', 'PostgreSQL']
	}
};

export const seedBlueprint: Blueprint = {
	id: blueprintId,
	projectId,
	version: 1,
	scopeVariant: 'reduced',
	projectIntent: seedProject.intent,
	entities: [
		{
			id: nanoid(6),
			name: 'UserProfile',
			description: 'Represents capability baseline and growth trajectory.',
			attributes: ['experienceVector', 'goals', 'confidenceByDomain'],
			lifecycleStates: ['onboarded', 'active', 'reviewing'],
			ownership: 'user'
		},
		{
			id: nanoid(6),
			name: 'ProjectBlueprint',
			description: 'Canonical structured software plan.',
			attributes: ['scopeVariant', 'riskRegister', 'architectureDirection'],
			lifecycleStates: ['draft', 'locked', 'superseded'],
			ownership: 'workspace'
		},
		{
			id: nanoid(6),
			name: 'Milestone',
			description: 'Outcome checkpoint for implementation progress.',
			attributes: ['acceptanceCriteria', 'status', 'dependencyIds'],
			lifecycleStates: ['notStarted', 'inProgress', 'complete'],
			ownership: 'workspace'
		}
	],
	actions: [
		{
			id: nanoid(6),
			actor: 'endUser',
			intent: 'Capture and refine raw software idea',
			preconditions: ['Project workspace exists'],
			postconditions: ['Project intent is structured'],
			entityIds: []
		},
		{
			id: nanoid(6),
			actor: 'system',
			intent: 'Generate readiness assessment from blueprint + skill profile',
			preconditions: ['Blueprint has minimum decomposition completeness'],
			postconditions: ['Readiness recommendations available'],
			entityIds: []
		}
	],
	rules: [
		{
			id: nanoid(6),
			ruleType: 'invariant',
			description: 'Every action must reference at least one entity.',
			expression: 'actions.every(action => action.entityIds.length > 0)',
			failureBehavior: 'block-blueprint-lock',
			severity: 'high',
			actionIds: [],
			entityIds: []
		},
		{
			id: nanoid(6),
			ruleType: 'permission',
			description: 'Only project owner may lock blueprint version.',
			expression: 'actor.role === "owner"',
			failureBehavior: 'deny-operation',
			severity: 'critical',
			actionIds: [],
			entityIds: []
		}
	],
	screens: [
		{
			id: 'idea-intake',
			name: 'Idea Intake',
			purpose: 'Capture intent, user, and constraints.',
			dataInputs: ['title', 'target user', 'problem statement'],
			primaryActions: ['Generate decomposition draft'],
			edgeStates: ['missing outcome', 'scope too broad']
		},
		{
			id: 'blueprint-studio',
			name: 'Blueprint Studio',
			purpose: 'Refine entities, actions, rules, and flows.',
			dataInputs: ['entity map', 'action map', 'rule map'],
			primaryActions: ['Lock blueprint', 'Branch version'],
			edgeStates: ['incomplete decomposition']
		}
	],
	flows: [
		{
			id: nanoid(6),
			name: 'Idea to Blueprint',
			entryCondition: 'User has a raw concept',
			steps: [
				{
					screenId: 'idea-intake',
					description: 'Capture project intent and constraints.'
				},
				{
					screenId: 'blueprint-studio',
					description: 'Model entities, actions, rules, and flows.'
				}
			],
			exceptionBranches: ['scope exceeds readiness']
		}
	],
	architectureDirection: {
		appShape: 'modular-monolith',
		dataStrategy: 'PostgreSQL with typed contracts and immutable blueprint versions.',
		authStrategy: 'Session auth with role-scoped workspace permissions.',
		observabilityPlan: 'Trace key user flows and recommendation acceptance.',
		notes: 'Start with BFF in SvelteKit and split services only under load.'
	},
	risks: [
		'Users may expect generic chat output instead of structured artifacts.',
		'Overly complex ontology can increase onboarding friction.'
	],
	immediateNextActions: [
		'Complete action-to-entity references.',
		'Define readiness score weighting.',
		'Implement milestone quality gates.'
	]
};

seedBlueprint.actions = seedBlueprint.actions.map((action) => ({
	...action,
	entityIds: [seedBlueprint.entities[0].id, seedBlueprint.entities[1].id]
}));
seedBlueprint.rules = seedBlueprint.rules.map((rule) => ({
	...rule,
	actionIds: seedBlueprint.actions.map((action) => action.id),
	entityIds: seedBlueprint.entities.map((entity) => entity.id)
}));

export const seedRoadmap: RoadmapItem[] = [
	{
		id: nanoid(8),
		phase: 1,
		objective: 'Foundational platform setup',
		dependencyIds: [],
		deliverables: ['Auth shell', 'Ontology contracts', 'Idea intake'],
		riskLevel: 'medium',
		qualityGates: ['Contracts validated', 'Strict mode enabled']
	},
	{
		id: nanoid(8),
		phase: 2,
		objective: 'Artifact-first UX workflow',
		dependencyIds: [],
		deliverables: ['Blueprint workspace', 'Readiness view', 'Roadmap sequencing'],
		riskLevel: 'high',
		qualityGates: ['Navigation coherence', 'No dead-end user states']
	}
];

export const seedMilestones: Milestone[] = [
	{
		id: nanoid(8),
		title: 'Foundation Ready',
		outcome: 'Ontology and workspace shell are production-grade.',
		acceptanceCriteria: ['Core schemas compile', 'Landing to blueprint flow complete'],
		dependencyIds: [],
		status: 'inProgress'
	},
	{
		id: nanoid(8),
		title: 'Core Flow Operational',
		outcome: 'Users can generate blueprint and readiness report.',
		acceptanceCriteria: ['Readiness computes', 'Scope recommendations visible'],
		dependencyIds: [],
		status: 'notStarted'
	}
];

export const seedSkills: SkillRecord[] = [
	{
		domain: 'frontend',
		proficiencyBand: 'operational',
		confidence: 0.74,
		evidence: ['Shipped 3 Svelte apps']
	},
	{
		domain: 'dataModeling',
		proficiencyBand: 'developing',
		confidence: 0.41,
		evidence: ['Built CRUD schemas, limited migration strategy']
	},
	{
		domain: 'architecture',
		proficiencyBand: 'developing',
		confidence: 0.38,
		evidence: ['Can scaffold systems, limited tradeoff documentation']
	}
];

export const seedReadiness: ReadinessAssessment = {
	projectId,
	readinessByDomain: {
		productDiscovery: 0.62,
		frontend: 0.74,
		backend: 0.53,
		dataModeling: 0.41,
		authSecurity: 0.35,
		testingQuality: 0.45,
		deploymentOps: 0.33,
		architecture: 0.39
	},
	confidenceBands: {
		overall: 0.48,
		uncertaintyDrivers: ['Auth model unresolved', 'Data evolution strategy not explicit']
	},
	goNoGoRecommendation: 'goWithReducedScope',
	scopeAdjustmentProposal: [
		'Defer marketplace-style collaboration to phase 3.',
		'Start with single-owner workspaces and role expansion later.'
	],
	gaps: [],
	explainabilityTrace: [
		'High rule density with medium backend confidence.',
		'Multiple cross-domain flows indicate higher integration complexity.'
	]
};

export const seedDecisions: DecisionLog[] = [
	{
		id: nanoid(8),
		decision: 'Use modular monolith before service split',
		alternatives: ['Early microservices', 'Serverless-per-feature'],
		rationale: 'Faster iteration with lower coordination overhead.',
		expectedOutcome: 'Ship core workflows in under 8 weeks.',
		timestamp: new Date().toISOString()
	}
];

export const seedReflection: ReflectionSummary = {
	planVsActualDiff: ['Roadmap underestimated validation UX complexity by one sprint.'],
	keyDecisionsOutcome: ['Modular monolith improved velocity without immediate bottlenecks.'],
	technicalLessons: ['Entity-action-rule contracts reduced ambiguous implementation debates.'],
	processLessons: ['Weekly decision reviews caught scope creep early.'],
	nextProjectCalibration: [
		'Increase data modeling depth before adding team collaboration features.'
	]
};
