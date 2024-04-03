import tailwind from "tailwindcss";
import autoprefixer from "autoprefixer";
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
