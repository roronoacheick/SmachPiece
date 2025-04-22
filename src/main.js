import kaboom from "kaboom";

const k = kaboom();

k.loadSprite("jojo", "sprites/bean.png");

scene("game", () => {
  k.onClick(() => k.addKaboom(k.mousePos()));

  // add platform
  add([
    rect(width(), 48),
    pos(0, height() - 48),
    outline(4),
    area(),
    outline(4),
    area(),
    body({ isStatic: true }),
    color(127, 200, 255),
  ]); 

  add([
    rect(300, 35),
    pos(50, 300), 
    area(),
    body({ isStatic: true }),
    color(255, 105, 180), 
  ]);

  add([
    rect(300, 35),
    pos(900, 300), 
    area(),
    body({ isStatic: true }),
    color(255, 105, 180), 
  ]);

  // putting together our player character
  const bean = add([sprite("jojo"), pos(80, 40), area(), body()]);

  // .jump() when "space" key is pressed
  onKeyPress("space", () => {
    if (bean.isGrounded()) {
      bean.jump();
    }
  });
  //Movement 
  k.onKeyDown("left", () => {
  bean.move(-160, 0);
 });


 k.onKeyDown("right",() => {
  bean.move(160,0);
 });

  setGravity(900);
  console.log(bean);

  
  let score = 0;
  const scoreLabel = add([text(score), pos(24, 24)]);

  onUpdate(() => {
    score++;
    scoreLabel.text = score;
  });

  scene("lose", () => {
    add([text("Game Over"), pos(center()), anchor("center")]);
  });

  bean.onCollide("tree", () => {
    addKaboom(bean.pos);
    shake();
    go("lose");
  });

  
 });

go("game");
