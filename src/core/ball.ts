import type { Coords } from "@/types/app";
import type { BallComponent as BallComponentT } from "@/types/components";

import BallComponent from "@/components/Ball/Ball";

export class Ball {
  constructor(
    public diameter: number,
    public position: Coords,
    public direction: Coords
  ) {}

  create(): BallComponentT {
    return BallComponent({ x: this.position.x, y: this.position.y });
  }

  move(): void {
    this.position.x += this.direction.x;
    this.position.y += this.direction.y;
  }

  invertX(): void {
    this.direction.x = -this.direction.x;
  }

  invertY(): void {
    this.direction.y = -this.direction.y;
  }
}
