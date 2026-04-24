import type { Coords } from "@/types/app";

import { Ball } from "@/core/ball";

const createBall = (
  diameter = 20,
  position: Coords = { x: 0, y: 0 },
  direction: Coords = { x: 2, y: 1 }
): Ball => new Ball(diameter, { ...position }, { ...direction });

describe("Ball", () => {
  afterEach(() => {
    document.body.innerHTML = "";
    jest.clearAllMocks();
  });

  describe("constructor", () => {
    it("should initialize with given diameter, position and direction", () => {
      const ball = createBall(20, { x: 10, y: 20 }, { x: 2, y: 1 });

      expect(ball.diameter).toBe(20);
      expect(ball.position).toEqual({ x: 10, y: 20 });
      expect(ball.direction).toEqual({ x: 2, y: 1 });
    });
  });

  describe("move", () => {
    it("should update position by adding direction values", () => {
      const ball = createBall(20, { x: 10, y: 20 }, { x: 2, y: 1 });

      ball.move();

      expect(ball.position).toEqual({ x: 12, y: 21 });
    });

    it("should accumulate position over multiple calls", () => {
      const ball = createBall(20, { x: 0, y: 0 }, { x: 3, y: 2 });

      ball.move();
      ball.move();

      expect(ball.position).toEqual({ x: 6, y: 4 });
    });

    it("should move correctly with negative direction", () => {
      const ball = createBall(20, { x: 10, y: 10 }, { x: -2, y: -1 });

      ball.move();

      expect(ball.position).toEqual({ x: 8, y: 9 });
    });
  });

  describe("invertX", () => {
    it("should negate a positive direction.x", () => {
      const ball = createBall();

      ball.invertX();

      expect(ball.direction.x).toBe(-2);
    });

    it("should negate a negative direction.x back to positive", () => {
      const ball = createBall(20, { x: 0, y: 0 }, { x: -2, y: 1 });

      ball.invertX();

      expect(ball.direction.x).toBe(2);
    });

    it("should not affect direction.y", () => {
      const ball = createBall(20, { x: 0, y: 0 }, { x: 2, y: 5 });

      ball.invertX();

      expect(ball.direction.y).toBe(5);
    });
  });

  describe("invertY", () => {
    it("should negate a positive direction.y", () => {
      const ball = createBall();

      ball.invertY();

      expect(ball.direction.y).toBe(-1);
    });

    it("should negate a negative direction.y back to positive", () => {
      const ball = createBall(20, { x: 0, y: 0 }, { x: 2, y: -1 });

      ball.invertY();

      expect(ball.direction.y).toBe(1);
    });

    it("should not affect direction.x", () => {
      const ball = createBall(20, { x: 0, y: 0 }, { x: 3, y: 1 });

      ball.invertY();

      expect(ball.direction.x).toBe(3);
    });
  });

  describe("create", () => {
    it("should return a div element with class ball", () => {
      const ball = createBall(20, { x: 50, y: 30 }, { x: 2, y: 1 });
      const element = ball.create();
      document.body.appendChild(element);

      expect(element).toHaveClass("ball");
    });

    it("should set left style from position.x", () => {
      const ball = createBall(20, { x: 50, y: 30 }, { x: 2, y: 1 });
      const element = ball.create();

      expect(element.style.left).toBe("50px");
    });

    it("should set bottom style from position.y", () => {
      const ball = createBall(20, { x: 50, y: 30 }, { x: 2, y: 1 });
      const element = ball.create();

      expect(element.style.bottom).toBe("30px");
    });
  });
});
