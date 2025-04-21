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
    pos(50, 250),
    area(),
    body({ isStatic: true }),
    color(800, 200, 255),
  ]);

  add([
    rect(300, 35),
    pos(900, 250),
    area(),
    body({ isStatic: true }),
    color(800, 200, 255),
  ]);

  // putting together our player character
  const bean = add([sprite("jojo"), pos(80, 40), area(), body()]);

  // .jump() when "space" key is pressed
  onKeyPress("space", () => {
    if (bean.isGrounded()) {
      bean.jump();
    }
  });
  setGravity(1600);
  console.log(bean);

  loop(1, () => {});

  function spawnTree() {
    // add tree
    add([
      rect(48, rand(24, 64)),
      area(),
      outline(4),
      pos(width(), height() - 48),
      anchor("botleft"),
      color(255, 180, 255),
      move(LEFT, 240),
      "tree", // add a tag here
    ]);

    wait(rand(0.5, 1.5), () => {
      spawnTree();
    });
  }

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

  spawnTree();
});

go("game");
