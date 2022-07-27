/* eslint-disable */
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AlertDialog(props) {
	const { onClose, dialogContent, dialogTitle, open, acceptBtnName, buttons, setAlertInfo, alertInfo, setField } = props;
	console.log("buttons ===>", buttons)
	console.log("buttons ===>", onClose)

	const handleClose = () => {
		onClose();
	};
	const handleAccept = () => {
		onClose();
	};
	return (
		<Dialog
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
			open={open}
		>
			<DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
			<DialogContent>
				<DialogContentText style={{ textAlign: 'center' }} id="alert-dialog-description">
					{dialogContent}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				{!!buttons ?
					<>
						{!!buttons.leftBtn ? (<Button onClick={() => buttons.leftBtn.func(setAlertInfo, alertInfo)} autoFocus>{buttons.leftBtn.title}</Button>) : ''}
						{!!buttons.rightBtn ? <Button onClick={() => buttons.rightBtn.func(setAlertInfo, alertInfo, setField)}>{buttons.rightBtn.title}</Button> : ''}
					</>
					:
					<Button
						onClick={handleAccept}
						color="primary"
						variant="contained"
						autoFocus
						sx={{
							backgroundColor: '#3c8084',
							color: '#fff',
							margin: '0 auto',
							pr: 6,
							pl: 6
						}}
					>
						{acceptBtnName}
					</Button>}
			</DialogActions>
		</Dialog>
	);
}

AlertDialog.propTypes = {
	onClose: PropTypes.func,
	open: PropTypes.bool.isRequired,
	dialogContent: PropTypes.string.isRequired,
	dialogTitle: PropTypes.string.isRequired,
	acceptBtnName: PropTypes.string,
	buttons: PropTypes.func,
};