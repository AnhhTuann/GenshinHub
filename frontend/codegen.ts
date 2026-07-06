import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:4000/graphql", // adjust if your backend runs on a different port
  documents: "lib/graphql/**/*.ts",
  generates: {
    "types/graphql.ts": {
      plugins: ["typescript", "typescript-operations"],
      config: {
        skipTypename: false,
        withHooks: false,
        withHOC: false,
        withComponent: false,
      }
    }
  }
};

export default config;
