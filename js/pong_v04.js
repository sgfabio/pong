stop = false;                                                                                                          //L011
bgColor = "black" ;                                                                                                    //L016
fgColor = "white";                                                                                                     //L016
document.body.style.backgroundColor = bgColor;                                                                         //L016

// MyGameArea OBJECT **********************************************************
let myGameArea  = {                                                                                                    //L001
  frames: 0,                                                                                                           //L010
  canvas: document.createElement("canvas"),                                                                            //L001
  start: function (){                                                                                                  //L001
    this.canvas.width = 480;                                                                                           //L001
    this.canvas.height = 270;                                                                                          //L001
    this.context = this.canvas.getContext('2d')                                                                        //L001
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);                                              //L001
    this.interval = setInterval(updateGameArea, 0.5);
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
    this.score = 0;                                                                                                    //L013

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


  left(){                                                                                                              //L011                                                                                   
    return this.x;    // Returns left perimenter                                                                       //L011 
  }

  right (){                                                                                                            //L011
    return this.x + this.width; // Returns right perimenter                                                            //L011
  }

  top(){                                                                                                               //L011
    return this.y;  // Returns top perimeter                                                                           //L011
  }

  bottom(){                                                                                                            //L011
    return this.y + this.height; //returns bottom perimeter                                                            //L011
  }

  crashWith(Obj){      //receives an obstacle object to compare with player's sides positions                          //L011
    return !(                                                                                                          //L011
      this.bottom() < Obj.top()    ||                                                                                  //L011
      this.top()    > Obj.bottom() ||                                                                                  //L011
      this.right()  < Obj.left()   ||                                                                                  //L011
      this.left()   > Obj.right()                                                                                      //L011
    );                                                                                                                 //L011
  }                                                                                                                    //L011   

}                                                                                                                      //L011



// Objects: Player A, Player B and Ball ***************************************
// (name, width, height, color, x, y, xMin, yMin, xMax, yMax )
const playerA = new Component ("Player A", 5, 40, fgColor,  5,115,    5,5,   100,230 )                                 //L007
const playerB = new Component ("Player B", 5, 40, fgColor,  470,115,  340,5, 475,230)                                  //L007
const ball = new Component ("Ball", 10, 10, fgColor, 235,130, -5,-5, 485, 375)                                         //L007
const sideUp = new Component ("SideUp", 480, 5, fgColor, 0,0, 0,0, 0,0)                                                //L008
const sideDown = new Component ("SideDown", 480, 5, fgColor, 0,265, 0,0, 0, 265)                                       //L008
console.log (playerA,playerB, ball, sideUp, sideDown);





// Player A and B Keyboard  ***************************************************

// Arrow Keys >> Player A
const playerAHandle = (keysA) => {                                                                                     //L009 | //L012
  switch(keysA.keyCode) {                                                                                              //L009 | //L012
    case 38:                                                                                                           //L009 | //L012
    playerA.speedY -= 1;           // TO UP MOVEMENT                                                                   //L009 | //L012
    break;                                                                                                             //L009 | //L012
    case 40:                                                                                                           //L009 | //L012
    playerA.speedY += 1;           // TO DOWN MOVEMENT                                                                 //L009 | //L012
    break;                                                                                                             //L009 | //L012
    case 37:                                                                                                           //L009 | //L012
    playerA.speedX -= 1;           // TO LEFT MOVEMENT                                                                 //L009 | //L012
    break;                                                                                                             //L009 | //L012
    case 39:                                                                                                           //L009 | //L012
    playerA.speedX += 1;           // TO RIGHT MOVEMENT                                                                //L009 | //L012
    break;                                                                                                             //L009 | //L012
  }                                                                                                                    //L009 | //L012
}                                                                                                                      //L009 | //L012

// Numeric Keys >> Player B
const playerBHandle = (keysB) =>{                                                                                      //L009 | //L012
  switch(keysB.keyCode) {                                                                                              //L009 | //L012
    case 104:                                                                                                          //L009 | //L012
    playerB.speedY -= 1;           // TO UP MOVEMENT                                                                   //L009 | //L012
    break;                                                                                                             //L009 | //L012
    case 98:                                                                                                           //L009 | //L012
    playerB.speedY += 1;           // TO DOWN MOVEMENT                                                                 //L009 | //L012
    break;                                                                                                             //L009 | //L012
    case 100:                                                                                                          //L009 | //L012
    playerB.speedX -= 1;           // TO LEFT MOVEMENT                                                                 //L009 | //L012
    break;                                                                                                             //L009 | //L012
    case 102:                                                                                                          //L009 | //L012
    playerB.speedX += 1;           // TO RIGHT MOVEMENT                                                                //L009 | //L012
    break;                                                                                                             //L009 | //L012
    // Manual override: Ball motion reversal
    case 188:
      ball.hMov = false;             // TO LEFT MOVEMENT                                                               //L010 | //L012            
      ball.vMov = true;              // TO RIGHT MOVEMENT                                                              //L010 | //L012
      break;                                                                                                           //L010 | //L012
      case 190:                                                                                                        //L010 | //L012
      ball.hMov = true;              // TO LEFT MOVEMENT                                                               //L010 | //L012
      ball.vMov = false;             // TO RIGHT MOVEMENT                                                              //L010 | //L012
      break;                                                                                                           //L010 | //L012
    }
  }
  
  
  
  // onkeyup() FUNCTION *********************************************************
  
  const onKeyUp = (keysAB) =>{                                                                                           //L009 | //L012
    playerA.speedX = 0;                                                                                                  //L009 | //L012                                                                                                           //L009
    playerA.speedY = 0;                                                                                                  //L009 | //L012
    playerB.speedX = 0;                                                                                                  //L009 | //L012
    playerB.speedY = 0;                                                                                                  //L009 | //L012
  }
  
  
  // Passes keydown events to respective handles
  document.addEventListener('keydown', playerAHandle);                                                                  //L012
  document.addEventListener('keydown', playerBHandle);                                                                  //L012
  document.addEventListener('keyup', onKeyUp);                                                                          //L012
  
  
  
  
  // Ball animation and phisics *************************************************
  
  function updateBall (){                                                                                              //L010
    myGameArea.frames += 1;                                                                                            //L010
    if (myGameArea.frames % 1 === 0) {                                                                                 //L010
      do {                                                                                                             //L010
        ball.hMov ? ball.x += 1 : ball.x -= 1;                                                                         //L010
        ball.vMov ? ball.y += 0.5 : ball.y -= 0.5;                                                                     //L010
        console.log("(ball.hMov: ", ball.hMov, ", ball.vMov: ", ball.vMov, ") - (ball.x: ", ball.x, ", ball.y: ", ball.y, " )" );
        ball.update();                                                                                                 //L010
      } while (stop)                                                                                                   //L010 | L011
    }                                                                                                                  //L010
  }                                                                                                                    //L010
  
  
  // Check if Ball hits something  *************************************************
  
  function checkBallHits () {                                                                                          //L011
    if (ball.crashWith(playerA)){                                                                                      //L011
      ball.hMov = !(ball.hMov);                                                                                        //L011
      ball.vMov = Math.random() > 0.5 ? true : false;                                                                  //L011
    }                                                                                                                  //L011
    if (ball.crashWith(playerB)){                                                                                      //L011
      ball.hMov = !(ball.hMov);                                                                                        //L011
      ball.vMov = Math.random() > 0.5 ? true : false;                                                                  //L011
    }                                                                                                                  //L011
    if (ball.crashWith(sideUp)){                                                                                       //L011
      ball.vMov = !(ball.vMov);                                                                                        //L011
    }                                                                                                                  //L011
    if (ball.crashWith(sideDown)){                                                                                     //L011
      ball.vMov = !(ball.vMov);                                                                                        //L011
    }                                                                                                                  //L011
  }                     
  
  
  // SCORE **********************************************n

  function updateScore (){                                                                                             //L013
    if (ball.x === 480){                                                                                               //L013
      playerA.score += 1;                                                                                              //L013
      ball.x = 240                                                                                                     //L013
      ball.hMov = !(ball.hMov);                                                                                        //L013
      ball.vMov = Math.random() > 0.5 ? true : false;                                                                  //L013 
    }                                                                                                                  //L013

    if (ball.x === 0){                                                                                                 //L013                                
      playerB.score += 1;                                                                                              //L013
      ball.x = 240                                                                                                     //L013
      ball.hMov = !(ball.hMov);                                                                                        //L013
      ball.vMov = Math.random() > 0.5 ? true : false;                                                                  //L013
    } 
    
    //Title, Court, Score...
    //Center field line - dashed
    myGameArea.context.beginPath();                                                                                   //L015
    myGameArea.context.setLineDash([5, 15]);                                                                          //L015
    myGameArea.context.moveTo(240, 30);                                                                               //L015
    myGameArea.context.lineTo(240, 270);                                                                              //L015
    // myGameArea.context.fillStyle = "black";                                                                        //L015
    myGameArea.context.strokeStyle = fgColor;                                                                         //L015 | L016
    myGameArea.context.stroke();                                                                                      //L015

    myGameArea.context.font = "20px 'Press Start 2P'";   //Google Font selected                                        //L013 | L014  
    myGameArea.context.fillStyle = fgColor;                                                                            //L013 | L016 
    myGameArea.context.fillText("A: " + playerA.score , 100, 60);                                                      //L013
    myGameArea.context.fillText("B: " + playerB.score , 340, 60);                                                      //L013
    myGameArea.context.fillText("Pong Forever", 130, 30);   //Game Title                                               //L013 | L014

    if (playerA.score === 10 || playerB.score === 10){                                                                 //L013 
      myGameArea.stop();                                                                                               //L013 
    }                                                                                                                  //L013
  }                                                                                                                    //L013
  



  // updateGame Area ************************************************************
  function updateGameArea(){                                                                                           //L005                                    
    myGameArea.clear();                                                                                                //L005
    playerA.newPos();         //Acquire new position before updating the object                                        //L009
    playerA.update();                                                                                                  //L005
    playerB.newPos();         //Acquire new position before updating the object                                        //L009
    playerB.update();                                                                                                  //L005
    sideUp.update();                                                                                                   //L008
    sideDown.update()                                                                                                  //L008
    updateBall();                                                                                                      //L010
    checkBallHits();                                                                                                   //L011
    updateScore();                                                                                                     //L013
  }
  
  // START THE GAME HERE ********************************************************
  myGameArea.start();                                                                                                  //L005
  
  
  
  
  //LOG
  /*
  L001 to L006 - Copy Canvas Basic structures
  L007. Implement name, xMin, YMin, xMax and yMax Component attributes to prevent canvas leaking
  L008. Added sideUp and sideDown screen elements
  L009. Added Keyboard Control for PlayerA and Player B
  L010. Add ball movement AND  myGameArea.stop() method
  L011. Ball hit detection implementation
  L012. Player A and PlayerB handling re-factoring to avoid conflict on keydowns simultaneusly
  L013. Score creation
  L014. Font selection for HTML link <link href="https://fonts.googleapis.com/css?family=Press+Start+2P&display=swap" rel="stylesheet">
  L015. Dashed Line draw in the field center
  L016. Background and Foreground colors implementation
*/