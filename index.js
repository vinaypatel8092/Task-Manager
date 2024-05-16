const express = require("express");
const app = express();
const fs = require("fs");

app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.set("view engine", "ejs");

// Home Page
app.get("/", (req, res) => {
    fs.readdir(`./files`, (err, files) => {
        res.render("index", {files: files});
    })
});

// Create new Task
app.post("/create", (req, res) => {
    fs.writeFile(`./files/${req.body.title.split(" ").join("")}.txt`, req.body.details, (err) => {
        if (err) console.log(err);
        res.redirect("/");
    })
});

// Read a Task
app.get("/file/:filename", (req, res) => {
    fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, filedata) => {
        res.render("show", {filename: req.params.filename, filedata: filedata});
    })
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});