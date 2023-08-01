import React, { useEffect, useState } from 'react'
import { Typography, FormControl, InputLabel, Container, FilledInput, Input, Box, InputAdornment, IconButton, Link, Grid, Button, Card, TextField, useTheme } from '@mui/material'
import { VisibilityOff, Visibility } from '@mui/icons-material'
import MailTwoToneIcon from '@mui/icons-material/MailTwoTone';
import axios from 'axios';
import FormHelperText from '@mui/material/FormHelperText';
import { blue } from '@mui/material/colors';
export default function Register() {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [mail, setmail] = useState('');
  const [password, setpassword] = useState('');
  const [error,seterror]=useState('');
  const handlemailchange=(e)=>{
      seterror('');
      setmail(e.target.value);
  }
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
     <div style={{}} >
      <Container justifycontent="center" component="main" maxWidth="xs" sx={{ marginTop:20,  backgroundColor:'rgba(255,255,255,0.6)',backdropFilter:blur('2px'), border: `1px solid ${theme.palette.divider}`, padding: 3, paddingBottom: 2, '&:hover': { boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' } }} >
      <center><Typography variant='h6'>Welcome Register Yourself...!!</Typography></center>
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2} >
            <Grid item xs={12} sm={6} >
              <TextField autoFocus fullWidth label="First Name" variant="filled" ></TextField>
            </Grid>

            <Grid item xs={12} sm={6} >
              <TextField fullWidth label="Last Name" variant="filled" ></TextField>
            </Grid>
            <Grid item xs={12}  >
              <TextField
                onChange={handlemailchange}
            
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
               onChange={(e)=>{setpassword(e.target.value)}}
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
            <Button variant="contained" onClick={ async ()=>{
                 try{
                  const response= await axios.post('http://localhost:3000/admin/signup',{
                    username:mail,
                   password:password
                   })
                   const data=response.data;
                   localStorage.setItem('token',data.token);
                   alert('You account created please Login')
                   window.location.assign('/login');
                 }catch(error){
                  if (error.response && error.response.status === 403) {
                    seterror('User already exists.');
                  } else {
                    seterror('unknown error is occured');
                    
                  }
                 }
            }} sx={{ mt: 3, mb: 2 }} >Register</Button> </center>
             {error && <FormHelperText error>{error}</FormHelperText>}
          <Grid container justifyContent={'flex-end'}  sx={{ mb: 1 }}>
            <Grid>
              <Link href="/login" variant="body2">
                Already have an account? Login
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
     </div>
    </>
  )
}

// import React, { useState } from 'react'
// import { Box, Button, TextField, Card, Paper, CssBaseline, Typography, Grid, Link } from '@mui/material';
// export default function Register() {
//     const [email,setemail]=useState('');
//     const [password,setpassword]=useState('');

//     return (
//         <> 
//             <div style={{ marginTop: 150, marginBottom: 10, display: 'flex', justifyContent: 'center' }}  >
//                 <Typography variant="h6" > Welcome Complete Your SignUp Here...!!</Typography>
//             </div>
//             <div style={{ display: 'flex', justifyContent: 'center' }} >
//                 <Box>
//                     <Card variant="outlined" style={{ width: 400, padding: 30 }}  >
//                         <TextField onChange={(e)=>{setemail(e.target.value); }} autoComplete="email" autoFocus fullWidth={true} id="outlined" label="Enter Mail" variant="outlined" /> <br /> <br />
//                         <TextField onChange={(e)=>{setpassword(e.target.value);}} fullWidth={true} id="outlined" label="Enter Password" variant="outlined" /> <br /> <br />
//                         <center><Button variant="contained" onClick={()=>{
//                               fetch('http://localhost:3000/admin/signup',{
//                                 method:"POST",
//                                   body: JSON.stringify({
//                                     username:email,
//                                     password:password
//                                   }),
//                                   headers: {
//                                     'Content-Type': 'application/json'
//                                   },
//                                  }).then(response=> response.json()).then(data=>{
//                                         console.log(data.message);
//                                         console.log(data.token);
//                                         localStorage.setItem('token',data.token);
//                                         window.location.href = '/all'; 
                          
//                                  }).catch((error)=>{console.log(error)});
                                  
//                         }}>Register</Button> </center>  <br /> <br />

//                         <Grid container justifyContent={'flex-end'} >
//                             <Grid>
//                                 <Link href="/login" variant="body2">
//                                     Already have an account? Login
//                                 </Link>
//                             </Grid>
//                         </Grid>
//                     </Card>
//                 </Box>
//             </div>
//         </>

//     );
// }
