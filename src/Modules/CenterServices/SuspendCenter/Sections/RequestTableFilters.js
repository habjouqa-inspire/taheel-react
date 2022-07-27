import { Button, CircularProgress, FormControl, Grid, InputLabel, MenuItem, Select } from "@material-ui/core";
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useState } from "react";
import { Search as SearchIcon } from 'react-feather';


const RequestTableFilters = ({ getRquest, loading }) => {
    const requestTypes = [
        { name: 'تعليق عمل', value: 15 },
        { name: 'تمديد تعليق عمل', value: 16 },
        { name: 'الغاء تعليق عمل', value: 17 }


    ] //data in drop down
    const requestStatus = [
        { name: 'تحت الإجراء', value: 1 },
        { name: 'مقبول', value: 2 },
        { name: 'مرفوض', value: 3 },
        { name: 'مسودة', value: 4 }



    ]//data in drop down
    const [reqType, setReqType] = useState([15, 16]) //تعليق عمل و تمديد تعليق عمل initial values for dropdown
    const [status, setStatus] = useState([1])
    const [lastHitStatus, setLasitHitStatus] = useState([]) //to chcek if statuses in dropdown changed or not
    const [lastHitReqType, setLastHitReqType] = useState([])//to chcek if requestType in dropdown changed or not
    const theme = useTheme(); //for deopdown
    
    const getFilteredRequests = () => {
        setLastHitReqType(reqType)
        setLasitHitStatus(status)
        getRquest(reqType, status)
    }

    return <>
        <Grid container spacing={2} >
            <Grid item className="custom-label-field">
                <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="demo-multiple-name-label">نوع الطلب</InputLabel>
                    <Select
                        multiple
                        dir="rtl"
                        className="custom-field"
                        disabled={loading}
                        MenuProps={{
                            getContentAnchorEl: null // to prevent dropdown paper moving to other position
                        }}
                        value={reqType}
                        onChange={e => {
                            setReqType(e.target.value)
                        }}
                    
                        variant='outlined'
                    >
                        {requestTypes.map((type) => (
                            <MenuItem
                                key={type.value}
                                value={type.value}

                            >
                                {type.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>


            <Grid item className="custom-label-field">
                <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel >حالة الطلب</InputLabel>
                    <Select
                        multiple
                        dir="rtl"
                        disabled={loading}
                        MenuProps={{
                            getContentAnchorEl: null // to prevent dropdown paper moving to other position
                        }}
                        value={status}
                        className="custom-field"
                        
                        onChange={e => {
                            setStatus(e.target.value)
                        }}

                        variant='outlined'
                    >
                        {requestStatus.map((type) => (
                            <MenuItem
                                key={type.value}
                                value={type.value}

                            >
                                {type.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid sx={{ m: 1, width: 300 }} item className="custom-label-field">
            <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel ></InputLabel>
                <Button
                    className="custom-field"
                    startIcon={loading ? <CircularProgress size="1rem" /> : <SearchIcon size="1rem" />}
                    variant='outlined'
                    disabled={loading}
                    onClick={() => {
                        
                        getFilteredRequests()

                    }
                    }
                >بحث</Button>
                </FormControl>

            </Grid>

        </Grid>
    </>
}
export default RequestTableFilters;
RequestTableFilters.propTypes = {
    getRquest: PropTypes.func,
    loading: PropTypes.any

};