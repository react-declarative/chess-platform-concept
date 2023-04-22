import * as React from 'react';

import { makeStyles } from "@mui/styles";

import classNames from 'classnames';

import Badge, { BadgeProps } from '@mui/material/Badge';
import Box from '@mui/material/Box';
import { Theme } from '@mui/material';

const BADGE_SIDE = 18;

export const useStyles = makeStyles<Theme>((theme) => ({
    root: {
        '& .MuiBadge-badge': {
            backgroundColor: '#44b700',
            color: '#44b700',
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            '&::after': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                animation: '$ripple 1.2s infinite ease-in-out',
                border: '1px solid currentColor',
                content: '""',
            },
        },
        '& .MuiBadge-dot': {
            minHeight: BADGE_SIDE,
            minWidth: BADGE_SIDE,
            borderRadius: BADGE_SIDE,
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

interface IStyledBadgeProps extends BadgeProps {
    children: React.ReactChild;
}

export const StyledBadge = ({
    children,
    className,
    ...otherProps
}: IStyledBadgeProps) => {
    const classes = useStyles();
    return (
        <Box className={classNames(className, classes.root)}>
            <Badge {...otherProps} >
                {children}
            </Badge>
        </Box>
    );
};


export default StyledBadge;
