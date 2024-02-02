const canvasEl = document.querySelector("canvas"),
  canvasCtx = canvasEl.getContext("2d");
gapX = 10;

const mouse = { x: 0, y: 0 };

const field = {
  w: innerWidth,
  h: innerHeight,
  draw: function () {
    //desenho da grama
    canvasCtx.fillStyle = "#286047";
    canvasCtx.fillRect(0, 0, this.w, this.h);
  },
};

const line = {
  w: 15,
  h: field.h,
  draw: function () {
    //desenho da linha central
    canvasCtx.fillStyle = "#ffffff"; //cor da linha
    canvasCtx.fillRect(
      field.w / 2 - this.w / 2, //posicionar a linha no centro, é largura do campo / 2 menos a largura da linha
      0,
      this.w,
      this.h
    );
  },
};

const leftPaddle = {
  x: gapX,
  y: 0,
  w: line.w,
  h: 200,
  _move: function () {
    this.y = mouse.y - this.h / 2;
  },
  draw: function () {
    //desenho da raquete esquerda
    canvasCtx.fillStyle = "#ffffff";
    canvasCtx.fillRect(this.x, this.y, this.w, this.h);

    this._move();
  },
};

const rightPaddle = {
  x: field.w - line.w - gapX,
  y: 100,
  w: line.w,
  h: 200,
  _move: function () {
    this.y = ball.y;
  },
  draw: function () {
    //desenho da raquete direito
    canvasCtx.fillStyle = "#ffffff";
    canvasCtx.fillRect(this.x, this.y, this.w, this.h);

    this._move();
  },
};

const score = {
  human: 1,
  computer: 2,
  draw: function () {
    //Desenho do placar
    canvasCtx.font = "bold 72px Arial";
    canvasCtx.textAlign = "center";
    canvasCtx.textBaseline = "top";
    canvasCtx.fillStyle = "#01341d";
    canvasCtx.fillText(this.human, field.w / 4, 50);
    canvasCtx.fillText(this.computer, field.w / 4 + field.w / 2, 50);
  },
};

const ball = {
  x: 0,
  y: 0,
  r: 20,
  speed: 5,
  directionX: 1,
  directionY: 1,
  _calcPosition: function () {
    //Verifica as laterais suparior e inferior do campo
    if (
      (this.y - this.r < 0 && this.directionY < 0) ||
      (this.y > field.h - this.r && this.directionY > 0)
    ) {
      this._reverseY();
    }
  },
  _reverseX: function () {
    //1 * -1 = -1
    //-1 * -1 = 1
    this.directionX *= -1;
  },
  _reverseY: function () {
    //1 * -1 = -1
    //-1 * -1 = 1
    this.directionY *= -1;
  },
  _move: function () {
    this.x += this.directionX * this.speed;
    this.y += this.directionY * this.speed;
  },
  draw: function () {
    //desenho da bolinha
    canvasCtx.fillStyle = "#ffffff";
    canvasCtx.beginPath();
    canvasCtx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
    canvasCtx.fill();

    this._calcPosition();
    this._move();
  },
};

function setup() {
  canvasEl.width = canvasCtx.width = field.w;
  canvasEl.height = canvasCtx.height = field.h;
}

function draw() {
  field.draw();
  line.draw();
  leftPaddle.draw();
  rightPaddle.draw();
  score.draw(); //o placar está antes da bola p ficar por baixo
  ball.draw();
}

window.animateFrame = (function () {
  //requestAnimationFrame é uma api nativa do navegador chamada várias vezes pq pode ser rodada em outro navegadores
  return (
    requestAnimationFrame ||
    webkitRequestAnimationFrame ||
    mozRequestAnimationFrame ||
    oRequestAnimationFrame ||
    msRequestAnimationFrame ||
    function (callback) {
      return setTimeout(callback, 1000 / 60);
    }
  );
})();

function main() {
  animateFrame(main);
  draw();
}

setup();
main();

canvasEl.addEventListener("mousemove", function (e) {
  mouse.x = e.pageX;
  mouse.y = e.pageY;
});

//Regra de ponto do jogador 1
