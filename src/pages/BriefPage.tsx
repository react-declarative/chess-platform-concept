import { useEffect } from 'react';
import { alpha } from '@mui/material';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import ChessBoard from "../components/common/Chessboard";
import Notify from "../components/common/Notify";
import GameCard from "../components/GameCard";

import ioc from '../lib/ioc';

export const BriefPage = () => {

    useEffect(() => {
        window.withBriefVisited = true;
    }, []);

    return (
        <GameCard>
            <Notify />
            <Box
                sx={{
                    position: 'relative',
                    margin: '10px',
                }}
            >
                <Box
                    sx={{ 
                        position: 'absolute',
                        background: (theme) => alpha(theme.palette.background.paper, 0.777),
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        height: '100%',
                        width: '100%',
                        zIndex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '50vmin',
                            marginTop: -10,
                            gap: 3,
                        }}
                    >
                        <Typography variant="h3">
                            Waiting for your bet
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: 18,
                            }}
                            variant="body1"
                        >
                            Your opponent <b>{ioc.assetService.opponentLogin}</b> confirmed their bet on this competition
                            and waiting for your approval.
                        </Typography>
                        <Box>
                            <Button
                                variant="contained"
                                size="large"
                                onClick={() => ioc.routerService.push('/connect-page')}
                            >
                                Start playing
                            </Button>
                        </Box>
                    </Box>
                </Box>
                <ChessBoard />
            </Box>
        </GameCard>
    );
};

export default BriefPage;
