import React, { useState } from 'react'
import FieldsCreator from "./FieldsCreator"
import ButtonField from './FieldsInputs/ButtonField'
//import { useTranslation } from 'react-i18next'
import {
  Grid,
  Box,
  Card,
  Alert,
  AlertTitle,
  CardContent,
  CardHeader,
  Divider,
  Badge,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router'
import IconsTypeEnum from './Utils/IconsTypeEnum'
import IconsList from './FieldsInputs/IconsList'
import Fab from '@mui/material/Fab';

export default function PageViewer({
  title,
  isLoading,
  submitBtn,
  cancelBtn,
  schema,
  data,
  navBackUrl,
  lookupObject,
  additionalFields,
  errMessage,
  alertComment,
  fieldsName,
  sectionNames
}) {
  //const [t] = useTranslation('common')
  const navigateion = useNavigate()
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(errMessage)

  const btnsJustify = !!submitBtn?.btnName && !!cancelBtn?.btnName ? "space-between" : !!submitBtn?.btnName ? "flex-end" : "flex-start"
  const handleSubmit = async () => {
    setLoading(true)
    if (!!submitBtn?.handleClick) {
      await submitBtn.handleClick({ values: data, setErrorMessage: (errMessage) => { setErrorMessage(errMessage) } })
    }
    setLoading(false)
  }
  const handleCancel = async () => {
    setLoading(true)
    if (!!cancelBtn?.handleClick)
      await cancelBtn.handleClick({ values: data, setErrorMessage: (errMessage) => { setErrorMessage(errMessage) } })
    setLoading(false)
  }
  return (
    <Box style={{ pointerEvents: loading ? "none" : '' }}>
      <Card style={{ padding: "20px", minHeight: "100%" }}>
        {title ?
          <>
            <CardHeader
              title={!!navBackUrl ?
                (
                  <Grid container spacing={4}>
                    <Grid item>
                      <Badge
                        badgeContent={
                          < Fab size="small" color="primary" aria-label="add" onClick={() => navigateion(navBackUrl.url, { state: navBackUrl.state })}>
                            <IconsList iconType={IconsTypeEnum.ARROW_FORWARD_ICON} color="info" />
                          </Fab>}
                        onClick={() =>
                          navigateion(navBackUrl.url, { state: navBackUrl.state })
                        }
                      >
                      </Badge>
                    </Grid>
                    <Grid item><p style={{ fontWeight: "bold" }} >{title}</p> </Grid>
                  </Grid>
                )
                :
                <p style={{ fontWeight: "bold" }} >{title} </p>
              }
            />
            <Divider />
          </> :
          <></>
        }
        <CardContent  >
          {errorMessage && (
            <Alert variant="outlined" severity={!!errorMessage.type ? errorMessage.alertype : "error"}>
              {errorMessage.msg|| errorMessage}
            </Alert>)
          }
          {alertComment && alertComment.msg && (<Alert variant="outlined" severity="warning" sx={{ marginLeft: 2, marginRight: 2, marginTop: 1 }}>
            <AlertTitle> {alertComment.title}</AlertTitle>
            {alertComment?.msg}
          </Alert>)
          }
          <Grid
            container
            spacing={3}
            mt={3}
            mb={3}
            style={{ paddingRight: '80px', paddingLeft: '150px' }}
          >
            {FieldsCreator({ schema, fieldsName, sectionNames, lookupObject, formType: "view", values: data, isLoading, setField: (fieldName, fieldValue) => setField(fieldName, fieldValue), setErrMessage: (errMessage) => setErrorMessage(errMessage) })}
          </Grid>
          {additionalFields}
          {!isLoading &&
            <Grid
              container
              direction="row"
              justifyContent={btnsJustify}
              alignItems="center"
            >
              {!!cancelBtn?.btnName &&
                (<Grid item  >
                  <ButtonField
                    btnName={<IconsList iconType={IconsTypeEnum.DELETE_ICON} label={cancelBtn.btnName} color="alert" />}
                    loading={loading}
                    disabled={cancelBtn?.disabled}
                    color="secondary"
                    onClick={() => handleCancel(data)} />
                </Grid>)
              }
              {!!submitBtn?.btnName &&
                (<Grid item  >
                  <ButtonField
                    btnName={<IconsList iconType={IconsTypeEnum.EDIT_ICON} label={submitBtn.btnName} color="info" />}
                    loading={loading}
                    disabled={submitBtn?.disabled}
                    onClick={() => handleSubmit(data)} />
                </Grid>)
              }
            </Grid>
          }
        </CardContent>
      </Card>
    </Box >
  )
}
PageViewer.propTypes = {
  data: PropTypes.object,
  pageName: PropTypes.string,
  navBackUrl: PropTypes.object,
  formType: PropTypes.string,
  title: PropTypes.string,
  submitBtn: PropTypes.object,
  schema: PropTypes.array,
  initValues: PropTypes.any,
  sectionNames: PropTypes.array,
  cancelBtn: PropTypes.object,
  lookupObject: PropTypes.object,
  additionalFields: PropTypes.any,
  fieldsName: PropTypes.object,
  errMessage: PropTypes.string,
  alertComment: PropTypes.any,
  isLoading: PropTypes.bool,
}