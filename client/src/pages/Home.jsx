import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Container from '@mui/material/Container';
import axios from "axios"
import { Button } from '@mui/material';
import { toast } from 'react-toastify';

export default function Home() {
    const [persons, setData] = useState([])

    const loadData = async () => {
        const response = await axios.get("http://localhost:8800/persons");
        setData(response.data);
    }

    useEffect(() => {
        loadData();
    }, [])

    const deleteContact = (id) => {
        if (window.confirm("are you sure?")) {
            axios.delete(`http://localhost:8800/delete/${id}`)
            toast.success("Contact deleted successfully")
            setTimeout(() => loadData(), 500);
        }
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 5 }}>
            <Link to="/addnew" style={{ textDecoration: 'none' }}>
                <Button sx={{ mb: 5 }} variant="contained">Add new</Button>
            </Link>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>No.</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">E-mail</TableCell>
                            <TableCell align="right">Password</TableCell>
                            <TableCell align="right">Age</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {persons.map((item, index) => (
                            <TableRow
                                key={index.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell align="right">{item.name}</TableCell>
                                <TableCell align="right">{item.email}</TableCell>
                                <TableCell align="right">
                                    <Link to={`/change/${item.id}`} style={{ textDecoration: 'none' }}>
                                        Change
                                    </Link>
                                </TableCell>
                                <TableCell align="right">{item.age}</TableCell>
                                <TableCell align="right" justifyContent="center">
                                    <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
                                        <Link to={`/update/${item.id}`} style={{ textDecoration: 'none' }}>
                                            <Button variant="contained" >Edit</Button>
                                        </Link>
                                        <IconButton aria-label="delete" size="large" onClick={() => deleteContact(item.id)} style={{ color: 'red' }}>
                                            <DeleteOutlineOutlinedIcon />
                                        </IconButton>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}