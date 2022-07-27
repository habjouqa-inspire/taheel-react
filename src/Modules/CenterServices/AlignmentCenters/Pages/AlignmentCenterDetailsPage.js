/* eslint-disable */
import { Alert, Checkbox, CircularProgress, Grid, Link, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useLookup, useUpdateLookup } from 'src/Core/Contexts/useLookup';
import PageViewer from 'src/Core/SchemaBuilder/PageViewer';
import { getOwnerDetails } from 'src/Core/Utils/TaheelUtils';
import { getCurrentUser, setAlignmentFlag } from 'src/Core/Utils/UserLocalStorage';
import testCenterDatailsSchema from 'src/Modules/CenterServices/AlignmentCenters/Schema/alignmentCenterDetailsSchema';
import TermsDialog from '../../../../Core/Components/TermsDialog';
import { CentertDetails, getTerms } from '../../API/ServicesApi';
import { formatGetCenterDetails } from '../../TransferCenterOwnership/Utils/FormateJson';
import alignmentCenterStatus from '../API/AlignmentCentersAPI';
import {getLookups} from '../../TemporaryLicense/API/temporayLicenseAPI';
import TermsContent from '../../TemporaryLicense/Sections/TermsContent';
import { TransferRequirmentsCompletionLetterReq } from '../../TransferCenterLocation/API/TransferCenterLocationAPI';



const AlignmentCenterDetailsPage = () => {
    const lookupValues = useLookup()
    const refreshLookup = useUpdateLookup()
    const location = useLocation();
    const licenseNumber = location?.state?.licenseNumber
    const centerType = location?.state?.centerType
    const totalCount = location?.state?.totalCount
    const { email } = getCurrentUser();
    const [loading, setLoading] = useState(true);
    const [errMessage, SetErrMessage] = useState('')
    const [btnsOptions, setBtnsOptions] = useState({})
    const [dialogContent, setDialogContent] = useState("")
    const [termsAndConditions, setTermsAndConditions] = useState("")
    const [dialogTitle, setDialogTitle] = useState("")
    const [details, setDetails] = useState()
    const [open, setOpen] = React.useState(false);
    const [isAgree, setIsAgree] = useState(false)
    const navigate = useNavigate();
    const [dataLoaded, setDataLoaded] = useState(false)
    const [termsLoaded, setTermsLoaded] = useState(false)
    //const [centerPrograms, setCenterPrograms] = useState()
    const [rejectMsg, setRejectMsg] = useState()
    const [programLoaded, setProgramLoaded] = useState(false)
    let centerPrograms = ''


    const handleClickOpen = () => {
        setOpen(true);
    };
    const setField = (fieldName, fieldValue) => {
        setDetails(preDetails => {
            preDetails[fieldName] = fieldValue;
            return preDetails
        })
    }
    const termsLabel = () => (
        <>
            <Typography gutterBottom variant="h5" component="span">
                أنا أقر وأتعهد بأن المعلومات أعلاه صحيحه
                {/* <Link href="#" sx={{ color: '#147fbd' }}
                    onClick={(event) => {
                        event.preventDefault()
                        setBtnsOptions({ acceptBtnName: 'أوافق' });
                        setDialogContent(TermsContent(termsAndConditions));
                        setDialogTitle('التعهد')
                        setOpen(true)
                    }
                    }> (للاطلاع على الشروط والأحكام انقر هنا)</Link> */}
            </Typography>

        </>
    )

    const handleSubmit = async (alignmentStatus) => {
        setLoading(true)
        SetErrMessage("")
        const res = await alignmentCenterStatus(email, licenseNumber, alignmentStatus)
        if (!res?.isSuccessful) {
            SetErrMessage(res?.message)
            setLoading(false)
            setOpen(false)
            return
        }
        else {
            setLoading(false)
            if (totalCount === 1) {
                setAlignmentFlag(false)
                navigate("/app/dashboard")
            }
            else {
                navigate("/alignment/centers")
            }
        }
    }

    const getLookupsForProgramsList = async () =>{
        const res = await getLookups(11)
        if (!res?.isSuccessful) {
            SetErrMessage(res?.message)
            setLoading(false)
            return false
        } else {
            setProgramLoaded(true)
            var data = res?.responseBody?.data?.lookup?.StateFeePrograms?.content?.data
            let programs = []
            data.map((program)=>{
               programs.push(program.name)
            })
            centerPrograms = programs.toString()
            //setCenterPrograms(programs.toString())
            return true
        }
    }

    useEffect(async () => {
        SetErrMessage('')
        setProgramLoaded(false)
        setLoading(true)
        setDataLoaded(false)
        setTermsLoaded(false)
        lookupValues?.isEmpity && (refreshLookup())

        const hasListOfPrograms = await getLookupsForProgramsList();

        if(!hasListOfPrograms){
            return
        }

        ///getMessageByCode
        const res = await TransferRequirmentsCompletionLetterReq(false,'AL-1')
        if (!res?.isSuccessful) {
            SetErrMessage(res?.message)
            setLoading(false)
            return
        } else {
             setTermsLoaded(true)
             setRejectMsg(TermsContent(res?.responseBody?.data[0]?.messageCode[0]?.Content))
        }

        ////CentertDetails
        const getCenterDetails = await CentertDetails(licenseNumber);
        if (!getCenterDetails?.isSuccessful) {
            SetErrMessage(getCenterDetails?.message)
            setLoading(false)
            return
        }
        else {
            setDataLoaded(true)
            let Details = getCenterDetails.responseBody.data
            setDetails(details => {
                details = {
                    ...formatGetCenterDetails(Details),
                    ...getOwnerDetails(Details),
                    companyName: Details?.center?.name,
                    Transportation: Details?.StateFeeCenterTransport_r?.isTransportService ? 'yes' : '',
                    centerProgramsList: Details?.center?.isStateFeeService ? centerPrograms : null
                }
                console.log("Details ====> ", details)
                return details
            })
        }
        setLoading(false)
    }, [])

    const title = 'تفاصيل المركز'
    const additionalFields = () => {
        return (<Grid
            container
            mt={3}
        >
            <Grid item md={12}>
                <Checkbox
                    checked={isAgree}
                    onChange={(e) => {
                        setIsAgree(prevValue => !prevValue)
                    }}
                />
                {termsLabel(handleClickOpen)}
            </Grid>
        </Grid>)

    }

    const submitBtn = {
        btnName: "الموافقة",
        handleClick: ({ setErrorMessage, values }) => {
            if (isAgree) {
                handleSubmit(1)
            }
        },
        disabled: !isAgree
    }
    const cancelBtn = {
        btnName: "الإعتراض",
        handleClick: ({ setErrorMessage, values }) => {
            setBtnsOptions({ onAccept: () => { setOpen(false); handleSubmit(-1) }, acceptBtnName: 'تم' });
            setDialogContent(rejectMsg);
            setDialogTitle('إرشادات التقديم على الإعتراض')
            setOpen(true)
        },
    }
    return (<>
        {!loading ? <>
            {!dataLoaded || !termsLoaded  || !programLoaded?
            <Grid container spacing={3} mt={3}>
                <Grid item md={12} xs={12}>
                    {errMessage && (
                        <Alert variant="outlined" severity="error">
                            {errMessage}
                        </Alert>
                    )}
                </Grid>
            </Grid>:
              <>
                <PageViewer
                    title={title}
                    isLoading={loading}
                    lookupObject={lookupValues}
                    schema={testCenterDatailsSchema}
                    additionalFields={additionalFields()}
                    submitBtn={submitBtn}
                    cancelBtn={cancelBtn}
                    errMessage={errMessage}
                    data={details}
                    navBackUrl={{ url: '/alignment/centers' }}

                />
                <Grid container>
                    <Grid item md={6}>
                        <TermsDialog setAgreeValue={
                            () => {
                                setIsAgree(true)
                            }
                        } dialogContent={dialogContent} dialogTitle={dialogTitle} open={open} setField={(fieldName, fieldValue) => setField(fieldName, fieldValue)} onClose={() => { setOpen(false) }} onAccept={btnsOptions.onAccept} acceptBtnName={btnsOptions.acceptBtnName}
                        />
                    </Grid>
                </Grid>
            </>}
        </> :
            <CircularProgress
                size="15rem"
                style={{
                    display: 'block',
                    marginTop: '10%',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    color: '#E2E8EB'
                }}
            />}
   
    </>
    )
}

export default AlignmentCenterDetailsPage
