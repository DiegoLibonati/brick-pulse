import { screen } from "@testing-library/dom";

import type { BallProps } from "@/types/props";
import type { BallComponent } from "@/types/components";

import Ball from "@/components/Ball/Ball";

const defaultProps: BallProps = { x: 10, y: 20 };

const renderComponent = (props: Partial<BallProps> = {}): BallComponent => {
  const element = Ball({ ...defaultProps, ...props });
  document.body.appendChild(element);
  return element;
};

describe("Ball", () => {
  afterEach(() => {
    document.body.innerHTML = "";
    jest.clearAllMocks();
  });

  describe("rendering", () => {
    it("should render with class ball", () => {
      renderComponent();

      expect(screen.getByRole("img", { name: "Ball" })).toHaveClass("ball");
    });

    it("should have role img and aria-label Ball", () => {
      renderComponent();

      expect(screen.getByRole("img", { name: "Ball" })).toBeInTheDocument();
    });

    it("should set left style from x prop", () => {
      renderComponent({ x: 50 });

      expect(screen.getByRole("img", { name: "Ball" }).style.left).toBe("50px");
    });

    it("should set bottom style from y prop", () => {
      renderComponent({ y: 80 });

      expect(screen.getByRole("img", { name: "Ball" }).style.bottom).toBe(
        "80px"
      );
    });

    it("should set left and bottom to 0px when x and y are 0", () => {
      renderComponent({ x: 0, y: 0 });

      const element = screen.getByRole("img", { name: "Ball" });

      expect(element.style.left).toBe("0px");
      expect(element.style.bottom).toBe("0px");
    });
  });
});
