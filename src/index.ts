import "@/index.css";
import BrickPulsePage from "@/pages/BrickPulsePage/BrickPulsePage";

const onInit = (): void => {
  const app = document.querySelector<HTMLDivElement>("#app");

  if (!app) throw new Error(`You must render a container to mount the app.`);

  const brickPulsePage = BrickPulsePage();
  app.appendChild(brickPulsePage);
};

document.addEventListener("DOMContentLoaded", onInit);
