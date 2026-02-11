const express = require('express');
const app = express();
const port = 8080;
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

const { v4: uuidv4 } = require('uuid');

const path = require('path');

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id: uuidv4(),
        username: "Khushi",
        content: "Success is not final, failure is not fatal"
    },

    {
        id: uuidv4(),
        username: "pathlylabs",
        content: "Tech is the future, embrace it!"
    },

    {
        id: uuidv4(),
        username: "Siddhi",
        content: "Believe you can and you're halfway there."
    },
];

app.get("/posts",(req, res) =>{ //index route
    res.render("index.ejs", {posts});
});

app.get("/posts/new", (req, res) =>{ //new route
    res.render("new.ejs");
});

app.post("/posts", (req, res) =>{ //create route
    let {username, content} = req.body;
    let id = uuidv4();
    posts.push({id, username, content});
    
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
    let {id} = req.params;
    console.log(id);
    let post = posts.find(p => p.id === id);
    res.render("show.ejs", {post});
});

app.patch("/posts/:id", (req, res) => {
    let {id} = req.params;
    let newcontent = req.body.content;
    let post = posts.find(p => p.id === id);
    post.content = newcontent;
    console.log(post);
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
    let {id} = req.params;
    let post = posts.find(p => p.id === id);
    res.render("edit.ejs", {post});
});

app.delete("/posts/:id", (req, res) => {
    let {id} = req.params;
    posts = posts.filter(p => p.id !== id);
    res.redirect("/posts");
});

app.listen(port, () => {
    console.log("listening on port 8080");
});