let move_speed = 3.5;
let gravity = 0.6;
let bird = document.querySelector(".bird");
let img = document.getElementById("bird-1");

let bird_props = bird.getBoundingClientRect();

let background = document.querySelector(".background").getBoundingClientRect();
let score_val = document.querySelector(".score_val");
let message = document.querySelector(".message");
let score_title = document.querySelector(".score_title");

let game_state = "start";
img.style.display = "none";
message.classList.add("messageStyle");

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && game_state !== "Play") {
    resetGame();
    game_state = "Play";
    message.innerHTML = "";
    score_title.innerHTML = "Score:";
    score_val.innerHTML = "0";
    message.classList.remove("messageStyle");
    startGame();
  }
});

function resetGame() {
  document.querySelectorAll(".pipe_sprite").forEach((e) => {
    e.remove();
  });
  img.style.display = "block";
  bird.style.top = "40vh";
}

function startGame() {
  requestAnimationFrame(movePipes);
  requestAnimationFrame(applyGravity);
  requestAnimationFrame(createPipe);
}

function movePipes() {
  if (game_state !== "Play") return;

  let pipe_sprites = document.querySelectorAll(".pipe_sprite");
  pipe_sprites.forEach((element) => {
    let pipe_sprite_props = element.getBoundingClientRect();
    bird_props = bird.getBoundingClientRect();

    if (pipe_sprite_props.right <= 0) {
      element.remove();
    } else { 
      if (
        bird_props.left < pipe_sprite_props.left + pipe_sprite_props.width &&
        bird_props.left + bird_props.width > pipe_sprite_props.left &&
        bird_props.top < pipe_sprite_props.top + pipe_sprite_props.height &&
        bird_props.top + bird_props.height > pipe_sprite_props.top
      ) {
        game_state = "End";
        message.innerHTML =
          "Game Over".fontcolor("red") + "<br>Press Enter To Restart";
        message.classList.add("messageStyle");
        img.style.display = "none";
        return;
      } else {
        if (
          pipe_sprite_props.right < bird_props.left &&
          pipe_sprite_props.right + move_speed >= bird_props.left &&
          element.increase_score === "1"
        ) {
          score_val.innerHTML = parseInt(score_val.innerHTML) + 1;
          element.increase_score = "0";
        }
        element.style.left = pipe_sprite_props.left - move_speed + "px";
      }
    }
  });

  requestAnimationFrame(movePipes);
}

let bird_dy = 0;
function applyGravity() {
  if (game_state !== "Play") return;

  bird_dy += gravity;
  bird_props = bird.getBoundingClientRect();

  if (bird_props.top <= 0 || bird_props.bottom >= background.bottom) {
    game_state = "End";
    message.style.left = "28vw";
    message.innerHTML =
      "Game Over".fontcolor("red") + "<br>Press Enter To Restart";
    message.classList.add("messageStyle");
    img.style.display = "none";
    return;
  }

  bird.style.top = bird_props.top + bird_dy + "px";
  requestAnimationFrame(applyGravity);
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" || e.key === " ") {
    img.src = "images/Bird1.png";
    bird_dy = -7.6;
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowUp" || e.key === " ") {
    img.src = "images/Bird1.png";
  }
});

let pipe_separation = 0;
let pipe_gap = 35;

function createPipe() {
  if (game_state !== "Play") return;

  if (pipe_separation > 115) {
    pipe_separation = 0;
    let pipe_position = Math.floor(Math.random() * 43) + 8;
    let top_pipe = document.createElement("div");
    top_pipe.className = "pipe_sprite";
    top_pipe.style.top = pipe_position - 70 + "vh";
    top_pipe.style.left = "100vw";
    document.body.appendChild(top_pipe);

    let bottom_pipe = document.createElement("div");
    bottom_pipe.className = "pipe_sprite";
    bottom_pipe.style.top = pipe_position + pipe_gap + "vh";
    bottom_pipe.style.left = "100vw";
    bottom_pipe.increase_score = "1";
    document.body.appendChild(bottom_pipe);
  }

  pipe_separation++;
  requestAnimationFrame(createPipe);
}
