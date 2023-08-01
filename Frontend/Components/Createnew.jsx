import React, { useState } from 'react'
import { Card, Grid } from "@mui/material";
import { Typography, TextField, Button } from "@mui/material";
import axios from "axios";
export default function Createnew() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');

    return <div style={{display: "flex", justifyContent: "center"}}>
    <Card varint={"outlined"} sx={{backgroundColor: '#ced0d0c4',backdropFilter:blur('2px'), padding:2}} style={{maxWidth: 600, marginTop: 100}}>
        <div style={{padding: 20}}>
            <center>
            <Typography variant='h6' style={{marginBottom: 10}}>Enter New Course Details</Typography> </center>
            <TextField
                autoFocus
                label="Enter the Title"
                style={{marginBottom: 10}}
                onChange={(e) => {
                    setTitle(e.target.value)
                }}
                fullWidth={true}
                
                variant="outlined"
            />

            <TextField
                label="Enter the description"
                style={{marginBottom: 10}}
                onChange={(e) => {
                    setDescription(e.target.value)
                }}
                fullWidth={true}
               
                variant="outlined"
            />

            <TextField
                label="Image Link for your course"
                style={{marginBottom: 10}}
                onChange={(e) => {
                    setImage(e.target.value)
                }}
                fullWidth={true}
                
                variant="outlined"
            />
            <TextField
                label="Enter course Price"
                style={{marginBottom: 10}}
                onChange={(e) => {
                    setPrice(e.target.value)
                }}
                fullWidth={true}
               
                variant="outlined"
            />
          <center>
            <Button
                variant="contained"
                onClick={async () => {
                    axios.post("http://localhost:3000/admin/courses" , {
                        title: title,
                        description: description,
                        imagelink: image,
                        published: true,
                        Price:price
                    }, {
                        headers: {
                            "Content-type": "application/json",
                            "Authorization": "Bearer " + localStorage.getItem("token")
                        }
                    });
                    alert("New Courese created");
                    window.location.assign('/all')
                }}
            >Create</Button></center>
        </div>
    </Card>
</div>
}
