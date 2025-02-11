

import LayersIcon from '@mui/icons-material/Layers';
import CreateIcon from '@mui/icons-material/Create';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';

export const NAVIGATION_ADMIN = [
    {
        kind: 'header',
        title: 'Create'
    },
    {
        segment: 'createProposal',
        title: 'Create Proposal',
        icon: <CreateIcon />,
    },
    {
        kind: 'divider',
    },
    {
        kind: 'header',
        title: 'Petitions',
    },
    {
        segment: 'openPetitions',
        title: 'Open Petitions',
        icon: <FileOpenIcon />,
    },
    {
        segment: 'closedPetitions',
        title: 'Closed Petitions',
        icon: <AssignmentTurnedInIcon />,
    },
    {
        kind: 'divider',
    },
    {
        kind: 'header',
        title: 'Proposals',
    },
    {
        segment: 'openProposals',
        title: 'Open Proposals',
        icon: <FileOpenIcon />,
    },
    {
        segment: 'closedProposals',
        title: 'Closed Proposals',
        icon: <AssignmentTurnedInIcon />,
    },
    {
        kind: 'divider',
    },
    {
        kind: 'header',
        title: 'Integrations',
    },
    {
        segment: 'integrations',
        title: 'Integrations',
        icon: <LayersIcon />,
    },
    {
        kind: 'divider',
    },
    {
        kind: 'header',
        title: 'Account',
    },
    {
        segment: 'accountSettings',
        title: 'Account Settings',
        icon: <AccountCircleSharpIcon />,
    },
    {
        segment: 'logout',
        title: 'Logout',
        icon: <LogoutSharpIcon />,
    },
];

export const NAVIGATION_CITIZEN = [
    {
        kind: 'header',
        title: 'Create'
    },
    {
        segment: 'createPetition',
        title: 'Create Petition',
        icon: <CreateIcon />,
    },
    {
        kind: 'divider',
    },
    {
        kind: 'header',
        title: 'Petitions',
    },
    {
        segment: 'openPetitions',
        title: 'Open Petitions',
        icon: <FileOpenIcon />,
    },
    {
        segment: 'closedPetitions',
        title: 'Closed Petitions',
        icon: <AssignmentTurnedInIcon />,
    },
    {
        kind: 'divider',
    },
    {
        kind: 'header',
        title: 'Proposals',
    },
    {
        segment: 'openProposals',
        title: 'Open Proposals',
        icon: <FileOpenIcon />,
    },
    {
        segment: 'closedProposals',
        title: 'Closed Proposals',
        icon: <AssignmentTurnedInIcon />,
    },
    {
        kind: 'divider',
    },
    {
        kind: 'header',
        title: 'Integrations',
    },
    {
        segment: 'integrations',
        title: 'Integrations',
        icon: <LayersIcon />,
    },
    {
        kind: 'divider',
    },
    {
        kind: 'header',
        title: 'Account',
    },
    {
        segment: 'accountSettings',
        title: 'Account Settings',
        icon: <AccountCircleSharpIcon />,
    },
    {
        segment: 'logout',
        title: 'Logout',
        icon: <LogoutSharpIcon />,
    },
];

export const NAVIGATION_MASTER_ADMIN =
    [
        {
            kind: 'header',
            title: 'Create'
        },
        {
            segment: 'createCommunity',
            title: 'Create Community',
            icon: <CreateIcon />,
        },
        {
            kind: 'divider',
        },
        {
            kind: 'header',
            title: 'Manage',
        },
        {
            segment: 'manageCommunities',
            title: 'Manage Communities',
            icon: <DashboardOutlinedIcon />,
        },
        {
            kind: 'divider',
        },
        {
            kind: 'header',
            title: 'Account',
        },
        {
            segment: 'accountSettings',
            title: 'Account Settings',
            icon: <AccountCircleSharpIcon />,
        },
        {
            segment: 'logout',
            title: 'Logout',
            icon: <LogoutSharpIcon />,
        }
    ];
