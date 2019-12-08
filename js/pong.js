let myObstacles = [];                            // Array to store obstacles objects                      // Log (014)


//  myGameArea OBJECT *********************************************************

const myGameArea = {                                                                                      // Log (001)
  canvas: document.createElement("canvas"),
  frames: 0, // Call updateGameArea() counter. We push new obstacles every n amount of updates.           // Log (015)
  start: function () {
    this.canvas.width = 480;
    this.canvas.height = 270;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = setInterval(updateGameArea, 20)     //call updateGameArea() every 20 miliseconds      // Log (004)
},


  clear: function (){       // Clear the canvas each time updateGameArea() is called                      // Log (005)
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    //console.log("this.canvas.width= ", this.canvas.width, " this.canvas.height:", this.canvas.height);

  },

  stop: function(){
    clearInterval(this.interval); // calls function clearInterval() to stop canvas clear and update       // Log (018)

  },

} //;



// Component ClASS ************************************************************

class Component{                                 // For the creation of player and the obstacles          // Log (002)
  constructor (width, height, color, x, y){
    this.width = width;
    this.height = height;
    this.color = color;
    this.x = x;
    this.y = y;
    this.speedX = 0;                                                                                      // Log (008)
    this.speedY = 0;                                                                                      // Log (008)
  }



  update(){                                                                                               // Log (002)
    let ctx = myGameArea.context;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
  
  

  newPos(){                                                                                               // Log (009)
    this.x += this.speedX;
    this.y += this.speedY;
    console.log ("this.X =", this.x, " this.Y =", this.y)
  }



  left(){                                                                                                 // Log (019)
    return this.x;    // Returns left perimenter 
  }

  right (){                                                                                               // Log (019)
    return this.x + this.width; // Returns right perimenter
  }

  top(){                                                                                                  // Log (019)
    return this.y;  // Returns top perimeter 
  }

  bottom(){
    return this.y + this.height; //returns bottom perimeter                                               // Log (019)
  }

  crashWith(obstacle){      //receives an obstacle object to compare with player's sides positions        // Log (020)
    return !(
      this.bottom() < obstacle.top()    || 
      this.top()    > obstacle.bottom() ||
      this.right()  < obstacle.left()   ||
      this.left()   > obstacle.right()  
    );
  }

}



// Player OBJECT ************************************************************** 

let player = new Component(30, 30, "red", 0, 110);                                                        // Log (003)
console.log(player);



// updateGameArea() function
function updateGameArea(){                                                                                // Log (006)
  myGameArea.clear();          // call to clear the canvas                                                // Log (006)
  player.newPos();             // call to update player's position                                        // Log (012)
  player.update();             // call to (re)draw player position                                        // Log (006)
  updateObstacles();           // call to update obstacles                                                // Log (013)
  checkGameOver();             // check if the game should stop due to a crash                            // Log (021)
  }


// myGameArea Start() function call *******************************************
myGameArea.start();                                                                                       // Log (007)                                                           



// onkeydown() FUNCTION *******************************************************

document.onkeydown = function(e) {                                                                        // Log (010)
  switch(e.keyCode) {
    case 38:
      player.speedY -= 1;           // TO UP MOVEMENT
      break;
    case 40:
      player.speedY += 1;           // TO DOWN MOVEMENT
      break;
    case 37:
      player.speedX -= 1;           // TO LEFT MOVEMENT
      break;
    case 39:
      player.speedX += 1;           // TO RIGHT MOVEMENT
      break;
  }
}



// onkeyup() FUNCTION *********************************************************

document.onkeyup = function(e) {                                                                          // Log (011)
  player.speedX = 0;
  player.speedY = 0;
}



// updateObstacles() FUNCTION *************************************************

function updateObstacles(){   //creates new obstacle object as Component class every 120 updates          // Log (016)

  
  for (i = 0 ; i < myObstacles.length ;  i += 1 ) {  // loop from 0 to myObstacle Array's lenght          // Log (017)
    myObstacles[i].x += -1; // moves obstacle[i]'s position 1 point to the left;
    myObstacles[i].update(); // re-draws canvas with obstacle[i] new position
  }


  myGameArea.frames += 1;
  if ( myGameArea.frames % 120 === 0 ){  //create new obstacles every 120 updates
    let x = myGameArea.canvas.width; // Obstacles height < Canvas width
    let minHeight =  20;
    let maxHeight = 200;
    let height = Math.floor ( Math.random() * ( maxHeight - minHeight +1 ) + minHeight ); // random 20 < height < 200
    let minGap =  50;
    let maxGap = 200;
    let gap    = Math.floor ( Math.random() * ( maxGap - minGap + 1 ) + minGap); // random 50 < gap < 200
    myObstacles.push(new Component ( 10, height, "green", x, 0));   // (width, height, color, x, y)
    myObstacles.push(new Component ( 10, x - height - gap, "green", x, height + gap));
  }
}



function checkGameOver(){ // check player crashing obstacle calls myGameArea method to myGameArea.stop()  // Log(021)
  let crashed = myObstacles.some(function(obstacle){
    return player.crashWith(obstacle);
  })

  if (crashed) {
    myGameArea.stop();
  }

}



// LOG
/*

Step 01 = To create a immoble red rectangle in a canvas

000. HTML and JS files created and linked
001. MyGameArea instantiated and created a canvas in 2d context
002. Component Class: Constructor() and update() methods created //blueprint for the creation of player and the obstacles objects
003. Player Object instance created as a Component Class
004. myGameArea >> SetInterval call to updateGameArea() created
005. myGameArea >> clear() canvas created
006. updateGameArea() function created
007. myGameArea.start() call created - program Startup



Step 02 = Add movement to the red rectangle

008. Component >> Added speedX and speedY attributes;
009. Component >> Added newPos() method to change this.X and this.Y based on speedX and speedY 
010. onkeydown() function created to capture keys so to increase or to decrease speedY and speedX values
011. onkeyup() function created to stop player's motion
012. myGameArea >> call to update player's position create before player re-draw



Step 03 = Adding obstacles

013. Call a new function named updateObstacles() from the updateGameArea function:
014. Array declaration for the array that will store obstacles objects
015. Creation of "frames" attribute to count calls to updateGameArea(). We push new obstacles every n amount of updates.
016. New function updateObstacles() - creates new obstacle object as Components class every 120 update calls.
017. updateObstacles() >> New loop for updateObstacles - Obstables motion



Step 04 = Crash check

018. myGameArea >> implements clearInterval() method to stop clearing canvas and stop updating objects positions
019. Component >> implements a left(), right(), top() and bottom() methods - returns objects perimeter positions   
020. Component >> implements a crashWith() method - receives an obstacle object to compare with players  
021. checkGameOver() funtion creation to check player crashing with obstacle; if crashed calls myGameArea method to stop clearing canvas and stop updating objects positions
022. updateGameArea() calls function checkGameOver() to see if game should stop;


Step 05 = Score



*/