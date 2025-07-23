import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Font optimization and caching
  async headers() {
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
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
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
        // Cache robots.txt
        source: "/robots.txt",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400", // 24 hours
          },
        ],
      },
      {
        // Cache sitemap files
        source: "/sitemap.xml",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400", // 24 hours
          },
        ],
      },
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/javascript; charset=utf-8',
          },
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self'",
          },
        ],
      },
    ];
  },

  // Optimize images
  images: {
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 31536000, // 1 year
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Enable compression
  compress: true,

  // Optimize bundle size
  experimental: {
    optimizeCss: true,
    optimizePackageImports: [
      "@fortawesome/fontawesome-svg-core",
      "@fortawesome/free-solid-svg-icons",
    ],
  },

  // Static generation optimization
  output: "standalone",

  // Enable source maps for production builds
  productionBrowserSourceMaps: true,

  transpilePackages: [
    "@fortawesome/fontawesome-svg-core",
    "@fortawesome/free-solid-svg-icons",
    "@fortawesome/free-brands-svg-icons",
    "@fortawesome/free-regular-svg-icons",
  ],

  // Webpack optimization (only for production builds)
  ...(process.env.NODE_ENV === "production" && {
    webpack: (config, { dev, isServer }) => {
      // Optimize for production
      if (!dev && !isServer) {
        config.optimization.splitChunks = {
          chunks: "all",
          cacheGroups: {
            // Split large packages into separate chunks
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
        };
      }

      return config;
    },
  }),
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
};

// Conditionally wrap with bundle analyzer
if (process.env.ANALYZE === "true") {
  const withBundleAnalyzer = (await import("@next/bundle-analyzer")).default({
    enabled: true,
  });
  nextConfig = withBundleAnalyzer(nextConfig);
}

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

export default withMDX(nextConfig);
