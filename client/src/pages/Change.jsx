import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import bcrypt from 'bcryptjs'

const theme = createTheme();
const initialState = {
    password: "",
    newPassword: "",
}

export default function AddUpdate() {

    const [state, setState] = useState(initialState);

    const { password, newPassword } = state;

    const navigate = useNavigate();

    const { id, } = useParams();

    const [persons, setData] = useState([])

    const loadData = async () => {
        const response = await axios.get(`http://localhost:8800/persons/${id}`);
        setData(response.data);
    }
    useEffect(() => {
        loadData();
    }, [])


    useEffect(() => {
        axios.get(`http://localhost:8800/persons/${id}`).then((resp) => setState({ ...resp.data[0] }));
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!password || !newPassword) {
            toast.error("Please provide value into each input field")
        } else {

            const hashedPassword = bcrypt.hashSync(newPassword, 10);

            var result = true;
            persons.map((item) => (

                bcrypt
                    .compare(password, item.password)
                    .then(res => {
                        result = res;
                    })
                    .catch(err => console.error(err.message))
                    .then(() => {
                        if (result == true) {
                            axios.put(`http://localhost:8800/persons/${id}/update-password`, {
                                hashedPassword
                            }).then(() => {
                                setState({ password: "", newPassword: "" })
                            }).catch((err) => toast.error(err.response.data));
                            toast.success("Password changed successfully")
                            setTimeout(() => navigate(`/`), 500)
                        } else {
                            toast.error("Please provide value into each input field")
                        }
                    })
            ))
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Change Password
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin="normal"
                            type="password"
                            required
                            fullWidth
                            id="password"
                            label="Password"
                            name="password"
                            autoFocus
                            autoComplete="password"
                            onChange={handleInputChange}
                        />

                        <TextField
                            margin="normal"
                            type="password"
                            required
                            fullWidth
                            id="newPassword"
                            label="New password"
                            name="newPassword"

                            onChange={handleInputChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, }}
                        >
                            Change
                        </Button>
                        <Link to="/">
                            <Button
                                type="submit"
                                fullWidth
                                variant="outlined"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Go back
                            </Button>
                        </Link>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}


