import * as React from 'react';

import { Theme } from "@mui/material/styles";
import { deepOrange } from "@mui/material/colors";

import { makeStyles } from '@mui/styles';

import Avatar from "@mui/material/Avatar";

const PRIMARY_COLOR = '#44b700';
const SECONDARY_COLOR = '#ff416c';

const useStyles = makeStyles((theme: Theme) => ({
    messageRow: {
        display: "flex"
    },
    messageRowRight: {
        display: "flex",
        justifyContent: "flex-end"
    },
    messageBlue: {
        position: "relative",
        marginLeft: "20px",
        marginBottom: "10px",
        padding: "10px",
        backgroundColor: PRIMARY_COLOR,
        textAlign: "left",
        font: "400 .9em 'Open Sans', sans-serif",
        border: `1px solid ${PRIMARY_COLOR}`,
        borderRadius: "20px",
        "&:after": {
            content: "''",
            position: "absolute",
            width: "0",
            height: "0",
            borderTop: `15px solid ${PRIMARY_COLOR}`,
            borderLeft: "15px solid transparent",
            borderRight: "15px solid transparent",
            top: "0",
            left: "-15px"
        },
        "&:before": {
            content: "''",
            position: "absolute",
            width: "0",
            height: "0",
            borderTop: `17px solid ${PRIMARY_COLOR}`,
            borderLeft: "16px solid transparent",
            borderRight: "16px solid transparent",
            top: "-1px",
            left: "-17px"
        }
    },
    messageOrange: {
        position: "relative",
        marginRight: "20px",
        marginBottom: "10px",
        padding: "10px",
        backgroundColor: SECONDARY_COLOR,
        textAlign: "left",
        font: "400 .9em 'Open Sans', sans-serif",
        border: `1px solid ${SECONDARY_COLOR}`,
        borderRadius: "20px",
        "&:after": {
            content: "''",
            position: "absolute",
            width: "0",
            height: "0",
            borderTop: `15px solid ${SECONDARY_COLOR}`,
            borderLeft: "15px solid transparent",
            borderRight: "15px solid transparent",
            top: "0",
            right: "-15px"
        },
        "&:before": {
            content: "''",
            position: "absolute",
            width: "0",
            height: "0",
            borderTop: `17px solid ${SECONDARY_COLOR}`,
            borderLeft: "16px solid transparent",
            borderRight: "16px solid transparent",
            top: "-1px",
            right: "-17px"
        }
    },
    messageContent: {
        padding: 0,
        margin: 0
    },
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
        width: theme.spacing(4),
        height: theme.spacing(4)
    },
    avatarNothing: {
        color: "transparent",
        backgroundColor: "transparent",
        width: theme.spacing(4),
        height: theme.spacing(4)
    },
    displayName: {
        marginLeft: "20px"
    }
}));

interface IMessageProps {
    type?: 'left' | 'right';
    message: string;
    displayName?: string;
    photoURL?: string;
}

export const Message = ({
    type = 'left',
    message = "no message",
    displayName = '',
    photoURL = '',
}: IMessageProps) => {
    const classes = useStyles();

    if (type === 'left') {
        return (
            <div className={classes.messageRow}>
                <Avatar
                    imgProps={{
                        crossOrigin: 'anonymous'
                    }}
                    alt={displayName}
                    className={classes.orange}
                    src={photoURL}
                ></Avatar>
                <div>
                    <div className={classes.displayName}>{displayName}</div>
                    <div className={classes.messageBlue}>
                        <div>
                            <p className={classes.messageContent}>{message}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else if (type === 'right') {
        return (
            <div className={classes.messageRowRight}>
                <div className={classes.messageOrange}>
                    <p className={classes.messageContent}>{message}</p>
                </div>
            </div>
        );
    } else {
        throw new Error('H2hLayout Message unknown type');
    }
};

export default Message;
