import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      root: path.join(__dirname, "../../"),
    }
  },
};

export default nextConfig;

