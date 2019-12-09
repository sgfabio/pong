

// MyGameArea OBJECT **********************************************************
let myGameArea  = {
  canvas: document.createElement("canvas"),                                                                           //L001
  start: function (){                                                                                                 //L001
    this.canvas.width = 480;                                                                                           //L001
    this.canvas.height = 270;                                                                                          //L001
    this.context = this.canvas.getContext('2d')                                                                        //L001
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);                                              //L001
    this.interval = setInterval(updateGameArea, 20);
  },

  clear: function (){                                                                                                 //L004
    this.context.clearRect( 0, 0, this.canvas.width, this.canvas.height);                                             //L004
  },

};



// Component CLASS ************************************************************
class Component {                                                                                                      //L002
  constructor ( width, height, color,  x, y, xMax, yMax ) {                                                            //L007
    this.width = width;                                                                                                //L002
    this.height = height;                                                                                              //L002
    this.color = color;                                                                                                //L002
    this.x = x;                                                                                                        //L002
    this.y = y;                                                                                                        //L002
    this.xMax = xMax;     //Maximum value for x                                                                        //L007
    this.yMax = yMax;     //Maximum value for y                                                                        //L007
    this.speedX = 0;                                                                                                   //L006
    this.speedY = 0;                                                                                                   //L006

  }

  update(){                                               // For the creation of player and the obstacles              //L002
      let ctx  = myGameArea.context;                                                                                   //L002
      ctx.fillStyle = this.color;                                                                                      //L002
      ctx.fillRect(this.x, this.y, this.width, this.height);                                                           //L002

    }

  newPos(){
    this.x += this.speedX;                                                                                             //L006
    this.y += this.speedY;                                                                                             //L006

  }


}



// Objects: Player A, Player B and Ball ***************************************
const playerA = new Component (5, 40, "black",5 ,115, 100, 230)   // (width, height, color, x, y, xMax, yMax )         //L007
const playerB = new Component (5, 40, "black", 465, 220, 100, 230)  // (width, height, color, x, y, xMax, yMax )       //L007
const ball = new Component (10, 10, "black", 235, 130, 470, 260)   // (width, height, color, x, y, xMax, yMax )        //L007
console.log (playerA,playerB, ball);
const ball = new Component (0, 0, "black", 480, 2, 480, 2)   // (width, height, color, x, y, xMax, yMax )              //L007


// updateGame Area ************************************************************
function updateGameArea(){                                                                                             //L005                                    
  myGameArea.clear();                                                                                                  //L005
  playerA.update();                                                                                                    //L005
  playerB.update();                                                                                                    //L005
  ball.update();                                                                                                       //L005

}

// START THE GAME HERE ********************************************************
myGameArea.start();                                                                                                    //L005




//LOG
/*
L001 to L006 - Copy Canvas Basic structures
L007 Implement xMax and yMax Component attributes to prevent canvas leaking




*/