import * as React from 'react';

import { useState, useEffect, useCallback } from 'react';

import { makeStyles } from '@mui/styles';

import classNames from 'classnames';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

import Circle from './Circle';

interface IAvatarCounterProps {
    onDone?: () => void;
    height: number;
    width: number;
    src: string;
    login: string;
    stopCountdown?: boolean;
}

interface IAvatarCounterPrivate {
}

const SIZE_ADJUST = 30;
const ITERATE_TIMEOUT = 1_000;
const INITIAL_VALUE = 95;

const useStyles = makeStyles({
    root: {
        position: 'relative',
    },
    circle: {
        position: 'absolute',
        top: -(SIZE_ADJUST / 2),
        left: -(SIZE_ADJUST / 2),
        zIndex: 2,
        '&:hover $text': {
            opacity: 0,
        },
    },
    text: {
        transition: 'opacity 0.5s',
        opacity: 0.35,
    },
    hidden: {
        opacity: 0,
    },
});

export const AvatarCounter = ({
    onDone = () => null,
    height,
    width,
    src,
    login,
    stopCountdown = false,
    ...props
}: IAvatarCounterProps & IAvatarCounterPrivate) => {
    const classes = useStyles();
    const [progress, setProgress] = useState(INITIAL_VALUE);

    const handleDone = useCallback(() => onDone(), [onDone]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (progress === 0) {
                handleDone();
            } else if (!stopCountdown) {
                setProgress(progress - 1);
            }
        }, ITERATE_TIMEOUT);
        return () => clearTimeout(timeout);
    }, [progress, stopCountdown]);

    return (
        <Box className={classes.root}>
            <Avatar
                {...props}
                imgProps={{
                    crossOrigin: 'anonymous'
                }}
                style={{
                    background: "#0003",
                    height,
                    width,
                }}
                src={src}
                alt={login}
            >
                <Typography
                    variant="h4"
                    style={{
                        textTransform: 'uppercase',
                        color: 'white',
                    }}
                >
                    {login}
                </Typography>
            </Avatar>
            <Circle
                className={classes.circle}
                responsive={false}
                size={`${Math.min(height + SIZE_ADJUST, width + SIZE_ADJUST)}px`}
                showPercentage={!stopCountdown && false /* disabled */}
                progress={!stopCountdown ? Math.max(progress, 1) : 0}
                lineWidth="15px"
                textStyle={{
                    font: 'bold 4rem Helvetica, Arial, sans-serif',
                    textShadow: "1px 1px 5px white",
                }}
                progressColor="#f48fb1"
                bgColor="#575757"
                textColor="#272727"
                textClass={classNames(classes.text, {
                    [classes.hidden]: progress === 0,
                })}
                animationDuration="0.5s"
                roundedStroke={true}
            />
        </Box>
    );
};

export default AvatarCounter;
