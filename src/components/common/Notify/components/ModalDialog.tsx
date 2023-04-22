import * as React from 'react';

import { makeStyles } from '@mui/styles';

import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

const useStyles = makeStyles({
  dialog: {
    '&:first-child': {
      padding: 0,
    },
    overflow: 'hidden',
    position: 'relative',
  },
});

interface IModalDialogProps extends DialogProps {
  children: React.ReactNode;
}

export const ModalDialog = ({
  children,
  ...other
}: IModalDialogProps) => {
  const classes = useStyles();
  return (
    <Dialog {...other}>
      <DialogContent className={classes.dialog}>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default ModalDialog;
