import {
    Box,
    Container,
    Typography
} from '@material-ui/core';
import { Helmet } from 'react-helmet';

const Unauthorized = () => (
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
                    عــذراً
                </Typography>
                <br></br>
                <Typography
                    align="center"
                    color="textPrimary"
                    variant="h4"
                >
                    نعتذر, ليس لديك صلاحية للوصول الى هذه الصفحة
                </Typography>
                <Box sx={{ textAlign: 'center' }}>
                    <img
                        alt="Under development"
                        src="/static/images/accessDenied.png"
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

export default Unauthorized;
