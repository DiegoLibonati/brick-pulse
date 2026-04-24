import { screen } from "@testing-library/dom";

import type { Page } from "@/types/pages";

import BrickPulsePage from "@/pages/BrickPulsePage/BrickPulsePage";

import { widthBlock, widthBoard } from "@/constants/vars";

let page: Page;

const renderPage = (): Page => {
  page = BrickPulsePage();
  document.body.appendChild(page);
  return page;
};

describe("BrickPulsePage", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    page.cleanup?.();
    document.body.innerHTML = "";
    jest.useRealTimers();
  });

  describe("rendering", () => {
    it("should render a main element with class brick-pulse-page", () => {
      renderPage();

      expect(screen.getByRole("main", { name: "Brick Pulse" })).toHaveClass(
        "brick-pulse-page"
      );
    });

    it("should render the game area region", () => {
      renderPage();

      expect(
        screen.getByRole("region", { name: "Game area" })
      ).toBeInTheDocument();
    });

    it("should render the score display with initial value of 0", () => {
      renderPage();

      const counter = document.querySelector<HTMLSpanElement>("#counter")!;

      expect(counter).toHaveTextContent("0");
    });

    it("should render 18 blocks", () => {
      renderPage();

      const blocks = document.querySelectorAll<HTMLDivElement>(".block");

      expect(blocks).toHaveLength(18);
    });

    it("should render the ball", () => {
      renderPage();

      expect(screen.getByRole("img", { name: "Ball" })).toBeInTheDocument();
    });

    it("should render the player paddle", () => {
      renderPage();

      expect(
        screen.getByRole("img", { name: "Player paddle" })
      ).toBeInTheDocument();
    });

    it("should render the ball at its initial position", () => {
      renderPage();

      const ball = document.querySelector<HTMLDivElement>(".ball")!;

      expect(ball.style.left).toBe("270px");
      expect(ball.style.bottom).toBe("40px");
    });

    it("should render the player paddle at its initial position", () => {
      renderPage();

      const paddle = screen.getByRole("img", { name: "Player paddle" });

      expect(paddle.style.left).toBe("250px");
      expect(paddle.style.bottom).toBe("0px");
    });
  });

  describe("game loop", () => {
    it("should move the ball after one tick", () => {
      renderPage();

      const ball = document.querySelector<HTMLDivElement>(".ball")!;
      const initialLeft = ball.style.left;
      const initialBottom = ball.style.bottom;

      jest.advanceTimersByTime(10);

      expect(ball.style.left).not.toBe(initialLeft);
      expect(ball.style.bottom).not.toBe(initialBottom);
    });

    it("should move the ball further after multiple ticks", () => {
      renderPage();

      const ball = document.querySelector<HTMLDivElement>(".ball")!;
      const initialLeft = ball.style.left;

      jest.advanceTimersByTime(30);

      expect(ball.style.left).not.toBe(initialLeft);
    });
  });

  describe("user movement", () => {
    it("should move player paddle left on ArrowLeft", () => {
      renderPage();

      const paddle = screen.getByRole("img", { name: "Player paddle" });
      const initialLeft = paddle.style.left;

      document.dispatchEvent(
        new KeyboardEvent("keydown", { key: "ArrowLeft" })
      );

      expect(paddle.style.left).not.toBe(initialLeft);
    });

    it("should move player paddle right on ArrowRight", () => {
      renderPage();

      const paddle = screen.getByRole("img", { name: "Player paddle" });
      const initialLeft = paddle.style.left;

      document.dispatchEvent(
        new KeyboardEvent("keydown", { key: "ArrowRight" })
      );

      expect(paddle.style.left).not.toBe(initialLeft);
    });

    it("should decrease left position by 10px on ArrowLeft", () => {
      renderPage();

      const paddle = screen.getByRole("img", { name: "Player paddle" });

      document.dispatchEvent(
        new KeyboardEvent("keydown", { key: "ArrowLeft" })
      );

      expect(paddle.style.left).toBe("240px");
    });

    it("should increase left position by 10px on ArrowRight", () => {
      renderPage();

      const paddle = screen.getByRole("img", { name: "Player paddle" });

      document.dispatchEvent(
        new KeyboardEvent("keydown", { key: "ArrowRight" })
      );

      expect(paddle.style.left).toBe("260px");
    });

    it("should not move paddle left past the left boundary", () => {
      renderPage();

      const movesToBoundary = 25;

      for (let i = 0; i < movesToBoundary; i++) {
        document.dispatchEvent(
          new KeyboardEvent("keydown", { key: "ArrowLeft" })
        );
      }

      const paddle = screen.getByRole("img", { name: "Player paddle" });
      expect(paddle.style.left).toBe("0px");

      document.dispatchEvent(
        new KeyboardEvent("keydown", { key: "ArrowLeft" })
      );

      expect(paddle.style.left).toBe("0px");
    });

    it("should not move paddle right past the right boundary", () => {
      renderPage();

      const maxX = widthBoard - widthBlock;
      const movesToBoundary = 25;

      for (let i = 0; i < movesToBoundary; i++) {
        document.dispatchEvent(
          new KeyboardEvent("keydown", { key: "ArrowRight" })
        );
      }

      const paddle = screen.getByRole("img", { name: "Player paddle" });
      expect(paddle.style.left).toBe(`${maxX}px`);

      document.dispatchEvent(
        new KeyboardEvent("keydown", { key: "ArrowRight" })
      );

      expect(paddle.style.left).toBe(`${maxX}px`);
    });

    it("should ignore keys other than ArrowLeft and ArrowRight", () => {
      renderPage();

      const paddle = screen.getByRole("img", { name: "Player paddle" });
      const initialLeft = paddle.style.left;

      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Space" }));
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "a" }));

      expect(paddle.style.left).toBe(initialLeft);
    });
  });

  describe("cleanup", () => {
    it("should stop ball movement after cleanup", () => {
      renderPage();

      const ball = document.querySelector<HTMLDivElement>(".ball")!;

      page.cleanup?.();

      const leftAfterCleanup = ball.style.left;
      const bottomAfterCleanup = ball.style.bottom;

      jest.advanceTimersByTime(100);

      expect(ball.style.left).toBe(leftAfterCleanup);
      expect(ball.style.bottom).toBe(bottomAfterCleanup);
    });

    it("should stop user movement after cleanup", () => {
      renderPage();

      page.cleanup?.();

      const paddle = screen.getByRole("img", { name: "Player paddle" });
      const leftAfterCleanup = paddle.style.left;

      document.dispatchEvent(
        new KeyboardEvent("keydown", { key: "ArrowLeft" })
      );
      document.dispatchEvent(
        new KeyboardEvent("keydown", { key: "ArrowRight" })
      );

      expect(paddle.style.left).toBe(leftAfterCleanup);
    });

    it("should be safe to call cleanup multiple times", () => {
      renderPage();

      expect(() => {
        page.cleanup?.();
        page.cleanup?.();
      }).not.toThrow();
    });
  });
});
