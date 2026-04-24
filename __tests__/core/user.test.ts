import type { Coords } from "@/types/app";

import { User } from "@/core/user";

const defaultPosition: Coords = { x: 250, y: 0 };

const createUser = (position: Coords = defaultPosition): User =>
  new User({ ...position });

describe("User", () => {
  afterEach(() => {
    document.body.innerHTML = "";
    jest.clearAllMocks();
  });

  describe("constructor", () => {
    it("should initialize with given position", () => {
      const user = createUser();

      expect(user.position).toEqual(defaultPosition);
    });
  });

  describe("move", () => {
    it("should decrease x by 10 on ArrowLeft", () => {
      const user = createUser();

      user.move("ArrowLeft");

      expect(user.position.x).toBe(240);
    });

    it("should increase x by 10 on ArrowRight", () => {
      const user = createUser();

      user.move("ArrowRight");

      expect(user.position.x).toBe(260);
    });

    it("should not change y on ArrowLeft", () => {
      const user = createUser();

      user.move("ArrowLeft");

      expect(user.position.y).toBe(0);
    });

    it("should not change y on ArrowRight", () => {
      const user = createUser();

      user.move("ArrowRight");

      expect(user.position.y).toBe(0);
    });

    it("should accumulate position over multiple left moves", () => {
      const user = createUser();

      user.move("ArrowLeft");
      user.move("ArrowLeft");
      user.move("ArrowLeft");

      expect(user.position.x).toBe(220);
    });

    it("should accumulate position over multiple right moves", () => {
      const user = createUser();

      user.move("ArrowRight");
      user.move("ArrowRight");

      expect(user.position.x).toBe(270);
    });
  });

  describe("create", () => {
    it("should return a div element with class user", () => {
      const user = createUser();
      const element = user.create();
      document.body.appendChild(element);

      expect(element).toHaveClass("user");
    });

    it("should set left style from position.x", () => {
      const user = createUser({ x: 100, y: 0 });
      const element = user.create();

      expect(element.style.left).toBe("100px");
    });

    it("should set bottom style from position.y", () => {
      const user = createUser({ x: 250, y: 50 });
      const element = user.create();

      expect(element.style.bottom).toBe("50px");
    });
  });
});
