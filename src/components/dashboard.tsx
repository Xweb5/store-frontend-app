import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import NavBar from "./NavBar";
import Grid from '@mui/material/Grid2';
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Container, Paper, styled, Typography } from "@mui/material";
import axios from "axios";
import { chartCounter } from "../context/manageContext";
import { useAtom } from "jotai";
import Swal from "sweetalert2";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

function createData(
  title: string,
  author: string,
  price: number,
  items: number,
) {
  return { title, author, price, items};
}


export default function Dashboard() {

  const [incrementListBook, setIncrementListBook] = useAtom(chartCounter);
  const [rows, setRows] = React.useState([]);


  useEffect(() => {


    axios.get('http://localhost:8080/bookshop/v1/books/' , 
        { 
          auth: {
            username: 'user',
            password: 'password'
          }
        }).then((response) => {
            setRows(response.data);
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: err.message,
            showConfirmButton: true,
            timer: 1500
          });
        });
  }, []);

  const addBook = (row: any) => {
    
    let monSet = new Map();
    let localSet = localStorage.getItem("listOfBooks");
    if (localSet !== null) {
      monSet = new Map(JSON.parse(localSet));
    }
    if (row["items"] === undefined || localSet === "[]")  {
      row["items"] = 0
    }
    row.items++;

    monSet.set(row.id, row);
    
    localStorage.setItem("listOfBooks", JSON.stringify(Array.from(monSet)));
    
    setIncrementListBook((c) => c+1)

  };

  if (!Boolean(localStorage.getItem("authenticated"))) {
    return <Navigate replace to="/login" />;
  } else {
  return (

    <div>
      <NavBar/>
      <Container fixed>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          
        {rows.map((row: any) => (
          <Grid size={3}>
            <Paper elevation={3}>
              <Item>
                <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Title:     {row.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Author:    {row.author}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Price (€): {row.price}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions >
                    <Button variant="contained" onClick={() => addBook(row)} >Add to Cart</Button>
                  </CardActions>
                </Card>
              </Item>
            </Paper>
          </Grid>
         ))}

        </Grid>
      </Container>

    </div>
  );
  }
};