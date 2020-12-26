var sball;
var database,position,sballPosition;

function setup(){
    database = firebase.database();
    console.log(database);
    createCanvas(500,500);
    sball = createSprite(250,250,10,10);
    sball.shapeColor = "red";
    var sballPosition=database.ref('ball'/'position');
    sballPosition.on("value",readPosition,showError);

}


function draw(){
    background("white");
   // if (position!==undefined)
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);

    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function writePosition(x,y){
    database.ref('ball/position').set({
        'x':position.x+x,
        'y':position.y+y
    })
}

function readPosition(data){
position=data.val();
console.log(position.x);
sball.x=position.x;
sball.y=position.y;
}


function showError(){
console.log("error in writing to the database")
}