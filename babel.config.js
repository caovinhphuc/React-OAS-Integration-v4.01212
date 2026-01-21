/**
 * =============================================================================
 * 🎨 Babel Configuration - MIA.vn Google Integration Platform
 * =============================================================================
 * Babel configuration for JavaScript/TypeScript transpilation
 * =============================================================================
 */

module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "entry",
        corejs: 3,
        modules: false, // Let webpack handle modules
        debug: false,
      },
    ],
    [
      "@babel/preset-react",
      {
        runtime: "automatic", // Use new JSX transform
      },
    ],
  ],
  plugins: [
    // Fix loose mode warnings - all plugins must have same loose setting
    ["@babel/plugin-transform-class-properties", { loose: true }],
    ["@babel/plugin-transform-private-methods", { loose: true }],
    ["@babel/plugin-transform-private-property-in-object", { loose: true }],
    // Transform runtime for helpers
    [
      "@babel/plugin-transform-runtime",
      {
        useESModules: true,
        helpers: true,
        regenerator: true,
      },
    ],
    // Ant Design tree-shaking (install: npm i babel-plugin-import -D)
    // [
    //   "import",
    //   {
    //     libraryName: "antd",
    //     libraryDirectory: "es",
    //     style: "css", // or 'css' for CSS imports
    //   },
    // ],
  ],
  env: {
    development: {
      plugins: [
        // Development-only plugins
      ],
    },
    production: {
      plugins: [
        // Production-only plugins
      ],
    },
    test: {
      presets: [
        [
          "@babel/preset-env",
          {
            targets: {
              node: "current",
            },
          },
        ],
      ],
    },
  },
};
