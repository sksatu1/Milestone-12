import { Alert, Button, CircularProgress, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import loginImg from '../../../images/login.png'
import useAuth from '../../../useAuth/useAuth';

const Register = () => {
    const [logInData, setLogInData] = useState({})
    const history = useHistory()

    const { user, registerUser, isLoading, authError } = useAuth();

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLogInData = { ...logInData };
        newLogInData[field] = value;
        setLogInData(newLogInData);
    }


    const handleRegister = e => {
        if (logInData.password !== logInData.password2) {

            alert('Your password  did not  match');
            return;
        }

        registerUser(logInData.email, logInData.password, logInData.name, history)

        e.preventDefault();
    }

    
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item sx={{ mt: '100px' }} xs={12} md={6}>
                    <Typography variant="body1" gutterBottom>Register</Typography>
                    {!isLoading &&
                        <form onSubmit={handleRegister}>

                            <TextField
                                sx={{ width: 1, m: 1 }}
                                required
                                label="Your Name"
                                name='name'
                                onBlur={handleOnBlur}
                                variant='standard'
                                id="outlined-required"
                            />

                            <TextField
                                sx={{ width: 1, m: 1 }}
                                required
                                label="Your email"
                                type="email"
                                name='email'
                                onBlur={handleOnBlur}
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
                                onBlur={handleOnBlur}
                                variant='standard'
                            // autoComplete="current-password"
                            />

                            <TextField
                                sx={{ width: 1, m: 1 }}
                                required
                                id="outlined-password-input"
                                label="Re-type Password"
                                type="password"
                                name='password2'
                                onBlur={handleOnBlur}
                                variant='standard'
                            // autoComplete="current-password"
                            />

                            <NavLink style={{ textDecoration: 'none' }} to='/login'>
                                <Button>
                                    Already have an account?Log in
                                </Button>
                            </NavLink>

                            <Button type='submit' sx={{ width: 1, m: 1 }} variant="contained">Register</Button>

                        </form>}

                    {isLoading && <CircularProgress />}

                    {user?.email && <Alert severity="success">Registered successfully</Alert>
                    }

                    {authError && <Alert severity="error">{authError}</Alert>
                    }
                </Grid>
                <Grid item xs={12} md={6}>
                    <img style={{ width: '100%' }} src={loginImg} alt=''></img>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Register;