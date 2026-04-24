import { screen } from "@testing-library/dom";

import type { BlockProps } from "@/types/props";
import type { BlockComponent } from "@/types/components";

import Block from "@/components/Block/Block";

const defaultProps: BlockProps = { x: 0, y: 279 };

const renderComponent = (props: Partial<BlockProps> = {}): BlockComponent => {
  const element = Block({ ...defaultProps, ...props });
  document.body.appendChild(element);
  return element;
};

describe("Block", () => {
  afterEach(() => {
    document.body.innerHTML = "";
    jest.clearAllMocks();
  });

  describe("rendering", () => {
    it("should render with class block", () => {
      renderComponent();

      expect(screen.getByRole("img", { name: "Block" })).toHaveClass("block");
    });

    it("should have role img and aria-label Block", () => {
      renderComponent();

      expect(screen.getByRole("img", { name: "Block" })).toBeInTheDocument();
    });

    it("should set left style from x prop", () => {
      renderComponent({ x: 100 });

      expect(screen.getByRole("img", { name: "Block" }).style.left).toBe(
        "100px"
      );
    });

    it("should set bottom style from y prop", () => {
      renderComponent({ y: 259 });

      expect(screen.getByRole("img", { name: "Block" }).style.bottom).toBe(
        "259px"
      );
    });

    it("should set left and bottom to 0px when x and y are 0", () => {
      renderComponent({ x: 0, y: 0 });

      const element = screen.getByRole("img", { name: "Block" });

      expect(element.style.left).toBe("0px");
      expect(element.style.bottom).toBe("0px");
    });
  });
});
