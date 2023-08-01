import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Card, Grid } from "@mui/material";
import { Typography, TextField, Button } from "@mui/material";
import axios from "axios";

function Course() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const courseId = searchParams.get('id');
    const [course, setCourse] = useState(null);
    
    useEffect(() => {
        axios.get(`http://localhost:3000/admin/me/${courseId}`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res => {
            setCourse(res.data);
        });
    }, []);

    if (!course) {
        return <div style={{height: "80vh", justifyContent: "center", flexDirection: "column"}}>
            Loading....
        </div>
    }

    return <div>
        <GrayTopper title={course.title}/>
        <Grid container>
            <Grid item lg={8} md={12} sm={12}>
                <UpdateCard course={course} setCourse={setCourse} />
            </Grid>
            <Grid item lg={4} md={12} sm={12}>
                <CourseCard course={course} />
            </Grid>
        </Grid>
    </div>
}

function GrayTopper({title}) {
    return (
        <center>
        <div style={{height: 250, backgroundColor: '#111212eb',backdropFilter:blur('2px'),marginTop:4,borderRadius:4, top: 0, width: "96vw", zIndex: 0, marginBottom: -250}}>
        <div style={{ height: 250, display: "flex", justifyContent: "center", flexDirection: "column"}}>
            <div>
                <Typography style={{color: "white", fontWeight: 600}} variant="h3" textAlign={"center"}>
                    {title}
                </Typography>
            </div>
        </div>
    </div>
    </center>
    )
}

function UpdateCard({course, setCourse}) {
    const [title, setTitle] = useState(course.title);
    const [description, setDescription] = useState(course.description);
    const [image, setImage] = useState(course.imagelink);
    const [price, setPrice] = useState(course.Price);
   { console.log(title);console.log(description);console.log(image);console.log(price);
   }


    return <div style={{display: "flex", justifyContent: "center"}}>
    <Card varint={"outlined"} sx={{backgroundColor: '#ced0d0c4',backdropFilter:blur('2px'), padding:2}}  style={{maxWidth: 600, marginTop: 200}}>
        <div style={{padding: 20}}>
            <Typography style={{marginBottom: 10}}>Update course details</Typography>
            <TextField
                value={title}
                style={{marginBottom: 10}}
                onChange={(e) => {
                    setTitle(e.target.value)
                }}
                fullWidth={true}
                label="Title"
                variant="outlined"
            />

            <TextField
                value={description}
                style={{marginBottom: 10}}
                onChange={(e) => {
                    setDescription(e.target.value)
                }}
                fullWidth={true}
                label="Description"
                variant="outlined"
            />

            <TextField
                value={image}
                style={{marginBottom: 10}}
                onChange={(e) => {
                    setImage(e.target.value)
                }}
                fullWidth={true}
                label="Image link"
                variant="outlined"
            />
            <TextField
                value={price}
                style={{marginBottom: 10}}
                onChange={(e) => {
                    setPrice(e.target.value)
                }}
                fullWidth={true}
                label="Price"
                variant="outlined"
            />

            <Button
                variant="contained"
                onClick={async () => {
                    axios.put("http://localhost:3000/admin/courses/" + course._id, {
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
                    let updatedCourse = {
                        _id: course._id,
                        title: title,
                        description: description,
                        imagelink: image,
                        Price:price
                    };
                    setCourse(updatedCourse);
                }}
            > Update course</Button>
        </div>
    </Card>
</div>
}
function CourseCard(props) {
    const course = props.course;
    return <div style={{display: "flex",  marginTop: 50, justifyContent: "center", width: "100%"}}>
     <Card style={{
        margin: 10,
        width: 350,
        minHeight: 200,
        borderRadius: 20,
        marginRight: 50,
        paddingBottom: 15,
        zIndex: 2
    }}>
        <img src={course.imagelink} style={{width: 350}} ></img>
        <div style={{marginLeft: 10}}>
            <Typography variant="h5">{course.title}</Typography>
            <Typography variant="subtitle2" style={{color: "gray"}}>
                Price
            </Typography>
            <Typography variant="subtitle1">
                <b>Rs {course.Price} </b>
            </Typography>
        </div>
    </Card>
    </div>
}

export default Course;
