

//  MyGAME OBJECT *********************************************************

  const myGameArea = {
  canvas: document.createElement("canvas"),
  start: function () {
    this.canvas.width = 480;
    this.canvas.height = 270;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
  },
} //;

  // PLAYER ClASS ********************************************************

class Component{
  constructor (width, height, color, x, y){
    this.width = width;
    this.height = height;
    this.color = color;
    this.x = x;
    this.y = y;
    
  }

  update(){
    let ctx = myGameArea.context;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}

  // PLAYER OBJECT ********************************************************

  let player = new Component(30, 30, "red", 0, 110);
  console.log(player);







