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
import {useContext,useState,useEffect} from "react"
import {useMutation} from "@apollo/client"
import {LOGIN_USER} from "../graphql/client/queries"
import { Login } from '@mui/icons-material';
import Alert from '@mui/material/Alert';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="http://localhost:3000">
        ProSpaces
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}




const theme = createTheme();


//this is Sign In function, which will be executed when the user clicks the signin button
// and the signin method is implemented using Google auth provider, which is taken from a hook - useAuthState()
function SignIn() { 
  const router = useRouter();

  const context=useContext(AuthContext);

  const [err,setErr]= useState({
    isError: false,
    message:null,
    code:null
  });
  const [success,setSuccess] = useState(0);    //update success message
  const [failure,setFailure] = useState(0);    //update failure message

  useEffect(()=>{
    
  },[failure])

  const [LogIn, {data,error,loading}] =  useMutation(LOGIN_USER,{
    update(_, {data: {login : userData}}){
        console.log(userData);
        context.logIn(userData);
    },
    onError(e){
      setErr({
        isError: true,
        code:null
      });
    }
  });

  console.log(err);

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = event?.target?.email?.value;
    const password = event?.target?.password?.value;
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
    LogIn({variables:{email:email, password:password}});
    router.push('/')
  };

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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="signUp" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
        {
          failure?(<Alert severity="error" onClose={() => {setFailure(0)}}>{err.message}</Alert>):(<></>)
        }
        
      </Container>
    </ThemeProvider>
  );
}

export default SignIn;