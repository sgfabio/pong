

// MyGameArea OBJECT **********************************************************
let myGameArea  = {
  canvas: document.createElement("canvas"),                                                                           //L001
  start: function (){                                                                                                 //L001
    this.canvas.width = 480;                                                                                           //L001
    this.canvas.heigth = 270;                                                                                          //L001
    this.context = this.canvas.getContext('2d')                                                                        //L001
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);                                              //L001
    this.interval = setInterval(updateGameArea, 20);
  },

  clear: function (){                                                                                                 //L004
    this.context.clearRect( 0, 0, this.canvas.width, this.canvas.heigth);                                             //L004
  },

};



// Component CLASS ************************************************************
class Component {                                                                                                      //L002
  constructor ( width, heigth, color,  x, y ) {                                                                        //L002
    this.width = width;                                                                                                //L002
    this.heigth = heigth;                                                                                              //L002
    this.color = color;                                                                                                //L002
    this.x = x;                                                                                                        //L002
    this.y = y;                                                                                                        //L002

  }

  update(){                                               // For the creation of player and the obstacles              //L002
      let ctx  = myGameArea.context;                                                                                   //L002
      ctx.fillStyle = this.color;                                                                                      //L002
      ctx.fillRect(this.x, this.y, this.width, this.heigth);                                                           //L002

    }

}



// Objects: Player A, Player B and Ball ***************************************
const playerA = new Component (5, 40, "black",5 ,115)   // (width, height, color, x, y)                               //L003
const playerB = new Component (5, 40, "black", 465, 115)  // (width, height, color, x, y)                               //L003
const ball = new Component (10, 10, "black", 235, 130)   // (width, height, color, x, y)                               //L003
console.log (playerA,playerB, ball);


// updateGame Area ************************************************************
function updateGameArea(){                                                                                             //L005                                    
  myGameArea.clear();                                                                                                  //L005
  playerA.update();                                                                                                    //L005
  playerB.update();                                                                                                    //L005
  ball.update();                                                                                                       //L005

}

// START THE GAME HERE ********************************************************
myGameArea.start();                                                                                                    //L005