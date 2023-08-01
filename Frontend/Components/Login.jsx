
import React, { useEffect, useState } from 'react'
import { Typography, FormControl, InputLabel, Container, FilledInput, Input, Box, InputAdornment, IconButton, Link, Grid, Button, Card, TextField, useTheme } from '@mui/material'
import { VisibilityOff, Visibility } from '@mui/icons-material'
import MailTwoToneIcon from '@mui/icons-material/MailTwoTone';
import axios from 'axios';
import FormHelperText from '@mui/material/FormHelperText';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [mail,setmail]=useState('');
  const [password,setpassword]=useState('');
  const [error,seterror]=useState('');
  const theme = useTheme();
  const handlemail=(e)=>{
    seterror('');
    setmail(e.target.value)
  }
  const handlepassword=(e)=>{
    seterror('');
    setpassword(e.target.value)
  }
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      
      <Container justifyContent="center" component="main" maxWidth="xs" sx={{ marginTop:20,  backgroundColor:'rgba(255,255,255,0.6)',backdropFilter:blur('2px'), border: `1px solid ${theme.palette.divider}`, padding: 3, paddingBottom: 2, '&:hover': { boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' } }} >
      <center><Typography variant='h6'>Enter You details to Login</Typography></center>
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2} >
            <Grid item xs={12}  >
              <TextField
                onChange={handlemail}
                autoFocus
                fullWidth={true}
                id="filled-basic"
                label="Email"
                variant="filled"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <MailTwoToneIcon />
                    </InputAdornment>
                  ),
                  inputProps: {
                    type: 'email',
                  },
                }}
                
              />
            </Grid>
            <Grid item xs={12} >
              <TextField
              onChange={handlepassword}
                fullWidth
                id="filled-password"
                label="Password"
                variant="filled"
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} edge='end' >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <center>
            <Button onClick={ async()=>{
            try {
              const response =await axios.post('http://localhost:3000/admin/login',{
                username:mail,
                password:password
              })
              let data=response.data;
              localStorage.setItem('token',data.token);
              window.location.assign('/all');
            }
            catch(error){
                 if(error.response && error.response.status===403){
                  seterror('wrong Details entered..!!');
                 }else{
                  seterror('Something went worng Try again')
                 }
            }
            }} variant="contained" sx={{ mt: 3, mb: 2 }} >Login</Button> </center>
            {error && <FormHelperText error>{error}</FormHelperText> }
          <Grid container justifyContent={'flex-end'} sx={{ mb: 1 }} >
            <Grid>
              <Link href="/" variant="body2">
                New Here ? Register
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  )
}