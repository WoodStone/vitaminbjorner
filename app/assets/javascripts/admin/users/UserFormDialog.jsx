import React from 'react';
import Dialog from 'material-ui/Dialog';
import UserForm from './UserForm';

class UserFormDialog extends React.Component {

    render() {
        const { title, open, onRequestClose, classes, handleSubmit } = this.props;
        return (
            <Dialog title={title} open={open} modal={false} onRequestClose={onRequestClose}>
                <UserForm onSubmit={handleSubmit} classes={classes} handleClose={onRequestClose}/>
            </Dialog>
        );
    }

}

export default UserFormDialog;