import { screen } from "@testing-library/dom";

import type { UserProps } from "@/types/props";
import type { UserComponent } from "@/types/components";

import User from "@/components/User/User";

const defaultProps: UserProps = { x: 250, y: 0 };

const renderComponent = (props: Partial<UserProps> = {}): UserComponent => {
  const element = User({ ...defaultProps, ...props });
  document.body.appendChild(element);
  return element;
};

describe("User", () => {
  afterEach(() => {
    document.body.innerHTML = "";
    jest.clearAllMocks();
  });

  describe("rendering", () => {
    it("should render with class user", () => {
      renderComponent();

      expect(screen.getByRole("img", { name: "Player paddle" })).toHaveClass(
        "user"
      );
    });

    it("should have role img and aria-label Player paddle", () => {
      renderComponent();

      expect(
        screen.getByRole("img", { name: "Player paddle" })
      ).toBeInTheDocument();
    });

    it("should set left style from x prop", () => {
      renderComponent({ x: 100 });

      expect(
        screen.getByRole("img", { name: "Player paddle" }).style.left
      ).toBe("100px");
    });

    it("should set bottom style from y prop", () => {
      renderComponent({ y: 10 });

      expect(
        screen.getByRole("img", { name: "Player paddle" }).style.bottom
      ).toBe("10px");
    });

    it("should set left and bottom to 0px when x and y are 0", () => {
      renderComponent({ x: 0, y: 0 });

      const element = screen.getByRole("img", { name: "Player paddle" });

      expect(element.style.left).toBe("0px");
      expect(element.style.bottom).toBe("0px");
    });
  });
});
