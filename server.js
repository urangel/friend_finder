let arr1 = [1,2,3,4,5,6,7,8,9,10];
let arr2 = [10,9,8,7,6,5,4,3,2,1];
let totalDifference = 0;

function matchValue(){
    for (let i = 0; i<arr1.length; i++){
            let difference = Math.abs(friends[0].scores[i]-friends[1].scores[i]);
            if(difference != 0){
                totalDifference  += difference; 
            }
    }
    console.log(totalDifference);
}

let friends = [
    {
        "name": "Betty",
        "photo": "someurl.org/filepath.jpg",
        "scores": [1,2,3,4,5,6,7,8,9,10]
    },
    {
        "name": "Ebony",
        "photo": "someurl.org/mypic.jpg",
        "scores": [10,9,8,7,6,5,4,3,2,1]
    }
]

matchValue();