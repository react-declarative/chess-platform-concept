import { useEffect } from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

import ioc from '../lib/ioc';

export const HomePage = () => {

    useEffect(() => {
        Promise.all([
            ioc.assetService.prefetch(),
            ioc.chatService.prefetch(),
        ]).then(() => ioc.routerService.push('/brief-page'));
    }, []);

    return (
        <Paper
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                gap: 3,
                height: '100vh',
                width: '100vw',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
            }}
        >
          <CircularProgress />
          <Typography variant="body1">
            Searching for competition opponent
          </Typography>
        </Paper>
    )
};

export default HomePage;
