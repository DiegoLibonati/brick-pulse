import type { Coords, Sizes } from "@/types/app";

import { Block } from "@/core/block";

const position: Coords = { x: 100, y: 200 };
const sizes: Sizes = { width: 100, height: 20 };

describe("Block", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("constructor", () => {
    it("should initialize position and sizes", () => {
      const block = new Block(position, sizes);

      expect(block.position).toEqual(position);
      expect(block.sizes).toEqual(sizes);
    });

    it("should set bottomLeft equal to position", () => {
      const block = new Block(position, sizes);

      expect(block.bottomLeft).toEqual({ x: 100, y: 200 });
    });

    it("should compute bottomRight from position.x plus width", () => {
      const block = new Block(position, sizes);

      expect(block.bottomRight).toEqual({ x: 200, y: 200 });
    });

    it("should compute topLeft from position.y plus height", () => {
      const block = new Block(position, sizes);

      expect(block.topLeft).toEqual({ x: 100, y: 220 });
    });

    it("should compute topRight from position plus both dimensions", () => {
      const block = new Block(position, sizes);

      expect(block.topRight).toEqual({ x: 200, y: 220 });
    });

    it("should compute corners correctly for position at origin", () => {
      const block = new Block({ x: 0, y: 0 }, sizes);

      expect(block.bottomLeft).toEqual({ x: 0, y: 0 });
      expect(block.bottomRight).toEqual({ x: 100, y: 0 });
      expect(block.topLeft).toEqual({ x: 0, y: 20 });
      expect(block.topRight).toEqual({ x: 100, y: 20 });
    });
  });

  describe("create", () => {
    it("should return a div element with class block", () => {
      const block = new Block(position, sizes);
      const element = block.create();
      document.body.appendChild(element);

      expect(element).toHaveClass("block");
    });

    it("should set left style from bottomLeft.x", () => {
      const block = new Block(position, sizes);
      const element = block.create();

      expect(element.style.left).toBe("100px");
    });

    it("should set bottom style from bottomLeft.y", () => {
      const block = new Block(position, sizes);
      const element = block.create();

      expect(element.style.bottom).toBe("200px");
    });
  });
});
