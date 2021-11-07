import { Alert, Button, CircularProgress, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useHistory, useLocation } from "react-router-dom";
import loginImg from '../../../images/login.png'
import useAuth from '../../../useAuth/useAuth';
 
const Login = () => {
    const [logInData, setLogInData] = useState({})
    const { user, loginUser, isLoading, authError, signInWithGoogle } = useAuth();

    const history = useHistory();
    const location = useLocation();

    const handleOnChange = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLogInData = { ...logInData };
        newLogInData[field] = value;
        setLogInData(newLogInData);
        console.log(logInData)
    }


    const handleLogin = e => {
        loginUser(logInData.email, logInData.password, history, location)
        alert('logged in');
        e.preventDefault();
    }


    const handleGoogleSignIn = () => {
        signInWithGoogle(history, location)
    }
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item sx={{ mt: '100px' }} xs={12} md={6}>
                    <Typography variant="body1" gutterBottom>login</Typography>
                    <form onSubmit={handleLogin}>
                        <TextField
                            sx={{ width: 1, m: 1 }}
                            required
                            label="Your email"
                            type="email"
                            name='email'
                            onChange={handleOnChange}
                            variant='standard'
                            id="outlined-required"
                        />

                        <TextField
                            sx={{ width: 1, m: 1 }}
                            required
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            name='password'
                            onChange={handleOnChange}
                            variant='standard'
                        // autoComplete="current-password"
                        />

                        <NavLink style={{ textDecoration: 'none' }} to='/register'>
                            <Button>
                                New User?Register here
                            </Button>
                        </NavLink>

                        <Button type='submit' sx={{ width: 1, m: 1 }} variant="contained">login</Button>

                    </form>

                    {isLoading && <CircularProgress />}

                    {user?.email && <Alert severity="success">Registered successfully</Alert>
                    }

                    {authError && <Alert severity="error">{authError}</Alert>
                    }

                    <p>--------------------------------</p>
                    <Button onClick={handleGoogleSignIn} variant="contained">Google SignIn</Button>
                </Grid>
                <Grid item xs={12} md={6}>
                    <img style={{ width: '100%' }} src={loginImg} alt=''></img>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Login;