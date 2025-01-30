import React, { useState } from "react";
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import LayersIcon from '@mui/icons-material/Layers';
import CreateIcon from '@mui/icons-material/Create';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import theme from '../../assets/theme';
import CreatePetition from '../CreatePetition/CreatePetition';
import OpenPetitions from '../OpenPetitions/OpenPetitions';
import ClosedPetitions from '../ClosedPetitions/ClosedPetitions';
import Logout from '../LogoutPage/LogoutPage';
import logo from '../../assets/images/logo.png';
import { useAuth } from '../../services/authProvider';


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




function PageContent({ pathname }) {

    
    return (
        <Box
            sx={{
                py: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
            }}
        >
            {pathname === '/createPetition' && <CreatePetition />}
            {pathname === '/openPetitions' && <OpenPetitions />}
            {pathname === '/closedPetitions' && <ClosedPetitions />}
            {pathname === '/logout' && <Logout />}
        </Box>
    );
}

PageContent.propTypes = {
    pathname: PropTypes.string.isRequired,
};

function DashboardLayoutBasic(props) {
    const { window } = props;
    let NAVIGATION;

    const { role, community } = useAuth();
    if (role === "ROLE_CITIZEN") {
        NAVIGATION = NAVIGATION_CITIZEN;
    } else if(role === "ROLE_ADMIN") {
        NAVIGATION = NAVIGATION_ADMIN;
    }

    const router = useDemoRouter('/dashboard');


    return (
        // preview-start
        <AppProvider
            navigation={NAVIGATION}
            router={router}
            theme={theme}
            branding={{
                logo: <img src={logo} alt="MUI logo" />,
                title: 'Have Your Say',
                homeUrl: '/',
            }}
        >
            <DashboardLayout >
                <PageContent pathname={router.pathname} />
            </DashboardLayout>
        </AppProvider>
        // preview-end
    );
}


export default DashboardLayoutBasic;
