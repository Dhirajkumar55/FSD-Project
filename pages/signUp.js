import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useRouter} from 'next/router'
import { AuthContext } from '../context/auth';
import {useContext,useState} from "react"
import {useMutation} from "@apollo/client"
import {REGISTER_USER} from "../graphql/client/queries"
import styled from 'styled-components'
import Alert from '@mui/material/Alert';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="http://localhost:3000">
        ProSpaces
      </Link>{''}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

//this is Sign Up function, which will be executed when the user clicks the signUp button
// and the signup method is implemented using Google auth provider, which is taken from a hook - useAuthState()
function SignUp() {
  
  const router = useRouter();

  const context=useContext(AuthContext);

  const [err,setErr]= useState({
    isError: false,
    message:null,
    code:null
  });

  const [success,setSuccess] = useState(0);    //update success message
  const [failure,setFailure] = useState(0);    //update failure message

  const [SignUp, {data,error,loading}] = useMutation(REGISTER_USER,{
    update(_, {data: {signup : userData}}){
        console.log(userData);
        context.signUp(userData);
    }
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const firstName = event?.target?.firstName?.value;
    const lastName = event?.target?.lastName?.value;
    const username = event?.target?.username?.value;
    const email = event?.target?.email?.value;
    const password = event?.target?.password?.value;
    const name = firstName + " " + lastName;
    if(!(email.includes('@'))){
      setErr({isError: true, code:"INVALID_EMAIL_ADDRESS", message:"Please enter a valid email address"});
      setFailure(1);
      return;
    }
    else if(password.length < 8){
      setErr({isError: true, code:"PASSWORD_LESS_THAN_8_CHARACTERS", message:"Please enter a password more than 8 characters"});
      setFailure(1);
      return;
    }
    SignUp({variables:{email:email, username:username, password:password, name:name}});
    router.push('/');
  };

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <UserAvatar sx={{ m: 3 , height: '100px', width: '100px'}}/>

         
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="signIn" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
        {
          failure?(<Alert severity="error" onClose={() => {setFailure(0)}}>{err.message}</Alert>):(<></>)
        }
      </Container>
    </ThemeProvider>
  );
}


export default SignUp;

const UserAvatar = styled(Avatar)`
    cursor: pointer;
    :hover{
        opacity:0.8;
    }
`;
