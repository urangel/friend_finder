const express = require('express');
const router = express.Router();
const friends = require("../data/friends");

router.use(function timeLog (req, res, next){
    console.log("Time :" + Date.now());
    next();
})


router.get("/api/friends", function(req, res){
    res.json(friends);
});

router.post("/api/friends", function(req, res){
    let newFriend = req.body;

    newFriend.routename = newFriend.name.replace(/\s+/g, "").toLowerCase();
    let match = matchValue(newFriend);
    friends.push(newFriend);
    res.json(match);
    console.log(friends);

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

module.exports = router;