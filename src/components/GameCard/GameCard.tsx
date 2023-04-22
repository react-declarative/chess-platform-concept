import * as React from 'react';

import { Fragment } from 'react';
import { useState, useRef } from 'react';
import { makeStyles } from '@mui/styles';

import { observer } from 'mobx-react';

import {
    AutoSizer,
    ScrollView,
} from 'react-declarative';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import InputBase from '@mui/material/InputBase';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import SendIcon from '@mui/icons-material/Send';

import StyledBadge from './components/StyledBadge';
import Message from './components/Message';

import { Theme } from '@mui/material';

import ioc from '../../lib/ioc';

const GROUP_CHAT_WIDTH = '418px';
const MODERATOR_WRAPPER_HEIGHT = '275px';

const FLEX_STRETCH = {
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'stretch',
};

const FLEX_CENTER = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

const useStyles = makeStyles<Theme>((theme) => ({
    root: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: '100vh',
        width: '100vw',
        zIndex: 1200,
        background: '#1c1c1c',
        flexDirection: 'column',
        ...FLEX_STRETCH
    },
    hidden: {
        display: 'none',
    },
    container: {
        flex: 1,
        position: 'relative',
    },
    groupCall: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        height: '100%',
        ...FLEX_STRETCH,
        width: `calc(100% - ${GROUP_CHAT_WIDTH})`,
    },
    groupCallContent: {
        flex: 1,
        position: 'relative',
        flexDirection: 'column',
        ...FLEX_STRETCH,
    },
    groupCallInner: {
        ...FLEX_CENTER,
    },
    groupCallArea: {
        flex: 1,
    },
    groupChat: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        height: '100%',
        width: GROUP_CHAT_WIDTH,
        background: '#353535',
        flexDirection: 'column',
        ...FLEX_STRETCH,
    },
    moderatorWrapper: {
        flex: 1,
        background: '#424242',
        flexDirection: 'column',
        ...FLEX_STRETCH,
        maxHeight: MODERATOR_WRAPPER_HEIGHT,
        minHeight: MODERATOR_WRAPPER_HEIGHT,
    },
    moderatorWrapperContent: {
        ...FLEX_CENTER,
        pointerEvents: 'none',
        touchAction: 'none',
    },
    moderatorContent: {
        margin: theme.spacing(1),
        ...FLEX_CENTER,
        flex: 1,
    },
    moderatorEmoji: {
        minHeight: 55,
        '& *': {
            marginBottom: '-2.5px !important',
            height: '20px !important',
            width: '20px !important',
        },
        ...FLEX_CENTER,
        flexDirection: 'row',
        gap: 5,
    },
    moderatorInfo: {
        minHeight: 75,
        '& *': {
            fontSize: 18,
        },
        ...FLEX_CENTER,
    },
    inputWrapper: {
        minHeight: '65px',
        ...FLEX_STRETCH,
        alignItems: 'center',
        gap: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
        background: '#424242',
    },
    chatWrapper: {
        flex: 1,
        ...FLEX_STRETCH,
        alignItems: 'flex-start',
        flexDirection: 'column',
        overflowY: 'scroll',
        padding: theme.spacing(1),
        '& > *': {
            width: '100%',
        },
    },
    inputField: {
        flex: 1,
    },
}));

interface IGameCardProps {
    children?: React.ReactNode;
    withInitialMsg?: boolean;
}

export const GameCard = observer(({
    children = null,
    withInitialMsg = true,
}: IGameCardProps) => {

    const classes = useStyles();
    const chatWrapperRef = useRef<HTMLDivElement>(null);

    const [msg, setMsg] = useState('');

    const handleSend = () => {
        ioc.chatService.sendMsg(msg);
        setMsg('');
    };

    const handleKeyUp = (event: any) => {
        if (event.key === "Enter") {
            handleSend();
        }
    };

    return (
        <Box className={classes.root}>
            <Box className={classes.container}>
                <Box className={classes.groupCall}>
                    <ScrollView className={classes.groupCallContent}>
                        <Box className={classes.groupCallInner}>
                            {children}
                        </Box>
                    </ScrollView>
                </Box>
                <Box className={classes.groupChat}>
                    <Box className={classes.moderatorWrapper}>
                        <Box className={classes.moderatorEmoji}>
                            🌏☂️🔥🍣🥮🥠
                        </Box>
                        <Box className={classes.moderatorContent}>
                            <AutoSizer>
                                {({
                                    height,
                                    width
                                }) => (
                                    <Box
                                        className={classes.moderatorWrapperContent}
                                        style={{ height, width }}
                                    >
                                        <StyledBadge
                                            overlap="circular"
                                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                            variant="dot"
                                        >
                                            <Avatar
                                                imgProps={{
                                                    crossOrigin: 'anonymous'
                                                }}
                                                style={{
                                                    height: height,
                                                    width: height
                                                }}
                                                placeholder={ioc.assetService.opponentImage}
                                                src={ioc.assetService.opponentImage}
                                            />
                                        </StyledBadge>
                                    </Box>
                                )}
                            </AutoSizer>
                        </Box>
                        <Box className={classes.moderatorInfo}>
                            <Typography variant="subtitle1">
                                {ioc.assetService.opponentLogin}
                            </Typography>
                        </Box>
                    </Box>
                    <div ref={chatWrapperRef} className={classes.chatWrapper}>
                        {withInitialMsg && (
                            <Message
                                type="left"
                                message="Hello! Are you there? I am still waiting"
                                displayName={ioc.assetService.opponentLogin}
                                photoURL={ioc.assetService.opponentImage}
                            />
                        )}
                        {ioc.chatService.messageList.map(({
                            from,
                            msg
                        }, idx) => {
                            if (from === 'me') {
                                return (
                                    <Message
                                        key={idx}
                                        type="right"
                                        message={msg}
                                        displayName="Me"
                                    />
                                )
                            } else {
                                return (
                                    <Message
                                        key={idx}
                                        type="left"
                                        message={msg}
                                        displayName={ioc.assetService.opponentLogin}
                                        photoURL={ioc.assetService.opponentImage}
                                    />
                                )
                            }
                        })}
                    </div>
                    <Box className={classes.inputWrapper}>
                        <InputBase
                            className={classes.inputField}
                            onChange={({ target }) => setMsg(target.value)}
                            onKeyUp={handleKeyUp}
                            value={msg}
                            placeholder="Type a message"
                        />
                        <Box display="flex" alignItems="center">
                            <IconButton onClick={handleSend}>
                                <SendIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
});

export default GameCard;
