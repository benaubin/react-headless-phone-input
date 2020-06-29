import typescript from "@rollup/plugin-typescript";

export default [
  {
    input: ["./src/lazy.tsx", "./src/index.tsx"],
    output: [{ dir: "dist", format: "es", entryFileNames: "[name].mjs" }],
    external: ["react", "libphonenumber-js/min"],
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
    external: ["react", "libphonenumber-js/min"],
    plugins: [
      typescript({
        target: "es2015",
      }),
    ],
  },
];
