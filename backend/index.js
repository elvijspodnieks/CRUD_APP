import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express()

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "personsdb"
})


app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
    res.json("This is the backend")
})

app.get("/persons", (req, res) => {
    const q = "SELECT * FROM persons"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})


app.post("/add", (req, res) => {

    const q = "INSERT INTO persons (`name`, `email`, `password`, `age` ) VALUES (?)";

    const values = [
        req.body.name,
        req.body.email,
        req.body.hashedPassword,
        req.body.age
    ];

    db.query(q, [values], (error, data) => {
        if (error) return res.json(error);
    });
});


app.delete("/delete/:id", (req, res) => {

    const { id } = req.params;

    const qRemove = "DELETE FROM persons WHERE id = ?";
    db.query(qRemove, id, (error, data) => {
        if (error) return res.json(error);
    });
});


app.get("/persons/:id", (req, res) => {
    const { id } = req.params;
    const q = "SELECT * FROM persons where id = ?"
    db.query(q, id, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})


app.put("/persons/:id/update-person", (req, res) => {
    const { id } = req.params;
    const { name, email, hashedPassword, age } = req.body;
    const q = "UPDATE persons SET name = ?, email = ?, password = ?, age = ? where id = ?"
    db.query(q, [name, email, hashedPassword, age, id], (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})


app.put("/persons/:id/update-password", (req, res) => {
    const { id } = req.params;
    const { hashedPassword } = req.body;
    const q = "UPDATE persons SET password = ? where id = ?"
    db.query(q, [hashedPassword, id], (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})


app.listen(8800, () => {
    console.log("Connected to backend")
})