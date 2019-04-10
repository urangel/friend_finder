const express = require("express");
const path = require("path");

const app = express();
let PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("app/public"));


let friends = [
    {
        name: "Betty",
        photo: "https://s.newsweek.com/sites/www.newsweek.com/files/styles/embed_tablet/public/2019/01/16/betty-white-birthday-cover-photo.jpg",
        scores: ["1","1","1","1","1","1","1","1","1","1"]
    },
    {
        name: "Greg",
        photo: "https://images.pexels.com/photos/1680317/pexels-photo-1680317.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=250&w=1260",
        scores: ["2","2","2","2","2","2","2","2","2","2"]
    },
    {
        name: "Jeremy",
        photo: "https://images.pexels.com/photos/936119/pexels-photo-936119.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=250&w=1260",
        scores: ["3","3","3","3","3","3","3","3","3","3"]
    },
    {
        name: "Andie",
        photo: "https://images.pexels.com/photos/1886694/pexels-photo-1886694.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=250&w=1260",
        scores: ["4","4","4","4","4","4","4","4","4","4"]
    },
    {
        name: "Lou",
        photo: "https://images.pexels.com/photos/1755385/pexels-photo-1755385.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=250&w=1260",
        scores: ["5","5","5","5","5","5","5","5","5","5"]
    },
    {
        name: "James",
        photo: "https://images.pexels.com/photos/925263/pexels-photo-925263.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=250&w=1260",
        scores: ["1","2","3","1","2","3","1","2","3","1"]
    },
    {
        name: "Ebony",
        photo: "https://www.graphic.com.gh/images/2017/august/07/ebony.png",
        scores: ["5","4","3","2","1",'5','4',"3","2","1"]
    }
];

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "app/public/home.html"));
});

app.get("/api/friends", function(req, res){
    res.json(friends);
});

app.get("/survey", function(req, res){
    res.sendFile(path.join(__dirname, "app/public/survey.html"));
});

app.post("/api/friends", function(req, res){
    let newFriend = req.body;

    newFriend.routename = newFriend.name.replace(/\s+/g, "").toLowerCase();
    let match = matchValue(newFriend);
    friends.push(newFriend);
    res.json(match);
    console.log(friends);

});


app.listen(PORT, function(){
    console.log("Listening on port: " + PORT);
});


function matchValue(newFriend){
    let match = [];
    let minDifference = 0;
    let currentDifference = 0;

    for (let i = 0; i<friends.length; i++){
        currentDifference = 0;
        for(let j=0; j<friends[i].scores.length; j++){
            let difference = Math.abs(parseInt(newFriend.scores[j])-parseInt(friends[i].scores[j]));
            currentDifference  += difference; 
        }
        if(i === 0){
            minDifference = currentDifference.toString();
            match.push(friends[i]);
        }
        else if(i > 0){
            if(currentDifference < parseInt(minDifference)){
                minDifference = currentDifference;
                match.shift();
                match.push(friends[i]);
            }
        }
    }
    console.log(match);
    return match[0];
}