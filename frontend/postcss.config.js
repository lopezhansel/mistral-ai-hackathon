import autoprefixer from "autoprefixer";
import tailwind from "tailwindcss";
import config from "./tailwind.config.js";

export default ({ env }) => {
  const plugins = [
    tailwind(config),
    env === "production" ? autoprefixer() : false,
  ];

  return {
    plugins,
  };
};
