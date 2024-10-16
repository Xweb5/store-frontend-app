import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';

import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Sheet from '@mui/joy/Sheet';
import CssBaseline from '@mui/joy/CssBaseline';
import { Alert } from "@mui/material";
import Swal from "sweetalert2";


export default function Login(){

  
  localStorage.removeItem("authenticated");
  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const users = { username: "Jane", password: "testpassword" };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (users.username === username && users.password === password) {
      localStorage.setItem("authenticated", "true");
      navigate("/dashboard");
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Wrong username or password',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    }
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