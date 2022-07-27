import { useState } from "react"
import { CloudDownloadIcon } from '@material-ui/icons/CloudDownload';
import { Button, CircularProgress } from "@material-ui/core"
import PropTypes, { array } from 'prop-types'
import { downloadDocument } from "src/Modules/CenterServices/FinalLicense/API/finalLicenseAPI";

const downloadFileFn = async (setLoading, docID) => {
    setLoading(true)
    console.log(`finalLicenseUtil :: downloadFileFn: ${docID}`)
    const downloadDoc = await downloadDocument(docID, true, name)
    if (downloadDoc.isSuccessful) {
        setLoading(false)
    }
}

const DownloadBtn = ({ index, docID }) => {
    const [loading, setLoading] = useState(false)

    return (
        <Button
            startIcon={loading ? <CircularProgress size="1rem" /> : <CloudDownloadIcon />}
            key={index}
            variant="contained"
            color="primary"
            sx={{
                backgroundColor: '#3c8084',
            }}
            onClick={() => downloadFileFn(setLoading, docID)}
        >
            تنزيل
        </Button>)
}
DownloadBtn.propTypes = {
    index: PropTypes.number,
    docID: PropTypes.any,
};
export { DownloadBtn }