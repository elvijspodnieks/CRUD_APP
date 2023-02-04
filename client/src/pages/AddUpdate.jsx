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
    name: "",
    email: "",
    password: "",
    age: ""
}

export default function AddUpdate() {

    const [state, setState] = useState(initialState);

    const { name, email, password, age } = state;

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
        if (!name || !email || !password || !age) {
            toast.error("Please provide value into each input field")
        } else {
            if (!id) {
                const hashedPassword = bcrypt.hashSync(password, 10);

                axios.post("http://localhost:8800/add", {
                    name,
                    email,
                    hashedPassword,
                    age
                }).then(() => {
                    setState({ name: "", email: "", password: "", age: "" })
                }).catch((err) => toast.error(err.response.data));
                toast.success("Contact Added Successfully")
                setTimeout(() => navigate(`/`), 500)
            } else {
                const hashedPassword = bcrypt.hashSync(password, 10);

                var result = true;
                persons.map((item, index) => (
                    bcrypt
                        .compare(password, item.password)
                        .then(res => {
                            result = res;
                        })
                        .catch(err => console.error(err.message))
                        .then(() => {
                            if (result === true) {
                                axios.put(`http://localhost:8800/persons/${id}/update-person`, {
                                    name,
                                    email,
                                    hashedPassword,
                                    age
                                }).then(() => {
                                    setState({ name: "", email: "", password: "", age: "" })
                                }).catch((err) => toast.error(err.response.data));
                                toast.success("Contact updated successfully")
                                setTimeout(() => navigate(`/`), 500)
                            } else {
                                toast.error("Wrong password")
                            }
                        })
                ))
            }
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
                        {id ? "Update person" : "Add new person"}
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin="normal"
                            type="text"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            value={name || ""}
                            onChange={handleInputChange}
                        />

                        <TextField
                            margin="normal"
                            type="text"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            value={email || ""}
                            onChange={handleInputChange}
                        />

                        <TextField
                            margin="normal"
                            type="password"
                            required
                            fullWidth
                            id="password"
                            label="Password"
                            name="password"
                            autoComplete="password"
                            onChange={handleInputChange}
                        />

                        <TextField
                            margin="normal"
                            type="number"
                            required
                            fullWidth
                            id="age"
                            label="Age"
                            name="age"
                            autoComplete="age"
                            value={age || ""}
                            onChange={handleInputChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, }}
                        >
                            {id ? "Update" : "Save"}
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


