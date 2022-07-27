import { Helmet } from 'react-helmet';
import {
    Box,
    Container,
    Typography
} from '@material-ui/core';

const ComingSoon = () => (
    <>
        <Helmet>
        </Helmet>
        <Box
            sx={{
                backgroundColor: 'background.default',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                justifyContent: 'center'
            }}
        >
            <Container maxWidth="md">
                <Typography
                    align="center"
                    color="textPrimary"
                    variant="h1"
                    fontWeight={'bold'}
                >
                    قــــريــــبــــاً
                </Typography>
                <br></br>
                <Typography
                    align="center"
                    color="textPrimary"
                    variant="h4"
                >
                    هذه الصفحة تحت الإنشاء, الرجاء العودة في وقت لاحق
                </Typography>
                <Box sx={{ textAlign: 'center' }}>
                    <img
                        alt="Under development"
                        src="/static/images/comingSoon.png"
                        style={{
                            marginTop: 50,
                            display: 'inline-block',
                            maxWidth: '100%',
                            width: 560
                        }}
                    />
                </Box>
            </Container>
        </Box>
    </>
);

export default ComingSoon;
