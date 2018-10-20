const mongoose = require("mongoose");
const express = require("express");

let app = express();
app.use(express.json());
app.use(express.urlencoded({ extend: false }));

mongoose.connect(
  "mongodb://dlxh:1988grz@ds159631.mlab.com:59631/dlxh",
  { useNewUrlParser: true }
);

const User = require("./UserInfo");

app.get("/api/users", function(req, res) {
  User.find(function(err, Users) {
    if (err) {
      console.log(err);
    } else {
      res.json(Users);
      console.log("success");
    }
  });
});

app.put("/api/users/:id", function(req, res) {
  let id = req.params.id;
  User.findByIdAndUpdate({ _id: id }, req.body, function(err, post) {
    if (err) {
      console.log(err);
    } else {
      res.json(post);
    }
  });
});

app.post("/api/users", function(req, res) {
  console.log(res, req);
  User.create({ ...req.body })
    .then(user => res.json(user))
    .catch(err => console.log(err));
});

app.delete("/api/users/:id", function(req, res) {
  let id = req.params.id;
  User.remove({ _id: id }, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("User deleted");
    }
  });
});

const port = 4000;
app.listen(port, () => {
  console.log(`Express Server is running on port ${port}`);
});
