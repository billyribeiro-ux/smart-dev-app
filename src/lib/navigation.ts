import type { Component } from 'svelte';
import {
	BookOpen,
	ChartBar,
	CompassTool,
	DiamondsFour,
	FlowArrow,
	House,
	Notepad,
	RoadHorizon,
	Stack
} from 'phosphor-svelte';

export type AppHref =
	| '/'
	| '/projects'
	| '/blueprint'
	| '/readiness'
	| '/roadmap'
	| '/journal'
	| '/templates'
	| '/insights'
	| '/settings';

export type NavItem = {
	href: AppHref;
	label: string;
	description: string;
	icon: Component<{ size?: string | number }>;
};

export const navItems: NavItem[] = [
	{
		href: '/',
		label: 'Workspace Home',
		description: 'Priority snapshot and next action',
		icon: House
	},
	{
		href: '/projects',
		label: 'Projects',
		description: 'Project lifecycle and scope',
		icon: Stack
	},
	{
		href: '/blueprint',
		label: 'Blueprint Studio',
		description: 'Entity / action / rule modeling',
		icon: CompassTool
	},
	{
		href: '/readiness',
		label: 'Skills',
		description: 'Readiness and capability gap report',
		icon: ChartBar
	},
	{
		href: '/roadmap',
		label: 'Roadmap',
		description: 'Dependency-aware sequence',
		icon: RoadHorizon
	},
	{
		href: '/journal',
		label: 'Journal',
		description: 'Decision rationale and review notes',
		icon: Notepad
	},
	{
		href: '/templates',
		label: 'Templates',
		description: 'Archetypes and implementation patterns',
		icon: DiamondsFour
	},
	{
		href: '/insights',
		label: 'Insights',
		description: 'Longitudinal growth and reflection',
		icon: FlowArrow
	},
	{
		href: '/settings',
		label: 'Settings',
		description: 'Workspace and guidance preferences',
		icon: BookOpen
	}
];
