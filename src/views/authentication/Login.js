import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {
    Backdrop,
    Button,
    CircularProgress,
    Card,
    CardContent,
    CardHeader,
    FormHelperText,
    FormControl,
    Icon,
    IconButton,
    InputLabel,
    InputAdornment,
    OutlinedInput,
} from '@material-ui/core';

import {
    Visibility,
    VisibilityOff,
} from '@material-ui/icons';

import * as actions from '../../store/actions/index';
import { CCol, CLabel } from '@coreui/react';

const useStyles = makeStyles((theme) => ({
    root: {
        // flexGrow: 1,
        background: '#eee',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 450,
        borderRadius: '10px',
        boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
        paddingRight: '32px'
    },
    cardheader: {
        padding: theme.spacing(0),
        textAlign: 'center',
        color: theme.palette.text.primary,
    },
    margin: {
        margin: theme.spacing(1),
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    errorMessage: {
        color: '#f00',
        textAlign: 'center',
        fontWeight: "bolder",
    },
    imgsize: {
        width: '400px',
    },
    txtCenter: {
        textAlign: 'center'
    }
}));

const Login = (props) => {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        username: '',
        password: '',
        showPassword: false,
        isErrorUsername: false,
        isErrorPassword: false,
    });
    const image = window.location.origin + '/' + process.env.REACT_APP_LOGO;
    const appName = process.env.REACT_APP_NAME;
    const branch = process.env.REACT_APP_BRANCH + ' Branch'

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const clickLogin = (event) => {
        event.preventDefault();

        let hasError = false;
        let errorUsername = false;
        let errorPassword = false;
        if (values.username === '') {
            hasError = true;
            errorUsername = true;
        }
        if (values.password === '') {
            hasError = true;
            errorPassword = true;
        }
        setValues({
            ...values,
            isErrorUsername: errorUsername,
            isErrorPassword: errorPassword,
        });

        if (!hasError) {
            props.onAuth(values.username, values.password);
        }
    }

    let usernameError = null;
    if (values.isErrorUsername) {
        usernameError = <FormHelperText id="helper-outlined-adornment-login-username">Username is required.</FormHelperText>
    }

    let passwordError = null;
    if (values.isErrorPassword) {
        passwordError = <FormHelperText id="helper-outlined-adornment-login-password">Password is required.</FormHelperText>
    }

    let authRedirect = null;
    if (props.isAuthenticated) {
        authRedirect = <Redirect to="/dashboard" />
    }

    return (
        <div className={classes.root}>
            {authRedirect}
            <Backdrop className={classes.backdrop} open={props.loading}>
                <CircularProgress color="inherit" />
            </Backdrop>

            <Card className={classes.card}>
                <CCol md="12" className="px-0 text-left">
                    <CLabel>Powered by:</CLabel>
                </CCol>
                <CardHeader
                    className={classes.cardheader}
                    title={<img src={image} alt={appName} className={clsx(classes.imgsize, "brand-image img-circle elevation-3")} style={{ opacity: '.8' }} />}
                // subheader="LOGIN"
                />
                <CCol md="12" className="px-0 text-center">
                    <CLabel className="font-weight-bold">{branch}</CLabel>
                </CCol>

                <CardContent>
                    <form onSubmit={clickLogin}>
                        <FormControl error={values.isErrorUsername} fullWidth className={clsx(classes.margin)} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-login-username">Username</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-login-username"
                                value={values.username}
                                onChange={handleChange('username')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <Icon className="fas fa-user" />
                                    </InputAdornment>
                                }
                                labelWidth={75}
                            />
                            {usernameError}
                        </FormControl>
                        <FormControl error={values.isErrorPassword} fullWidth className={clsx(classes.margin)} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-login-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-login-password"
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={handleChange('password')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                labelWidth={70}
                                aria-describedby="helper-outlined-adornment-login-password"
                            />
                            {passwordError}
                        </FormControl>
                        <FormControl fullWidth className={clsx(classes.margin, classes.errorMessage)} variant="outlined">
                            {props.error}
                        </FormControl>
                        <FormControl fullWidth className={clsx(classes.margin)} variant="outlined">
                            <Button size="large" variant="contained" color="primary" type="submit">
                                <Icon className="mfe-2 fas fa-sign-in-alt" />
                                Login
                            </Button>
                        </FormControl>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (username, password) => dispatch(actions.auth(username, password)),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
