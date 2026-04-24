import type { Coords, Sizes } from "@/types/app";

import { Block } from "@/core/block";

const defaultPosition: Coords = { x: 100, y: 200 };
const defaultSizes: Sizes = { width: 100, height: 20 };

const createBlock = (
  position: Coords = defaultPosition,
  sizes: Sizes = defaultSizes
): Block => new Block({ ...position }, { ...sizes });

describe("Block", () => {
  afterEach(() => {
    document.body.innerHTML = "";
    jest.clearAllMocks();
  });

  describe("constructor", () => {
    it("should initialize position and sizes", () => {
      const block = createBlock();

      expect(block.position).toEqual(defaultPosition);
      expect(block.sizes).toEqual(defaultSizes);
    });

    it("should set bottomLeft equal to position", () => {
      const block = createBlock();

      expect(block.bottomLeft).toEqual({ x: 100, y: 200 });
    });

    it("should compute bottomRight from position.x plus width", () => {
      const block = createBlock();

      expect(block.bottomRight).toEqual({ x: 200, y: 200 });
    });

    it("should compute topLeft from position.y plus height", () => {
      const block = createBlock();

      expect(block.topLeft).toEqual({ x: 100, y: 220 });
    });

    it("should compute topRight from position plus both dimensions", () => {
      const block = createBlock();

      expect(block.topRight).toEqual({ x: 200, y: 220 });
    });

    it("should compute corners correctly for position at origin", () => {
      const block = createBlock({ x: 0, y: 0 });

      expect(block.bottomLeft).toEqual({ x: 0, y: 0 });
      expect(block.bottomRight).toEqual({ x: 100, y: 0 });
      expect(block.topLeft).toEqual({ x: 0, y: 20 });
      expect(block.topRight).toEqual({ x: 100, y: 20 });
    });
  });

  describe("create", () => {
    it("should return a div element with class block", () => {
      const block = createBlock();
      const element = block.create();
      document.body.appendChild(element);

      expect(element).toHaveClass("block");
    });

    it("should set left style from bottomLeft.x", () => {
      const block = createBlock();
      const element = block.create();

      expect(element.style.left).toBe("100px");
    });

    it("should set bottom style from bottomLeft.y", () => {
      const block = createBlock();
      const element = block.create();

      expect(element.style.bottom).toBe("200px");
    });
  });
});
