const express = require("express");
const apiRoutes = require("./app/routing/apiRoutes");
const htmlRoutes = require("./app/routing/htmlRoutes");

const app = express();
let PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("app/public"));

app.use("/", apiRoutes);
app.use("/", htmlRoutes);

app.listen(PORT, function(){
    console.log("Listening on port: " + PORT);
});