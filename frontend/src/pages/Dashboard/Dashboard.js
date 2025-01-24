import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import CreateIcon from '@mui/icons-material/Create';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import theme from '../../assets/theme';
import CreatePetition from '../../components/CreatePetition';

const NAVIGATION = [
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
    </Box>
  );
}

PageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function DashboardLayoutBasic(props) {
  const { window } = props;

  const router = useDemoRouter('/dashboard');


  return (
    // preview-start
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={theme}
      branding={{
        logo: <img src="https://mui.com/static/logo.png" alt="MUI logo" />,
        title: 'Have Your Say',
        homeUrl: '/',}}
    >
      <DashboardLayout>
        <PageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
    // preview-end
  );
}

DashboardLayoutBasic.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default DashboardLayoutBasic;
