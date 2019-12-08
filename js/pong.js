


//  myGameArea OBJECT *********************************************************

  const myGameArea = {                                                                                     // Log (001)
  canvas: document.createElement("canvas"),
  start: function () {
    this.canvas.width = 480;
    this.canvas.height = 270;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = setInterval(updateGameArea, 20)     //call updateGameArea() every 20 miliseconds      // Log (004)
  },


  clear: function (){       // Clear the canvas each time updateGameArea() is called                      // Log (005)
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.length);

  }


} //;



// Component ClASS ************************************************************

class Component{                                                                                          // Log (002)
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

}



// Player OBJECT ************************************************************** 

let player = new Component(30, 30, "red", 0, 110);                                                        // Log (003)
console.log(player);



// updateGameArea() function
function updateGameArea(){                                                                                // Log (006)
  myGameArea.clear();          // call to clear the canvas                                                // Log (006)
  player.newPos();             // call to update player's position                                        // Log (012)
  player.update();             // call to (re)draw player position                                        // Log (006)
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

document.onkeyup = function(e) {                                                                        // Log (011)
  player.speedX = 0;
  player.speedY = 0;
}






// LOG
/*

Step 01 = To create a immoble red rectangle in a canvas

000. HTML and JS files created and linked
001. MyGameArea instantiated and created a canvas in 2d context
002. Component Class: Constructor() and update() methods created
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
012. myGameArea >> call to update player's position create before player redraw




*/