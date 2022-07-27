import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import Skeleton from '@material-ui/lab/Skeleton';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useNavigate } from 'react-router';
import { downloadFileAPI } from 'src/Core/API/APIRequest';
import { useLookup } from 'src/Core/Contexts/useLookup';
import { OWNER_TYPE } from 'src/Core/Utils/enums';

const CentersTable = (props) => {
  const [trans] = useTranslation('common');
  const Navigate = useNavigate();
  const { loading = false, centerRequests = [] } = props;
  const lookupValues = useLookup()

  const getCenterType = (value, values) => {
    //const res = centerTypes?.find((center) => center.ID === centerType);                    targetedBenificiray: reqDetails.center?.targetedBeneficiary,
    const res = lookupValues['centerType']?.filter(lv => lv.ID === value)[0]?.name;
    if (!!res) {
      return res
    } else {
      return '_'
    }
  };
  const getOwnerType = (licenseType) => {
    if (licenseType === OWNER_TYPE.NATURAL_TYPE) {
      return trans('dashboard.centers_table.natural_type')

    } else {
      return trans('dashboard.centers_table.legel_type')
    }
  }

  const downloadFileFn = async (licenseDoc, name, licenseNumber) => {
    console.log(`${licenseDoc} : downloadFileFn===============> ${licenseDoc === 54796}`)
    const url = 'taheel-apis-utilities-downloadDocument-v2';
    const fileName = `${name}-${licenseNumber}`;
    const queryParams = {
      DocID: licenseDoc,
      attachment: true,
    };
    try {
      await downloadFileAPI({ queryParams, url, fileName });
    } catch {

    }
    return;
  };
  return (
    <Card>
      <CardHeader title={
        loading ? (
          // 'المراكز'
          trans('dashboard.sidebar.centers')
        ) : (
          <Skeleton animation="wave" height={15} width="20%" style={{ marginBottom: 6 }} />
        )
      }
      />
      <Divider />
      <PerfectScrollbar>
        <Box sx={{ minWidth: 800, minHeight: 400 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  {loading ?
                    // 'اسم المركز'
                    trans('dashboard.latest_requests.center_name')
                    : (
                      <Skeleton />
                    )}
                </TableCell>
                <TableCell>
                  {loading ?
                    // 'نوع المركز'
                    trans('dashboard.centers_table.center_type')
                    : (
                      <Skeleton />
                    )}
                </TableCell>
                <TableCell>
                  {loading ?
                    // 'تاريخ إنتهاء الرخصة'
                    trans('dashboard.centers_table.license_expiration_date')
                    : (
                      <Skeleton />
                    )}
                </TableCell>
                <TableCell sortDirection="desc">
                  {loading ?
                    // 'صفة المالك'
                    trans('dashboard.centers_table.owner_type')
                    : (
                      <Skeleton />
                    )}
                </TableCell>
                <TableCell>
                  {loading ?
                    // 'رقم الرخصة'
                    trans('dashboard.centers_table.license_number')
                    : (
                      <Skeleton />
                    )}
                </TableCell>
                <TableCell>
                  {loading ?
                    // 'تنزيل الرخصة'
                    trans('dashboard.centers_table.download_license')
                    : (
                      <Skeleton />
                    )}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(!loading ? Array.from(new Array(6)) : centerRequests).map((request, index) => (
                <TableRow
                  hover
                  key={index + "center"}
                >
                  <TableCell>
                    {request ? request.name
                      : (
                        <Skeleton />
                      )}
                  </TableCell>
                  <TableCell>
                    {request ? getCenterType(request.type, request)
                      : (
                        <Skeleton />
                      )}
                  </TableCell>
                  <TableCell>
                    {request ? request.centerLicense_r?.expirationHijri
                      : (
                        <Skeleton />
                      )}
                  </TableCell>
                  <TableCell>
                    {request ? getOwnerType(request?.centerOwner_r?.ownerType)
                      : (
                        <Skeleton />
                      )}
                  </TableCell>
                  <TableCell>
                    {request ? request.centerLicense_r?.LicenseNumber
                      : (
                        <Skeleton />
                      )}
                  </TableCell>
                  <TableCell>
                    {request && request.centerLicense_r?.LicenseDoc?.id !== null ? (
                      <ButtonWithLoading
                        callBackFn={() => downloadFileFn(request.centerLicense_r?.LicenseDoc?.id, request.name, request.centerLicense_r?.LicenseNumber)}
                      >
                      </ButtonWithLoading>
                    ) : request && request.centerLicense_r?.LicenseDoc === null ? (<></>) : (<Skeleton />)
                    }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2
        }}
      >
        {
          loading ? (
            <Button
              color="primary"
              endIcon={<ArrowLeftIcon />}
              size="large"
              variant="text"
              onClick={(e) =>
                Navigate('/app/centers')
              }
            >
              {/* عرض جميع المراكز */}
              {trans('dashboard.centers_table.show_all_centers')}
            </Button>
          ) : (
            <Skeleton animation="wave" width="10%" />
          )
        }
      </Box>
    </Card>
  );
};


const ButtonWithLoading = ({ callBackFn }) => {
  const [trans] = useTranslation('common');
  const [loading, setLoading] = useState(false);
  const handleOnClickFn = async () => {
    console.log(`loading ${loading}`);
    setLoading(true);
    await callBackFn();
    console.log(`loading ${loading}`);
    setLoading(false);
    console.log(`loading ${loading}`);
  }
  return (
    <>
      {
        !loading ? (
          <Button
            variant="contained"
            color="primary"
            startIcon={<CloudDownloadIcon />}
            onClick={() => handleOnClickFn()}
          >
            {/* تنزيل الشهادة */}
            {trans('dashboard.centers_table.download_certification')}
          </Button>
        ) : (
          <Skeleton />
        )
      }
    </>
  )
}
export default CentersTable;

CentersTable.propTypes = {
  loading: PropTypes.bool.isRequired,
  centerRequests: PropTypes.array.isRequired
};

ButtonWithLoading.propTypes = {
  callBackFn: PropTypes.func.isRequired,
};
