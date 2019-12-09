stop = false;                                                                                                          //L011


// MyGameArea OBJECT **********************************************************
let myGameArea  = {                                                                                                    //L001
  frames: 0,                                                                                                           //L010
  canvas: document.createElement("canvas"),                                                                            //L001
  start: function (){                                                                                                  //L001
    this.canvas.width = 480;                                                                                           //L001
    this.canvas.height = 270;                                                                                          //L001
    this.context = this.canvas.getContext('2d')                                                                        //L001
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);                                              //L001
    this.interval = setInterval(updateGameArea, 5);
  },

  clear: function (){                                                                                                  //L004
    this.context.clearRect( 0, 0, this.canvas.width, this.canvas.height);                                              //L004
  },

  stop: function(){
    clearInterval(this.interval); // calls function clearInterval() to stop canvas clear and update                   //L010

  },

};



// Component CLASS ************************************************************
class Component {                                                                                                      //L002
  constructor ( name, width, height, color,  x, y, xMin, yMin, xMax, yMax ) {                                          //L007 
    this.name = name;    // Object name                                                                                //L007
    this.width = width;                                                                                                //L002
    this.height = height;                                                                                              //L002
    this.color = color;                                                                                                //L002
    this.x = x;                                                                                                        //L002
    this.y = y;                                                                                                        //L002
    this.xMin = xMin;     //Minimun value for x                                                                        //L007
    this.yMin = yMin;     //Minimun value for y                                                                        //L007
    this.xMax = xMax;     //Maximum value for x                                                                        //L007
    this.yMax = yMax;     //Maximum value for y                                                                        //L007
    this.speedX = 0;                                                                                                   //L006
    this.speedY = 0;                                                                                                   //L006
    this.hMov = Math.random() > 0.5 ? true : false;                                                                    //L010
    this.vMov = Math.random() > 0.5 ? true : false;                                                                    //L010

  }

  update(){                                               // For the creation of player and the obstacles              //L002
      let ctx  = myGameArea.context;                                                                                   //L002
      ctx.fillStyle = this.color;                                                                                      //L002
      ctx.fillRect(this.x, this.y, this.width, this.height);                                                           //L002

    }

  newPos(){
    if ( this.x >= this.xMax ){                                                                                        //L009
      this.x = this.xMax -5;                                                                                           //L009
    } else if ( this.x >= this.xMin ) {                                                                                //L009
      this.x += this.speedX;                                                                                           //L006 | //L009
    } else {                                                                                                           //L009
      this.x = this.xMin + 5;                                                                                          //L009
    }                                                                                                                  //L009
    
    if ( this.y >= this.yMax ){                                                                                        //L009
      this.y = this.yMax - 5;                                                                                          //L009
    } else if (this.y >= this.yMin) {                                                                                  //L009
      this.y += this.speedY;                                                                                           //L006 | //L009
    } else {                                                                                                           //L009
      this.y = this.yMin + 5;                                                                                          //L009
    }                                                                                                                  //L009
  }

}



// Objects: Player A, Player B and Ball ***************************************
// (name, width, height, color, x, y, xMin, yMin, xMax, yMax )
const playerA = new Component ("Player A", 5, 40, "black",  5,115,    5,5,   100,230 )                                 //L007
const playerB = new Component ("Player B", 5, 40, "black",  470,115,  340,5, 475,230)                                  //L007
const ball = new Component ("Ball", 10, 10, "black", 235,130, -5,-5, 485, 375)                                         //L007
const sideUp = new Component ("SideUp", 480, 5, "black", 0,0, 0,0, 0,0)                                                //L008
const sideDown = new Component ("SideDown", 480, 5, "black", 0,265, 0,0, 0, 265)                                       //L008
console.log (playerA,playerB, ball, sideUp, sideDown);


// updateGame Area ************************************************************
function updateGameArea(){                                                                                             //L005                                    
  myGameArea.clear();                                                                                                  //L005
  playerA.newPos();         //Acquire new position before updating the object                                          //L009
  playerA.update();                                                                                                    //L005
  playerB.newPos();         //Acquire new position before updating the object                                          //L009
  playerB.update();                                                                                                    //L005
  sideUp.update();                                                                                                     //L008
  sideDown.update()                                                                                                    //L008
  updateBall();                                                                                                        //L010

}



// Player B Keyboard Down **************************************************************

document.onkeydown = function(e) {                                                                                     //L009
  // Arrow Keys >> Player A
  switch(e.keyCode) {
    case 38:
      playerA.speedY -= 1;           // TO UP MOVEMENT                                                                 //L009
      break;
    case 40:
      playerA.speedY += 1;           // TO DOWN MOVEMENT                                                               //L009
      break;
    case 37:
      playerA.speedX -= 1;           // TO LEFT MOVEMENT                                                               //L009
      break;
    case 39:
      playerA.speedX += 1;           // TO RIGHT MOVEMENT                                                              //L009
      break;
    // Numeric Keys >> Player B
    case 104:
      playerB.speedY -= 1;           // TO UP MOVEMENT                                                                 //L009
      break;
    case 98:
      playerB.speedY += 1;           // TO DOWN MOVEMENT                                                               //L009
      break;
    case 100:
      playerB.speedX -= 1;           // TO LEFT MOVEMENT                                                               //L009
      break;
    case 102:
      playerB.speedX += 1;           // TO RIGHT MOVEMENT                                                              //L009
      break;
    // "<"" and ">"" >> Test Ball's direction
    case 188:
      ball.hMov = false;           // TO LEFT MOVEMENT                                                                 //L010
      break;
    case 190:
      ball.vMov = true;           // TO RIGHT MOVEMENT                                                                 //L010
      break;
  }
}


// onkeyup() FUNCTION *********************************************************
document.onkeyup = function(e) {                                                                                       //L009
  playerA.speedX = 0;                                                                                                  //L009                                                                                                           //L009
  playerA.speedY = 0;                                                                                                  //L009
  playerB.speedX = 0;                                                                                                  //L009
  playerB.speedY = 0;                                                                                                  //L009
}



// Ball animation and phisics *************************************************

function updateBall (){                                                                                                //L010
  myGameArea.frames += 1;                                                                                              //L010
  if (myGameArea.frames % 2 === 0) {                                                                                  //L010
    do {                                                                                                               //L010
      ball.hMov ? ball.x += 1 : ball.x -= 1;                                                                           //L010
      ball.vMov ? ball.y += 1 : ball.y -= 1;                                                                           //L010
      console.log("(ball.hMov: ", ball.hMov, ", ball.vMov: ", ball.vMov, ") - (ball.x: ", ball.x, ", ball.y: ", ball.y, " )" );
      ball.update();                                                                                                   //L010
    } while (stop)                                                                                                     //L010 | //L011
  }                                                                                                                    //L010
}                                                                                                                      //L010





// START THE GAME HERE ********************************************************
myGameArea.start();                                                                                                    //L005




//LOG
/*
L001 to L006 - Copy Canvas Basic structures
L007. Implement name, xMin, YMin, xMax and yMax Component attributes to prevent canvas leaking
L008. Added sideUp and sideDown screen elements
L009. Added Keyboard Control for PlayerA and Player B
L010. Add ball movement AND  myGameArea.stop() method
L011. Ball hit detection implementation


*/