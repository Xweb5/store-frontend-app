import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';

import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Sheet from '@mui/joy/Sheet';
import CssBaseline from '@mui/joy/CssBaseline';
import Swal from "sweetalert2";
import axios from "axios";
import { useAtom } from "jotai";
import { usersPassword } from "../context/manageContext";


export default function Login(){

  const [userPass, setUserPass] = useAtom(usersPassword);
  localStorage.removeItem("authenticated");
  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

      axios.get('http://localhost:8080/bookshop/v1/users/login' , 
        { 
          auth: {
            username: `${username}`,
            password: `${password}`
          }
        }).then((response) => {
          setUserPass({ username : username, password : password})
          localStorage.setItem("authenticated", "true");
          navigate("/dashboard");
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: err.message,
            showConfirmButton: true,
            timer: 1500
          });
        });

  };

  return (
    <main>
      <CssBaseline />
      <Sheet
        sx={{
          width: 400,
          mx: 'auto', // margin left & right
          my: 4, // margin top & bottom
          py: 3, // padding top & bottom
          px: 2, // padding left & right
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRadius: 'sm',
          boxShadow: 'md',
        }}
        variant="outlined"
      >
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input
            // html input attribute
            name="username"
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setusername(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            name="password"
            type="password"
            placeholder="password"
            onChange={(e) => setpassword(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <Button variant="contained" type="submit">Login</Button>  
        </FormControl>
      </form>
      
      </Sheet>
     
  </main>
  )
};