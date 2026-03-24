import { Ball } from "@/core/ball";

describe("Ball Class", () => {
  it("should initialize with correct properties", () => {
    const ball = new Ball(20, { x: 100, y: 50 }, { x: 2, y: 1 });

    expect(ball.diameter).toBe(20);
    expect(ball.position).toEqual({ x: 100, y: 50 });
    expect(ball.direction).toEqual({ x: 2, y: 1 });
  });

  it("should create ball component", () => {
    const ball = new Ball(20, { x: 100, y: 50 }, { x: 2, y: 1 });

    const component = ball.create();
    document.body.appendChild(component);

    expect(component).toHaveClass("ball");
    expect(component.style.left).toBe("100px");
    expect(component.style.bottom).toBe("50px");

    document.body.innerHTML = "";
  });

  it("should move ball by direction", () => {
    const ball = new Ball(20, { x: 100, y: 50 }, { x: 2, y: 1 });

    ball.move();

    expect(ball.position).toEqual({ x: 102, y: 51 });
  });

  it("should invert X direction", () => {
    const ball = new Ball(20, { x: 100, y: 50 }, { x: 2, y: 1 });

    ball.invertX();

    expect(ball.direction).toEqual({ x: -2, y: 1 });
  });

  it("should invert X direction when negative", () => {
    const ball = new Ball(20, { x: 100, y: 50 }, { x: -2, y: -1 });

    ball.invertX();

    expect(ball.direction).toEqual({ x: 2, y: -1 });
  });

  it("should invert Y direction", () => {
    const ball = new Ball(20, { x: 100, y: 50 }, { x: 2, y: 1 });

    ball.invertY();

    expect(ball.direction).toEqual({ x: 2, y: -1 });
  });

  it("should invert Y direction when negative", () => {
    const ball = new Ball(20, { x: 100, y: 50 }, { x: -2, y: -1 });

    ball.invertY();

    expect(ball.direction).toEqual({ x: -2, y: 1 });
  });
});
