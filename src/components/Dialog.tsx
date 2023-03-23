import React from 'react';
import {
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

type DialogProps = {
  content: string | React.ReactNode;
  open: boolean;
  confirm: (isOpen: boolean) => void;
  children?: React.ReactNode;
};

const BaseDialog = ({
  content,
  open,
  confirm,
  children,
}: DialogProps) => {
  const handleClose = (): void => {
    confirm(false)
  }

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        id="alert-dialog-title"
        sx={{ m: 1, p: 2 }}
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 0,
            top: 0,
            color: '#9e9e9e',
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {typeof content === 'string' ? (
            <DialogContentText id="alert-dialog-description">
              {content}
            </DialogContentText>
          ) : (
            content
          )}
          {children}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          確定
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default BaseDialog