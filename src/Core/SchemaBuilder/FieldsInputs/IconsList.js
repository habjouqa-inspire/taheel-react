import AddIcon from '@material-ui/icons/Add';
import DoneIcon from '@material-ui/icons/Done';
import CreateIcon from '@material-ui/icons/Create';
import ReportIcon from '@material-ui/icons/Report';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import InfoIcon from '@material-ui/icons/Info';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import ForwardIcon from '@material-ui/icons/Forward';
import FolderIcon from '@material-ui/icons/Folder';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ExitToAppSharpIcon from '@material-ui/icons/ExitToAppSharp';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ModeEditTwoToneIcon from '@material-ui/icons/ExitToAppSharp';
import DownloadIcon from '@material-ui/icons/Download';
import PropTypes from 'prop-types'

export default function IconsList(props) {
    let { iconType, label, color = 'primary', sx } = props
    const IconComponents = {
        AddIcon,
        DoneIcon,
        CreateIcon,
        ReportIcon,
        VisibilityIcon,
        VisibilityOffIcon,
        KeyboardReturnIcon,
        ForwardIcon,
        FolderIcon,
        ArrowForwardIcon,
        ExitToAppSharpIcon,
        ArrowLeftIcon,
        DeleteIcon,
        EditIcon,
        ModeEditTwoToneIcon,
        DownloadIcon,
        InfoIcon,
    }
    const IconTag = IconComponents[iconType]
    return (
        <>
            <IconTag
                color={color}
                sx={{ color: color }}
            /> {label}
        </>
    )
}
IconsList.propTypes = {
    label: PropTypes.string,
    iconType: PropTypes.string,
    sx: PropTypes.object,
    color: PropTypes.string,
}