import type { BallProps } from "@/types/props";
import type { BallComponent } from "@/types/components";

import "@/components/Ball/Ball.css";

const Ball = ({ x, y }: BallProps): BallComponent => {
  const divRoot = document.createElement("div");
  divRoot.className = "ball";
  divRoot.setAttribute("role", "img");
  divRoot.setAttribute("aria-label", "Ball");

  divRoot.style.left = `${x}px`;
  divRoot.style.bottom = `${y}px`;

  return divRoot;
};

export default Ball;
