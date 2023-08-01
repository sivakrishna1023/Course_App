import React, { useEffect, useState } from 'react'

import { Box, Button, TextField, Card, Paper, CssBaseline, Typography, Grid, Link } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
export default function Allcourses() {
    const [course, setcourse] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
      
        fetch('http://localhost:3000/admin/courses', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }).then(resp => resp.json()).then((data) => {setcourse(data)});
    }, [])
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', paddingTop: 40 }} >
            {console.log(course.courses)}
            {course.courses && course.courses.map((element) => (
                <div style={{ margin: 10 }} key={element._id}>
                    <ImgMediaCard imglink={element.imagelink} title={element.title} description={element.description} price={element.price} id={element._id} />
                </div>
            ))}
        </div>
    )
}
function ImgMediaCard(props) {
    const [imageLoadingError, setImageLoadingError] = useState(false);
    const handleImageError = () => {
      setImageLoadingError(true);
    };
  return (
    <Card sx={{ maxWidth: 370,  backgroundColor: '#ced0d0c4',backdropFilter:blur('2px'), padding:2}}>
      <CardMedia
        component="img"
        alt='Image Not found'
        height="140"
        src={imageLoadingError ? 'https://cdn.britannica.com/49/182849-050-4C7FE34F/scene-Iron-Man.jpg' : props.imglink}
        onError={handleImageError}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Buy</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}