import kaboom from "kaboom";

const k = kaboom();

k.loadSprite("jojo", "sprites/Luffy.png");

k.loadSpriteAtlas("sprites/Luffy_idle.png", {
  Luffy_idle: {
    x: 0,
    y: 0,
    width: 127,
    height: 69,
    sliceX: 3,
    anims: {
      idle: { from: 0, to: 2, loop: true, speed: 10 },
    },
  },
});
k.loadSpriteAtlas("sprites/walk.png", {
  Luffy_walk: {
    x: 0,
    y: 0,
    width: 410,
    height: 57,
    sliceX: 8,
    anims: {
      walk: { from: 0, to: 7, loop: true, speed: 10 },
    },
  },
});

let doubleJump = 1;

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
  // const bean = add([sprite("jojo"), pos(80, 40), area(), body()]);
  const Luffy = add([sprite("Luffy_idle"), pos(80, 40), area(), body()]);
  Luffy.play("idle");
  // Luffy.play("run");

  // .jump() when "space" key is pressed
  onKeyPress("space", () => {
    if (Luffy.isGrounded()) {
      Luffy.jump(650);
    } else if (!Luffy.isGrounded() && doubleJump > 0) {
      Luffy.jump(650);
      doubleJump--;
    }
  });
  //Movement
  k.onKeyDown("left", () => {
    Luffy.move(-160, 0);
    Luffy.use(sprite("Luffy_walk", { flipX: true }));
    Luffy.play("walk");
  });

  k.onKeyDown("right", () => {
    Luffy.move(160, 0);
    if (Luffy.sprite != "Luffy_walk") {
      Luffy.use(sprite("Luffy_walk"));
      Luffy.play("walk");
    }
  });

  setGravity(1200);
  console.log(Luffy);

  let score = 0;
  const scoreLabel = add([text(score), pos(24, 24)]);

  onUpdate(() => {
    score++;
    scoreLabel.text = score;
    if (Luffy.isGrounded()) {
      doubleJump = 1;
    }
  });

  scene("lose", () => {
    add([text("Game Over"), pos(center()), anchor("center")]);
  });

  Luffy.onCollide("tree", () => {
    addKaboom(Luffy.pos);
    shake();
    go("lose");
  });
});

go("game");
