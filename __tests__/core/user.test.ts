import { User } from "@/core/user";

describe("User", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("constructor", () => {
    it("should initialize with given position", () => {
      const user = new User({ x: 250, y: 0 });

      expect(user.position).toEqual({ x: 250, y: 0 });
    });
  });

  describe("move", () => {
    it("should decrease x by 10 on ArrowLeft", () => {
      const user = new User({ x: 250, y: 0 });

      user.move("ArrowLeft");

      expect(user.position.x).toBe(240);
    });

    it("should increase x by 10 on ArrowRight", () => {
      const user = new User({ x: 250, y: 0 });

      user.move("ArrowRight");

      expect(user.position.x).toBe(260);
    });

    it("should not change y on ArrowLeft", () => {
      const user = new User({ x: 250, y: 0 });

      user.move("ArrowLeft");

      expect(user.position.y).toBe(0);
    });

    it("should not change y on ArrowRight", () => {
      const user = new User({ x: 250, y: 0 });

      user.move("ArrowRight");

      expect(user.position.y).toBe(0);
    });

    it("should accumulate position over multiple left moves", () => {
      const user = new User({ x: 250, y: 0 });

      user.move("ArrowLeft");
      user.move("ArrowLeft");
      user.move("ArrowLeft");

      expect(user.position.x).toBe(220);
    });

    it("should accumulate position over multiple right moves", () => {
      const user = new User({ x: 250, y: 0 });

      user.move("ArrowRight");
      user.move("ArrowRight");

      expect(user.position.x).toBe(270);
    });
  });

  describe("create", () => {
    it("should return a div element with class user", () => {
      const user = new User({ x: 250, y: 0 });
      const element = user.create();
      document.body.appendChild(element);

      expect(element).toHaveClass("user");
    });

    it("should set left style from position.x", () => {
      const user = new User({ x: 100, y: 0 });
      const element = user.create();

      expect(element.style.left).toBe("100px");
    });

    it("should set bottom style from position.y", () => {
      const user = new User({ x: 250, y: 50 });
      const element = user.create();

      expect(element.style.bottom).toBe("50px");
    });
  });
});
