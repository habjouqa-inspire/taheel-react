import { useEffect } from 'react';
import { downloadTaheelDoc } from 'src/Modules/Account/API/AccountApi';

const DownloadDoc = () => {
    let params = new URLSearchParams(document.location.search.substring(1));
    let DocID = params.get("DocID");
    let DocName = params.get("DocumentName");

    useEffect(async () => {
        console.log("params+++++++++++++", params);
        const downloadDoc = await downloadTaheelDoc(DocID, DocName);
    }, []);
    return true;

};
export default DownloadDoc;
