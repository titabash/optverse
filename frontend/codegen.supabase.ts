import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://127.0.0.1:54321/graphql/v1",
  generates: {
    "packages/app/shared/gql/supabase/__generated__/": {
      preset: "client",
      plugins: [
        {
          add: {
            content: `export type DateString = string & { readonly __brand: unique symbol }`,
          },
        },
      ],
      config: {
        strictScalars: true,
        useTypeImports: true,
        skipTypename: true,
        arrayInputCoercion: true,
        avoidOptionals: {
          field: true,
          inputValue: false,
          object: true,
          defaultValue: false,
        },
        scalars: {
          Date: "DateString",
          BigInt: "number",
          BigFloat: "number",
          Cursor: "string",
          Datetime: "DateString",
          JSON: "Record<string, unknown>",
          Opaque: "unknown",
          Time: "DateString",
          UUID: "string",
        },
        enumsAsTypes: true,
      },
    },
  },
};

export default config;
