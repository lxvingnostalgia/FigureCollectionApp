const express = require("express");
const mysql = require('mysql');
const cors = require('cors');
const session = require('express-session');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Use express-session middleware
app.use(session({
  secret: 'NsgTyOKe3S', // Change this to a secure random key
  resave: false,
  saveUninitialized: true,
}));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "users"
});

// Endpoint for user registration
app.post('/register', (req, res) => {
    const sql = "INSERT INTO login (`username`, `email`, `password`) VALUES (?)";
    const values = [
        req.body.username,
        req.body.email,
        req.body.password
    ];
    db.query(sql, [values], (err, data) => {
        if (err) {
            return res.json("Error");
        }

        return res.json(data);
    });
});

// Endpoint for user login
app.post('/login', (req, res) => {
    const sql = "SELECT * FROM login WHERE `username` = ? AND `password` = ?";
    db.query(sql, [req.body.username, req.body.password], (err, data) => {
        if (err) {
            return res.json("Error");
        }

        if (data.length > 0) {
            // Store user information in session
            req.session.user = data[0];
            return res.json("Success");
        } else {
            return res.json("Failed");
        }
    });
});

// Endpoint to check if the user is logged in
app.get('/check-login', (req, res) => {
    if (req.session.user) {
        return res.json({ loggedIn: true, user: req.session.user });
    } else {
        return res.json({ loggedIn: false });
    }
});

// Endpoint to add figure to user's collection
/* app.post('/add-figure', (req, res) => {
    const figure = req.body;
    const userId = req.session.user ? req.session.user.ID : null;

    // Insert the figure into the "figure" table
    const figureSql = "INSERT INTO figure (`name`, `brand`, `series`) VALUES (?, ?, ?)";
    const figureValues = [figure.name, figure.brand, figure.series];

    db.query(figureSql, figureValues, (err, figureResult) => {
        if (err) {
            return res.json("Error adding figure");
        }

        const figureId = figureResult.insertId;

        if (userId) {
            // If a user is logged in, insert the relationship into the "user_figure" table
            const userFigureSql = "INSERT INTO user_figure (`user_id`, `figure_id`) VALUES (?, ?)";
            const userFigureValues = [userId, figureId];

            db.query(userFigureSql, userFigureValues, (err) => {
                if (err) {
                    return res.json("Error adding figure to user's collection");
                }

                return res.json({ ...figure, figure_id: figureId });
            });
        } else {
            // If no user is logged in, just return the figure information
            return res.json({ ...figure, figure_id: figureId, user_id: null });
        }
    });
}); */


app.listen(8081, () => {
    console.log("Listening");
});
