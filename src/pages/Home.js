import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/apiConfig';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { AiFillHdd } from "react-icons/ai";

const Home = () => {
  let { token } = useParams();

  const [user, setUser] = useState(null);
  const [log, setLog] = useState(null);
  const [show, setShow] = useState(true);
  const navigate = useNavigate();



  useEffect(() => {
    if(user === null){
      const getUserData = async () => {
      try {
        const response = await api.get(`/api/v1/login/${token}`);
        console.log(response.data.appUser);
        setUser(response.data);
      } catch (error) {
        console.error("getUserData" + error);
      }
    };

    getUserData();
    }
    
  });

  const showLog = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/login/log/${token}`);
      if (response.status === 200) {
        setShow(!show)
        if (show === true) {
          setLog(response.data);
        } else {
          setLog(null)
        }

      } else {
        console.error("Can't fetch data");
      }
    } catch (error) {
      console.error('Failed: ', error);
    }
  };

  const handleLogout = async (username) => {
    try {
      const response = await axios.post('http://localhost:8080/api/v1/auth/logout', {
        username: username
      });
      console.log(response);
      if (response.status === 200) {
        localStorage.clear();
        console.log(response.data);
        navigate('/login')
      } else {
        console.error("Can't log out");
      }
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <div>
      {user && (
        <div className='HomeConfig'>
          <h1 align='center' style={{paddingTop:50,fontSize:50}}>Welcome to Website</h1>
          <p align='center'>Name : {user.appUser.firstName} {user.appUser.lastName}</p>
          <p align='center'>Email : {user.appUser.email}</p>
          <br/>
          <Box sx={{ '& button': { m: 1 } }}>
            <Button variant="outlined" size="medium" onClick={() => showLog()}><AiFillHdd/>{show === true ? 'Show Log' : 'Hide Log'}</Button>
            <Button variant="outlined" color="error" onClick={() => handleLogout(user.appUser.username)}>Logout</Button>
          </Box>
          
          {log &&
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Date</TableCell>
                  <TableCell align="center">Timestamp</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {log.slice().reverse().map((row) => (
                  <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row" align='center'>{user.appUser.firstName} {user.appUser.lastName}</TableCell>
                    <TableCell align="center">{new Date(row.dateTime).toLocaleDateString()}</TableCell>
                    <TableCell align="center">{new Date(row.dateTime).toLocaleTimeString()}</TableCell>
                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell align="center">{row.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>}
        </div>
      )}
    </div>

  );
};

export default Home;
