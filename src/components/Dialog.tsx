import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';

type DialogProps = {
  title:string,
  content:string,
  open:boolean,
  confirm: (isOpen:false) => void
}
export default function BaseDialog({title, content, open,confirm}:DialogProps) {

  const handleClose = () => {
    confirm(false)
  }

  return (
    <div>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        { title.length > 0 && 
          <DialogTitle id="alert-dialog-title">
            {title}
          </DialogTitle>
        }
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            確定
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}