import * as React from 'react';
import { useState, useEffect } from 'react';

import { darken, styled, debounce, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { green } from '@mui/material/colors';

import {
    AutoSizer,
} from 'react-declarative';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import ModalDialog from "./components/ModalDialog";
import AvatarCounter from './components/AvatarCounter';

import playSound, { Sound } from '../../../utils/playSound';

import ioc from '../../../lib/ioc';

const useStyles = makeStyles<Theme>((theme) => ({
    root: {
        '& .MuiDialog-paper .MuiDialogContent-root': {
            maxWidth: '345px !important',
            minWidth: '345px !important',
            minHeight: '375px !important',
            maxHeight: '375px !important',
        },
        '& .MuiPaper-root': {
            marginTop: '-45px',
        },
    },
    container: {
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'stretch',
        flexDirection: 'column',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    appBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        background: theme.palette.background.paper,
        color: theme.palette.getContrastText(theme.palette.background.paper),
    },
    adjust: {
        paddingBottom: 48,
    },
    content: {
        background: darken(theme.palette.background.paper, 0.25),
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'stretch',
        flexDirection: 'column',
        overflowY: 'scroll',
        flex: 1,
    },
    avatarWrapper: {
        flex: 1,
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'stretch',
    },
    avatarContent: {
        flex: 1,
        maxHeight: 245,
        '& > div:first-child': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
    },
    close: {
        zIndex: 999,
    },
    loaderBar: {
        marginBottom: -4,
        zIndex: 9999,
    },
    disabled: {
        opacity: 0.5,
        pointerEvents: 'none',
        touchAction: 'none',
    },
    fullWidth: {
        width: '100%',
    },
}));

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(green[800]),
    fontWeight: 'bold',
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
}));

export const Notify = () => {

    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [done, setDone] = useState(false);

    useEffect(() => {

        const handleStuff = debounce(() => {
            setTimeout(() => playSound(Sound.Alert), 500);
            setOpen(true);
        }, 15_000);

        document.body.addEventListener('click', handleStuff, {
            once: true,
        });

        return () => {
            document.body.removeEventListener('click', handleStuff);
            handleStuff.clear();
        };
    }, []);


    const handleConfirm = () => ioc.routerService.push('/connect-page');
    const handleDone = () => setDone(true);

    return (
        <ModalDialog className={classes.root} open={open}>
            <Box className={classes.container}>
                <Box className={classes.content} p={2}>
                    <Box className={classes.avatarWrapper}>
                        <Box mb={1} className={classes.avatarContent}>
                            <AutoSizer>
                                {({
                                    height,
                                    width,
                                }) => {
                                    const side = Math.min(height, width) - 10;
                                    return (
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                padding: '5px',
                                            }}
                                        >
                                            <AvatarCounter
                                                login={ioc.assetService.opponentLogin}
                                                src={ioc.assetService.opponentImage}
                                                onDone={handleDone}
                                                height={side}
                                                width={side}
                                            />
                                        </Box>
                                    );
                                }}
                            </AutoSizer>
                        </Box>
                    </Box>
                    <Grid container spacing={1}>
                        <Grid item xs>
                            <Box pb={2}>
                                {done ? (
                                    <Typography variant="body1">
                                        The {ioc.assetService.opponentLogin} can leave this room in any moment. Please start competition now
                                    </Typography>
                                ) : (
                                    <Typography variant="body1">
                                        Don't lose your chance to win <b>1 ETH</b> by beating the {ioc.assetService.opponentLogin}
                                    </Typography>
                                )}
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid item xs>
                            <ColorButton onClick={handleConfirm} className={classes.fullWidth} variant="contained">
                                Start game
                            </ColorButton>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </ModalDialog>
    );
};

export default Notify;
