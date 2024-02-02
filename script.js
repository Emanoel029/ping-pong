const canvasEl = document.querySelector("canvas"),
  canvasCtx = canvasEl.getContext("2d");
gapX = 10;

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
  y: 100,
  w: line.w,
  h: 200,
  draw: function () {
    //desenho da raquete esquerda
    canvasCtx.fillStyle = "#ffffff";
    canvasCtx.fillRect(this.x, this.y, this.w, this.h);
  },
};

const rightPaddle = {
  x: field.w - line.w - gapX,
  y: 100,
  w: line.w,
  h: 200,
  draw: function () {
    //desenho da raquete direito
    canvasCtx.fillStyle = "#ffffff";
    canvasCtx.fillRect(this.x, this.y, this.w, this.h);
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
  x: 300,
  y: 200,
  r: 20,
  _move: function () {
    this.x += 1;
    this.y += 1;
  },
  draw: function () {
    //desenho da bolinha
    canvasCtx.fillStyle = "#ffffff";
    canvasCtx.beginPath();
    canvasCtx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
    canvasCtx.fill();

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

setup();
draw();

//Animação
window.setInterval(draw, 1000 / 60);
