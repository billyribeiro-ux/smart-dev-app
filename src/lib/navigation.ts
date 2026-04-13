import type { Component } from 'svelte';
import {
	BookOpenIcon,
	ChartBarIcon,
	CompassToolIcon,
	DiamondsFourIcon,
	FlowArrowIcon,
	HouseIcon,
	NotepadIcon,
	RoadHorizonIcon,
	StackIcon
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
		icon: HouseIcon
	},
	{
		href: '/projects',
		label: 'Projects',
		description: 'Project lifecycle and scope',
		icon: StackIcon
	},
	{
		href: '/blueprint',
		label: 'Blueprint Studio',
		description: 'Entity / action / rule modeling',
		icon: CompassToolIcon
	},
	{
		href: '/readiness',
		label: 'Skills',
		description: 'Readiness and capability gap report',
		icon: ChartBarIcon
	},
	{
		href: '/roadmap',
		label: 'Roadmap',
		description: 'Dependency-aware sequence',
		icon: RoadHorizonIcon
	},
	{
		href: '/journal',
		label: 'Journal',
		description: 'Decision rationale and review notes',
		icon: NotepadIcon
	},
	{
		href: '/templates',
		label: 'Templates',
		description: 'Archetypes and implementation patterns',
		icon: DiamondsFourIcon
	},
	{
		href: '/insights',
		label: 'Insights',
		description: 'Longitudinal growth and reflection',
		icon: FlowArrowIcon
	},
	{
		href: '/settings',
		label: 'Settings',
		description: 'Workspace and guidance preferences',
		icon: BookOpenIcon
	}
];
