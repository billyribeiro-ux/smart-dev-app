import { z } from 'zod';

export const skillDomains = [
	'productDiscovery',
	'frontend',
	'backend',
	'dataModeling',
	'authSecurity',
	'testingQuality',
	'deploymentOps',
	'architecture'
] as const;

export type SkillDomain = (typeof skillDomains)[number];

export const scopeVariants = ['foundational', 'reduced', 'full'] as const;
export type ScopeVariant = (typeof scopeVariants)[number];

export const projectStatus = ['intake', 'blueprinting', 'execution', 'review', 'archived'] as const;
export type ProjectStatus = (typeof projectStatus)[number];

export const actorTypes = ['endUser', 'admin', 'system', 'integration'] as const;
export type ActorType = (typeof actorTypes)[number];

export const entityRecordSchema = z.object({
	id: z.string(),
	name: z.string().min(2),
	description: z.string(),
	attributes: z.array(z.string()).min(1),
	lifecycleStates: z.array(z.string()).min(1),
	ownership: z.string()
});

export type EntityRecord = z.infer<typeof entityRecordSchema>;

export const actionRecordSchema = z.object({
	id: z.string(),
	actor: z.enum(actorTypes),
	intent: z.string().min(2),
	preconditions: z.array(z.string()),
	postconditions: z.array(z.string()),
	entityIds: z.array(z.string()).min(1)
});

export type ActionRecord = z.infer<typeof actionRecordSchema>;

export const ruleRecordSchema = z.object({
	id: z.string(),
	ruleType: z.enum(['validation', 'permission', 'invariant', 'operational']),
	description: z.string(),
	expression: z.string(),
	failureBehavior: z.string(),
	severity: z.enum(['low', 'medium', 'high', 'critical']),
	actionIds: z.array(z.string()),
	entityIds: z.array(z.string())
});

export type RuleRecord = z.infer<typeof ruleRecordSchema>;

export const screenRecordSchema = z.object({
	id: z.string(),
	name: z.string(),
	purpose: z.string(),
	dataInputs: z.array(z.string()),
	primaryActions: z.array(z.string()),
	edgeStates: z.array(z.string())
});

export type ScreenRecord = z.infer<typeof screenRecordSchema>;

export const flowStepSchema = z.object({
	screenId: z.string(),
	actionId: z.string().optional(),
	description: z.string()
});

export const flowRecordSchema = z.object({
	id: z.string(),
	name: z.string(),
	entryCondition: z.string(),
	steps: z.array(flowStepSchema).min(1),
	exceptionBranches: z.array(z.string())
});

export type FlowRecord = z.infer<typeof flowRecordSchema>;

export const projectIntentSchema = z.object({
	title: z.string().min(2),
	targetUser: z.string().min(2),
	problemStatement: z.string().min(8),
	coreOutcome: z.string().min(8),
	constraints: z.array(z.string()),
	assumptions: z.array(z.string()),
	domainType: z.string(),
	stackPreferences: z.array(z.string())
});

export type ProjectIntent = z.infer<typeof projectIntentSchema>;

export const architectureDirectionSchema = z.object({
	appShape: z.enum(['modular-monolith', 'service-oriented', 'event-driven']),
	dataStrategy: z.string(),
	authStrategy: z.string(),
	observabilityPlan: z.string(),
	notes: z.string()
});

export type ArchitectureDirection = z.infer<typeof architectureDirectionSchema>;

export const roadmapItemSchema = z.object({
	id: z.string(),
	phase: z.number().int().positive(),
	objective: z.string(),
	dependencyIds: z.array(z.string()),
	deliverables: z.array(z.string()),
	riskLevel: z.enum(['low', 'medium', 'high']),
	qualityGates: z.array(z.string())
});

export type RoadmapItem = z.infer<typeof roadmapItemSchema>;

export const milestoneSchema = z.object({
	id: z.string(),
	title: z.string(),
	outcome: z.string(),
	acceptanceCriteria: z.array(z.string()),
	dependencyIds: z.array(z.string()),
	status: z.enum(['notStarted', 'inProgress', 'complete'])
});

export type Milestone = z.infer<typeof milestoneSchema>;

export const skillRecordSchema = z.object({
	domain: z.enum(skillDomains),
	proficiencyBand: z.enum(['novice', 'developing', 'operational', 'advanced']),
	confidence: z.number().min(0).max(1),
	evidence: z.array(z.string())
});

export type SkillRecord = z.infer<typeof skillRecordSchema>;

export const gapItemSchema = z.object({
	domain: z.enum(skillDomains),
	requiredDepth: z.number().int().min(1).max(5),
	demonstratedDepth: z.number().int().min(1).max(5),
	gapSeverity: z.number().min(0).max(4),
	projectImpact: z.enum(['low', 'medium', 'high', 'critical']),
	recommendation: z.string()
});

export type GapItem = z.infer<typeof gapItemSchema>;

export const readinessAssessmentSchema = z.object({
	projectId: z.string(),
	readinessByDomain: z.record(z.enum(skillDomains), z.number().min(0).max(1)),
	confidenceBands: z.object({
		overall: z.number().min(0).max(1),
		uncertaintyDrivers: z.array(z.string())
	}),
	goNoGoRecommendation: z.enum(['go', 'goWithReducedScope', 'pauseAndUpskill']),
	scopeAdjustmentProposal: z.array(z.string()),
	gaps: z.array(gapItemSchema),
	explainabilityTrace: z.array(z.string())
});

export type ReadinessAssessment = z.infer<typeof readinessAssessmentSchema>;

export const decisionLogSchema = z.object({
	id: z.string(),
	decision: z.string(),
	alternatives: z.array(z.string()),
	rationale: z.string(),
	expectedOutcome: z.string(),
	reviewedOutcome: z.string().optional(),
	timestamp: z.string()
});

export type DecisionLog = z.infer<typeof decisionLogSchema>;

export const reflectionSummarySchema = z.object({
	planVsActualDiff: z.array(z.string()),
	keyDecisionsOutcome: z.array(z.string()),
	technicalLessons: z.array(z.string()),
	processLessons: z.array(z.string()),
	nextProjectCalibration: z.array(z.string())
});

export type ReflectionSummary = z.infer<typeof reflectionSummarySchema>;

export const blueprintSchema = z.object({
	id: z.string(),
	projectId: z.string(),
	version: z.number().positive(),
	scopeVariant: z.enum(scopeVariants),
	projectIntent: projectIntentSchema,
	entities: z.array(entityRecordSchema),
	actions: z.array(actionRecordSchema),
	rules: z.array(ruleRecordSchema),
	screens: z.array(screenRecordSchema),
	flows: z.array(flowRecordSchema),
	architectureDirection: architectureDirectionSchema,
	risks: z.array(z.string()),
	immediateNextActions: z.array(z.string())
});

export type Blueprint = z.infer<typeof blueprintSchema>;

export const projectSchema = z.object({
	id: z.string(),
	status: z.enum(projectStatus),
	intent: projectIntentSchema,
	blueprintId: z.string(),
	createdAt: z.string(),
	updatedAt: z.string()
});

export type Project = z.infer<typeof projectSchema>;

export const ontologyBundleSchema = z.object({
	project: projectSchema,
	blueprint: blueprintSchema,
	roadmap: z.array(roadmapItemSchema),
	milestones: z.array(milestoneSchema),
	skills: z.array(skillRecordSchema),
	readiness: readinessAssessmentSchema,
	decisions: z.array(decisionLogSchema),
	reflection: reflectionSummarySchema
});

export type OntologyBundle = z.infer<typeof ontologyBundleSchema>;
