const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json);
app.use(bodyParser.urlencoded({ extended : false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type , Accept, Authorization");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS");
  next()
});

app.post("/api/posts",(res,req,next) => {

  const  post =req.body;
  console.log(post);
  res.status(201).json({
    message: "Posts Fetched Succsessfully",
  })
});

app.use("/api/posts", (req,res, next) => {

  const posts =[

    {
      id:"vhhehvvvvvvev",
      name: "Bheem",
      content: "Hi there",
      number:" 6879809089",
      address: "chbibwbvhi"

     },
     {
      id:"wfrgwf",
      name: "Arjun",
      content: "Hi there",
      number:" 6879809089",
      address: "chbibwbvhi"

     },
  ];

  res.status(200).json({
    message: "Posts Fetched Succsessfully",
    posts: posts
  });
});

;

module.exports = app;
