export type ArchetypePattern = {
	name: string;
	signals: string[];
	impliedRequirements: string[];
	riskAmplifiers: string[];
};

export const archetypePatterns: ArchetypePattern[] = [
	{
		name: 'developer-workspace',
		signals: ['workspace', 'blueprint', 'milestone', 'readiness'],
		impliedRequirements: ['state consistency', 'versioning', 'artifact traceability'],
		riskAmplifiers: ['scope creep', 'under-specified rules']
	},
	{
		name: 'marketplace',
		signals: ['listing', 'transaction', 'trust', 'review'],
		impliedRequirements: ['moderation', 'dispute flow', 'reputation model'],
		riskAmplifiers: ['permission complexity', 'cross-party edge cases']
	},
	{
		name: 'analytics-platform',
		signals: ['metric', 'event', 'dashboard', 'insight'],
		impliedRequirements: ['instrumentation schema', 'data freshness guarantees'],
		riskAmplifiers: ['event drift', 'inconsistent attribution']
	}
];

export function inferArchetypeSignals(content: string): ArchetypePattern[] {
	const normalized = content.toLowerCase();
	return archetypePatterns.filter((pattern) =>
		pattern.signals.some((signal) => normalized.includes(signal))
	);
}
