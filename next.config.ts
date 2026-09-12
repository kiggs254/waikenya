import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Don't advertise the framework, and don't ship source maps to the browser.
  poweredByHeader: false,
  productionBrowserSourceMaps: false,

  images: {
    // Uploads live on the WordPress host (admin.waikenyachapter.com). Anything
    // not listed here is rejected by the optimizer with a 400.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "admin.waikenyachapter.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
    dangerouslyAllowSVG: false,
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "geolocation=(), microphone=(), camera=(), payment=()" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'none'; object-src 'none'; base-uri 'self'",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
