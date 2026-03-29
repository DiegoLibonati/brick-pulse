import type { UserProps } from "@/types/props";
import type { UserComponent } from "@/types/components";

import "@/components/User/User.css";

const User = ({ x, y }: UserProps): UserComponent => {
  const divRoot = document.createElement("div");
  divRoot.className = "user";
  divRoot.setAttribute("role", "img");
  divRoot.setAttribute("aria-label", "Player paddle");

  divRoot.style.left = `${x}px`;
  divRoot.style.bottom = `${y}px`;

  return divRoot;
};

export default User;
