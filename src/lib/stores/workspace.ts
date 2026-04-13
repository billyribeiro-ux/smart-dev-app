import { derived, writable } from 'svelte/store';
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
import {
	seedBlueprint,
	seedDecisions,
	seedMilestones,
	seedProject,
	seedReadiness,
	seedReflection,
	seedRoadmap,
	seedSkills
} from '$lib/domain/seed';
import { runHybridReasoning } from '$lib/intelligence/engine';

type WorkspaceState = {
	project: Project;
	blueprint: Blueprint;
	roadmap: RoadmapItem[];
	milestones: Milestone[];
	skills: SkillRecord[];
	readiness: ReadinessAssessment;
	decisions: DecisionLog[];
	reflection: ReflectionSummary;
	mode: 'essential' | 'advanced';
};

const initialState: WorkspaceState = {
	project: seedProject,
	blueprint: seedBlueprint,
	roadmap: seedRoadmap,
	milestones: seedMilestones,
	skills: seedSkills,
	readiness: seedReadiness,
	decisions: seedDecisions,
	reflection: seedReflection,
	mode: 'essential'
};

function createWorkspaceStore() {
	const { subscribe, update, set } = writable<WorkspaceState>(initialState);

	return {
		subscribe,
		reset: () => set(initialState),
		setMode: (mode: WorkspaceState['mode']) => update((state) => ({ ...state, mode })),
		updateIdea: (payload: Partial<Project['intent']>) =>
			update((state) => ({
				...state,
				project: { ...state.project, intent: { ...state.project.intent, ...payload } },
				blueprint: {
					...state.blueprint,
					projectIntent: { ...state.blueprint.projectIntent, ...payload }
				}
			})),
		recomputeReadiness: () =>
			update((state) => {
				const result = runHybridReasoning(state.project.id, state.blueprint, state.skills);
				return { ...state, readiness: result.readiness };
			}),
		setReadiness: (readiness: ReadinessAssessment) =>
			update((state) => ({
				...state,
				readiness
			})),
		addDecision: (entry: DecisionLog) =>
			update((state) => ({
				...state,
				decisions: [entry, ...state.decisions]
			}))
	};
}

export const workspaceStore = createWorkspaceStore();

export const workspaceHealth = derived(workspaceStore, ($workspace) => {
	const overall = $workspace.readiness.confidenceBands.overall;
	const blockedMilestones = $workspace.milestones.filter((m) => m.status === 'notStarted').length;
	const criticalGaps = $workspace.readiness.gaps.filter(
		(gap) => gap.projectImpact === 'critical'
	).length;

	return {
		overall,
		blockedMilestones,
		criticalGaps
	};
});
