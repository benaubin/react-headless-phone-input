import typescript from "@rollup/plugin-typescript";
import alias from "@rollup/plugin-alias";

export default [
  {
    input: ["./src/lazy.tsx", "./src/index.tsx"],
    output: [{ dir: "dist", format: "es", entryFileNames: "[name].mjs" }],
    external: ["react", "libphonenumber-js/min/index"],
    plugins: [
      typescript({
        declaration: true,
        outDir: "dist",
        target: "es2018",
      }),
    ],
  },
  {
    input: "./src/index.tsx",
    output: [
      {
        file: "dist/index.js",
        format: "cjs",
      },
    ],
    external: ["react", "libphonenumber-js/min/index.commonjs"],
    plugins: [
      typescript({
        target: "es2015",
      }),
      alias({
        entries: [
          {
            find: "libphonenumber-js/min/index",
            replacement: "./src/as-you-type.cjs",
          },
        ],
      }),
    ],
  },
];
