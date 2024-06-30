import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

const ConfirmDeleteDialog = ({ isOpen, content, onConfirm, onCancel }) => {
    return (
        <Dialog
            open={isOpen}
            onClose={onCancel}
            sx={{ '& .MuiDialog-paper': { padding: '16px' } }} // Add padding to the dialog
        >
            <DialogTitle> Confirmation </DialogTitle>
            <DialogContent>
                <DialogContentText>{content}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={onCancel}
                    variant="outlined"
                    sx={{
                        '&:hover': {
                            backgroundColor: 'red',
                            borderColor: 'white',
                            color: 'white',
                        },
                    }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={onConfirm}
                    color="primary"
                    variant="outlined"
                    autoFocus
                    sx={{
                        '&:hover': {
                            backgroundColor: 'green',
                            borderColor: 'white',
                            color: 'white',
                        },
                    }}
                >
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDeleteDialog;