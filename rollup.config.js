import typescript from "@rollup/plugin-typescript";

export default [
  {
    input: ["./src/LazyPhoneFormatter.tsx", "./src/PhoneFormatter.tsx"],
    output: [{ dir: "dist", format: "es", entryFileNames: "[name].mjs" }],
    external: ["react", "libphonenumber-js/min"],
    plugins: [
      typescript({
        declaration: true,
        outDir: "dist",
        target: "es2020",
      }),
    ],
  },
  {
    input: "./src/PhoneFormatter.tsx",
    output: [
      {
        file: "dist/PhoneFormatter.js",
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
