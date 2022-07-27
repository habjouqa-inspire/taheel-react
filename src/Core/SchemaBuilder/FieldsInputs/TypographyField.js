
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types'
import Skeleton from '@material-ui/lab/Skeleton';
import { Grid, Box, Divider } from '@material-ui/core';

export default function TypographyInput(props) {
    const margin = !!props.margin ? props.margin : 1;
    const gridSize = !!props.gridSize ? props.gridSize : 12

    if (!!props.name) {
        return (
            <Grid item xs={gridSize} >
                <Box m={margin} >
                    <Typography gutterBottom variant="body2" color="textSecondary" component="p">
                        {props.tLabel}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                        {
                            !props.isLoading ? (
                                !!props.attrFunc ?
                                    props.attrFunc(props.values)
                                    :
                                    props.values[props.attrName]
                            )
                                :
                                (<Skeleton animation="wave" height={15} width="20%" style={{ marginBottom: 6 }} />)
                        }
                    </Typography>
                </Box>
            </Grid>
        )
    } else if (props.type === 'HeadText') {
        return (
            <Grid item xs={gridSize} style={{ paddingTop: '20px' }} >
                <Box m={margin}>
                    <Typography variant="h4" style={{ fontWeight: 'bold' }} flexItem>
                        {props.tLabel}
                    </Typography>
                    <Divider light flexItem/>
                </Box>
            </Grid>
        );
    } else {
        return (
            <Grid item xs={gridSize} >

                <Box m={margin}>
                    <Typography component="h3">
                        {props.tLabel}
                    </Typography>
                </Box>
            </Grid>
        );
    }
}
TypographyInput.propTypes = {
    margin: PropTypes.number,
    values: PropTypes.object,
    gridSize: PropTypes.number,
    attrFunc: PropTypes.func,
    attrName: PropTypes.string,
    name: PropTypes.string,
    isLoading: PropTypes.bool,
}