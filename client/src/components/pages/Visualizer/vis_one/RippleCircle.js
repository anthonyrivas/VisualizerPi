import Circle from './Circle';

export default class RippleCircle extends Circle {
  constructor(
    ctx,
    x,
    y,
    rad,
    dRad,
    color,
    isFill,
    opacity,
    confidence,
    dOpacity
  ) {
    super(ctx, x, y, rad, color, isFill);
    this._ctx = ctx;
    this._opacity = opacity;
    this._confidence = confidence;
    this._isFill = isFill;
    this._dRad = dRad;
    this._dOpacity = dOpacity;
  }

  colorOpacity = opacity => [
    `rgba(250,250,250, ${opacity})`, // Grey
    `rgba(0,212,103, ${opacity})`, // Green
    `rgba(234,92,144, ${opacity})`, // Pinkish Red
    `rgba(25,176,221,${opacity})`, // Light Blue
    `rgba(131,0,173,${opacity}`, // Purple
    `rgba(251,133,95,${opacity})`, // Coral
  ];

  draw() {
    this._ctx.beginPath();
    let color;
    if (this._confidence > 0.9) {
      color = this.colorOpacity(this._opacity)[4];
    } else if (this._confidence > 0.8) {
      color = this.colorOpacity(this._opacity)[1];
    } else if (this._confidence > 0.7) {
      color = this.colorOpacity(this._opacity)[5];
    } else if (this._confidence > 0.5) {
      color = this.colorOpacity(this._opacity)[2];
    } else if (this._confidence > 0.4) {
      color = this.colorOpacity(this._opacity)[3];
    } else {
      color = this.colorOpacity(this._opacity)[0];
    }

    this._ctx.strokeStyle = color;

    if (this._isFill) {
      this._ctx.fillStyle = color;
    }
    this._ctx.lineWidth = 5;
    this._ctx.arc(this._x, this._y, this._rad, 0, Math.PI * 2, false);
    this._ctx.stroke();
    if (this._isFill) {
      this._ctx.fill();
    }
  }

  update() {
    this._rad += this._drad;
    this._opacity -= this._dOpacity;
    if (this._opacity <= 0) {
      this._opacity = 0;
    }

    this.draw();

    // this._rad += 4
    // this._opacity -= .02
    // if(this._opacity <= 0) {
    //   this._opacity = 0
    // }

    // this._rad += this.dRad
    // this._opactiy -= this.dOpacity
  }
}
