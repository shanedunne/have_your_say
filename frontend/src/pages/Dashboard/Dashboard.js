import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useParams } from "react-router-dom";
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import theme from '../../assets/theme';
import CreatePetition from '../CreatePetition/CreatePetition';
import CreateProposal from "../CreateProposal/CreateProposal";
import OpenPetitions from '../OpenPetitions/OpenPetitions';
import ClosedPetitions from '../ClosedPetitions/ClosedPetitions';
import Logout from '../LogoutPage/LogoutPage';
import logo from '../../assets/images/logo.png';
import { useAuth } from '../../services/authProvider';
import OpenProposals from "../OpenProposals/OpenProposals";
import ClosedProposals from "../ClosedProposal.js/ClosedProposal";
import { NAVIGATION_ADMIN, NAVIGATION_CITIZEN, NAVIGATION_MASTER_ADMIN } from "./MenuStructures";


function PageContent({ pathname }) {
    const { proposalId } = useParams();


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
                    {pathname === '/createProposal' && <CreateProposal />}
                    {pathname === '/openPetitions' && <OpenPetitions />}
                    {pathname === '/openProposals' && <OpenProposals />}
                    {pathname === '/closedPetitions' && <ClosedPetitions />}
                    {pathname === '/closedProposals' && <ClosedProposals />}
                    {pathname === '/logout' && <Logout />}

        </Box>
    );
}

PageContent.propTypes = {
    pathname: PropTypes.string.isRequired,
};

function Dashboard(props) {
    const { window } = props;
    let NAVIGATION;

    const { role, community } = useAuth();
    if (role === "ROLE_CITIZEN") {
        NAVIGATION = NAVIGATION_CITIZEN;
    } else if (role === "ROLE_ADMIN") {
        NAVIGATION = NAVIGATION_ADMIN;
    } else if (role === "ROLE_MASTER_ADMIN") {
        NAVIGATION = NAVIGATION_MASTER_ADMIN;
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
                    title: `Have Your Say - ${community}`,
                    homeUrl: '/',
                }}
            >
                <DashboardLayout >
                    <Routes>
                    <Route path="/*" element={<PageContent pathname={router.pathname} />} />
                    </Routes>
                </DashboardLayout>
            </AppProvider>
    );
}


export default Dashboard;
