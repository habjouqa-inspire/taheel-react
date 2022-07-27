import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';

export default function CloseDilaog(props) {
    return (<IconButton
        aria-label="close"
        onClick={props.onCloseFn}
        sx={{
            position: 'absolute',
            right: -8,
            top: -8,
            color: 'gray',
        }}
    >
        <CloseIcon />
    </IconButton>)
}
CloseDilaog.propTypes = {
    onCloseFn: PropTypes.func.isRequired,
};