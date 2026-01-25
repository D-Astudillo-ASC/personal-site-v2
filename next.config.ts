import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import { resolve } from "path";

const nextConfig: NextConfig = {
  // Turbopack configuration - explicitly set root to prevent workspace detection issues
  // This prevents Turbopack from detecting parent directory's package.json
  turbopack: {
    root: process.cwd(),
  },

  // Explicitly disable trailing slashes to prevent redirects
  // This ensures URLs like /blog and /contact don't redirect
  // All URLs should be without trailing slashes for consistency
  trailingSlash: false,

  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Remove X-Powered-By header for security
  poweredByHeader: false,

  // Optimize images
  images: {
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 31536000, // 1 year
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [30, 75],
  },

  // Enable compression
  compress: true,

  // Optimize bundle size
  experimental: {
    optimizeCss: true,
    optimizePackageImports: [
      "@fortawesome/fontawesome-svg-core",
      "@fortawesome/free-solid-svg-icons",
      "framer-motion",
      "next-themes",
      "zod",
    ],
    // Enable webpack build worker for faster builds
    webpackBuildWorker: true,
  },

  // Static generation optimization
  output: "standalone",

  // Disable production source maps for smaller builds (standalone output)
  productionBrowserSourceMaps: false,

  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: false,
  },

  transpilePackages: [
    "@fortawesome/fontawesome-svg-core",
    "@fortawesome/free-solid-svg-icons",
    "@fortawesome/free-brands-svg-icons",
    "@fortawesome/free-regular-svg-icons",
  ],

  // Webpack configuration - fixes parent directory resolution issue
  // The issue: webpack walks up directories looking for package.json files.
  // If it finds /Users/danielastudillo/package.json, it uses that as the root,
  // causing module resolution to fail. Solution: lock webpack to project root.
  webpack: (config, { dev, isServer }) => {
    // Lock webpack context to project root - prevents walking up directories
    const projectRoot = process.cwd();
    config.context = projectRoot;

    // Configure module resolution to prioritize project's node_modules
    // while preserving Next.js internal resolution paths
    const projectNodeModules = resolve(projectRoot, "node_modules");
    const existingModules = config.resolve?.modules || [];

    // Preserve Next.js internal module paths (absolute paths)
    const nextJsModules = existingModules.filter(
      (m: string) =>
        typeof m === "string" &&
        (m.startsWith("/") || m.includes("next") || m.includes(".next"))
    );

    // Set resolve modules: project's node_modules first, then Next.js internals
    config.resolve = {
      ...config.resolve,
      modules: [projectNodeModules, ...nextJsModules],
      symlinks: false, // Prevent following symlinks to parent directories
    };

    // Configure loader resolution similarly
    const existingLoaderModules = config.resolveLoader?.modules || [];
    const nextJsLoaderModules = existingLoaderModules.filter(
      (m: string) =>
        typeof m === "string" &&
        (m.startsWith("/") || m.includes("next") || m.includes(".next"))
    );

    config.resolveLoader = {
      ...config.resolveLoader,
      modules: [projectNodeModules, ...nextJsLoaderModules],
      symlinks: false,
    };

    // Production-only optimizations: code splitting for better caching
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: "all",
          cacheGroups: {
            // Split large packages into separate chunks for better caching
            framerMotion: {
              test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
              name: "framer-motion",
              chunks: "all",
              priority: 20,
            },
            fontawesome: {
              test: /[\\/]node_modules[\\/]@fortawesome[\\/]/,
              name: "fontawesome",
              chunks: "all",
              priority: 20,
            },
            react: {
              test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
              name: "react",
              chunks: "all",
              priority: 30,
            },
            // Default vendor chunk for everything else
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: "vendors",
              chunks: "all",
              priority: 10,
            },
          },
        },
      };
    }

    return config;
  },

  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],

  // Note: www to non-www redirects are handled by Vercel Dashboard
  // Settings > Domains > Configure redirects there
  // HTTP to HTTPS is handled automatically by Vercel at the platform level
  // See: https://community.vercel.com/t/http-forward-to-https/6219
  // See: https://vercel.com/docs/projects/domains/deploying-and-redirecting

  // Configure logging for better debugging
  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  // Configure headers for better performance and security
  async headers() {
    const isDev = process.env.NODE_ENV === "development";

    return [
      {
        // Apply to all font files
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable", // 1 year cache
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
        ],
      },
      {
        // Apply to all static assets
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: isDev ? "SAMEORIGIN" : "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          // CORS headers for development (if needed for mobile testing)
          ...(isDev
            ? [
              {
                key: "Access-Control-Allow-Origin",
                value: "*",
              },
              {
                key: "Access-Control-Allow-Methods",
                value: "GET, POST, PUT, DELETE, OPTIONS",
              },
              {
                key: "Access-Control-Allow-Headers",
                value: "Content-Type, Authorization",
              },
            ]
            : []),
        ],
      },
      {
        // Cache static assets aggressively
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Cache CSS and JS files
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Cache favicon files
        source: "/favicon-dark.ico",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400", // 24 hours
          },
        ],
      },
      {
        // Cache manifest files
        source: "/manifest.json",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400", // 24 hours
          },
        ],
      },
      {
        source: "/robots.txt",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400", // 24 hours
          },
        ],
      },
      {
        source: "/sitemap.xml",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400", // 24 hours
          },
          {
            key: "Content-Type",
            value: "application/xml",
          },
        ],
      },
      {
        source: "/amp/sitemap.xml",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400", // 24 hours
          },
          {
            key: "Content-Type",
            value: "application/xml",
          },
        ],
      },
    ];
  },
};

// Wrap with MDX
const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  // TODO: Explore remark and rehype plugins.
  //   options: {
  //     remarkPlugins: [
  //       // Without options
  //       'remark-gfm',
  //       // With options
  //       ['remark-toc', { heading: 'The Table' }],
  //     ],
  //     rehypePlugins: [
  //       // Without options
  //       'rehype-slug',
  //       // With options
  //       ['rehype-katex', { strict: true, throwOnError: true }],
  //     ],
  //   },
});

let finalConfig: NextConfig = withMDX(nextConfig);

// Conditionally wrap with bundle analyzer
if (process.env.ANALYZE === "true") {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const withBundleAnalyzer = require("@next/bundle-analyzer").default({
    enabled: true,
  });
  finalConfig = withBundleAnalyzer(finalConfig);
}

export default finalConfig;
