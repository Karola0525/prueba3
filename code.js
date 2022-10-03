var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["210a04b8-15a3-4a9f-8c82-eb7bee3a2fc0"],"propsByKey":{"210a04b8-15a3-4a9f-8c82-eb7bee3a2fc0":{"name":"volleyball2_1","sourceUrl":"assets/api/v1/animation-library/gamelab/5Yl0wzKk4SY_UGA_47svi8_VOnlYOp96/category_sports/miscball.png","frameSize":{"x":393,"y":394},"frameCount":1,"looping":true,"frameDelay":2,"version":"5Yl0wzKk4SY_UGA_47svi8_VOnlYOp96","categories":["sports"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":393,"y":394},"rootRelativePath":"assets/api/v1/animation-library/gamelab/5Yl0wzKk4SY_UGA_47svi8_VOnlYOp96/category_sports/miscball.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

var ball;

ball = createSprite(200,280,20,20);
ball.setAnimation("volleyball2_1");
ball.scale = 0.1;

var paleta=createSprite(50,350,75,10);
paleta.shapeColor="pink"
var bricks = createGroup()


createEdgeSprites();
var Score=0;

createBrickRow(65,"purple")
createBrickRow(65+29,"pink")
createBrickRow(65+29+29,"red")
createBrickRow(+65+29+29+29,"orange")
function createBrickRow(y,color){

  for (var c = 0; c<6; c++) {
 var brick=createSprite(65+54*c,y,50,25);
brick.shapeColor=color;
bricks.add(brick);

}
}

var estado="serve";
 var vidas = 5

function draw() {
  background("black");
  textSize (20);
  text("vidas" +vidas, 325, 30);
  text("Score:"+Score,4,25)
  
  if (estado=="serve") {
  textSize(20);
  text("click para comenzar",110,250);
   ball.velocityX=0;
     ball.velocityY=0;
     ball.x=200;
     ball.y=200;
  } else if (estado=="over") {
    fill("yellow");
    text("¡Fin del Juego!",150,250);
    ball.remove;
    
  }
  else{
    gameplay();
  }
  
  
//ball.bounceOff(bricks)
  drawSprites();
  

}

function mousePressed() 
{
  if(estado == "serve") {
    estado = "play";
       ball.velocityX =3;
       ball.velocityY =4;
    // ESTABLECER VELOCIDAD CADA 0.2
    bricks.setVelocityYEach(0.2);
    
 
  //ball.x=World.mouseX;
//ball.y=World.mouseY;
}

}
function brickHit(ball,brick)  {
  playSound( "assets/category_bell/vibrant_game_bell_twinkle_positive_touch_1.mp3")
  //console.log(Score);
brick.destroy();
  Score=Score+10;
  /*Primero hacemos que funcione las velocidades aumentando de 1.05
  ball.velocityX*=1.05;
    ball.velocityY*=1.05;*/
    /*luego solo usamos la condición ball.velocity menor que 12
    if (ball.velocityY<12) {
    ball.velocityX*=1.05;
    ball.velocityY*=1.05;
  }*/
  // instrucción para que la pelota varie su velocidad aumentando 1.05
  if (ball.velocityY>-12&& ball.velocityY<12) {
    ball.velocityX*=1.05;
    ball.velocityY*=1.05;
  }

}

function Gameover(){
  if(vidas!=0){
    vidas=vidas-1;
  }
  if (vidas>=1) {
   estado = "serve";
  } 
  else{
    estado="over";
  }
  
}
// aquí pasamos todas las funciones del juego y creamos una sola función 
function gameplay(){
  // COMENTAMOS PARA PODER AGREGAR IA
  //paleta.x=World.mouseX; 
  paleta.x=ball.x;
 if (paleta.x<60) {
 paleta.x=60;   
  }
  if (paleta.x>340) {
    paleta.x=340;
  }
   //ball.bounceOff(paleta);
  ball.bounceOff(topEdge);
  //ball.bounceOff(bottomEdge);
  ball.bounceOff(leftEdge);
  ball.bounceOff(rightEdge);
 // ball.bounceOff(bricks);
  ball.bounceOff(bricks, brickHit)
   
  if (ball.bounceOff(paleta)) {
  playSound("assets/category_bell/notification_4.mp3");
}
if (!bricks[0]) {
  ball.velocityX = 0;
  ball.velocityY = 0;
  text("Juego terminado", 120, 250);
  console.log(bricks[0])
}
if (ball.isTouching(bottomEdge)) {
  Gameover();
}
}
// cualquier duda que tengas me escribes, que te mejores :)










// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
