const canvasEl = document.querySelector("canvas"),
  canvasCtx = canvasEl.getContext("2d"),
  gapX = 10;

const mouse = { x: 0, y: 0 };

const field = {
  w: window.innerWidth,
  h: window.innerHeight,
  draw: function () {
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
  y: 0,
  w: line.w,
  h: 200,
  speed: 5,
  _move: function () {
    if (this.y + this.h / 2 < ball.y + ball.r) {
      this.y += this.speed;
    } else {
      this.y -= this.speed;
    }
  },
  speedUp: function () {
    this.speed += 2;
  },
  draw: function () {
    //desenho da raquete direito
    canvasCtx.fillStyle = "#ffffff";
    canvasCtx.fillRect(this.x, this.y, this.w, this.h);
    this._move();
  },
};

const score = {
  human: 0,
  computer: 0,
  increaseHuman: function () {
    this.human++;
  },
  increaseComputer: function () {
    this.computer++;
  },
  draw: function () {
    //Desenho do placar
    canvasCtx.font = "bold 72px Arial";
    canvasCtx.textAlign = "center";
    canvasCtx.textBaseline = "top";
    canvasCtx.fillStyle = "#01341D";
    canvasCtx.fillText(this.human, field.w / 4, 50);
    canvasCtx.fillText(this.computer, field.w / 4 + field.w / 2, 50);
  },
};

const ball = {
  x: field.w / 2,
  y: field.h / 2,
  r: 20,
  speed: 5,
  directionX: 1,
  directionY: 1,
  _calcPosition: function () {
    // verifica se o jogador 1 fez um ponto (x > largura do campo)
    if (this.x > field.w - this.r - rightPaddle.w - gapX) {
      // verifica se a raquete direita está na posição y da bola
      if (
        this.y + this.r > rightPaddle.y &&
        this.y - this.r < rightPaddle.y + rightPaddle.h
      ) {
        // rebate a bola intervertendo o sinal de X
        this._reverseX();
      } else {
        // pontuar o jogador 1
        score.increaseHuman();
        this._pointUp();
      }
    }

    // verifica se o jogador 2 fez um ponto (x < 0)
    if (this.x < this.r + leftPaddle.w + gapX) {
      // verifica se a raquete esquerda está na posição y da bola
      if (
        this.y + this.r > leftPaddle.y &&
        this.y - this.r < leftPaddle.y + leftPaddle.h
      ) {
        // rebate a bola intervertendo o sinal de X
        this._reverseX();
      } else {
        // pontuar o jogador 2
        score.increaseComputer();
        this._pointUp();
      }
    }

    // verifica as laterais superior e inferior do campo
    if (
      (this.y - this.r < 0 && this.directionY < 0) ||
      (this.y > field.h - this.r && this.directionY > 0)
    ) {
      // rebate a bola invertendo o sinal do eixo Y
      this._reverseY();
    }
  },
  _reverseX: function () {
    // 1 * -1 = -1
    // -1 * -1 = 1
    this.directionX *= -1;
  },
  _reverseY: function () {
    // 1 * -1 = -1
    // -1 * -1 = 1
    this.directionY *= -1;
  },
  _speedUp: function () {
    this.speed += 2;
  },
  _pointUp: function () {
    this._speedUp();
    rightPaddle.speedUp();

    this.x = field.w / 2;
    this.y = field.h / 2;
  },
  _move: function () {
    this.x += this.directionX * this.speed;
    this.y += this.directionY * this.speed;
  },
  draw: function () {
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
      return window.setTimeout(callback, 1000 / 60);
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
