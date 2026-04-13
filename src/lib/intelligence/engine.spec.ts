import { describe, expect, it } from 'vitest';
import { seedBlueprint, seedSkills } from '$lib/domain/seed';
import { runHybridReasoning } from '$lib/intelligence/engine';

describe('runHybridReasoning', () => {
	it('returns explainable readiness output with gaps', () => {
		const result = runHybridReasoning(seedBlueprint.projectId, seedBlueprint, seedSkills);

		expect(result.readiness.gaps.length).toBeGreaterThan(0);
		expect(result.readiness.explainabilityTrace.length).toBeGreaterThanOrEqual(3);
		expect(result.readiness.confidenceBands.overall).toBeGreaterThan(0);
	});

	it('returns scope reductions when readiness is low', () => {
		const weakSkills = seedSkills.map((skill) => ({
			...skill,
			proficiencyBand: 'novice' as const,
			confidence: 0.1
		}));
		const result = runHybridReasoning(seedBlueprint.projectId, seedBlueprint, weakSkills);

		expect(['go', 'goWithReducedScope', 'pauseAndUpskill']).toContain(
			result.readiness.goNoGoRecommendation
		);
		expect(result.reducedScopeRecommendation.length).toBeGreaterThan(0);
	});
});
