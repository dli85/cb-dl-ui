import { createSystem, defaultConfig } from "@chakra-ui/react";

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        heading: { value: `'Figtree', sans-serif` },
        body: { value: `'Figtree', sans-serif` },
      },
      colors: {
        background: { value: "#5D576B" },
        primary: { value: "#8884FF" },
        secondary: { value: "#D7BCE8" },
        text: { value: "#000000" },
        white: { value: "#FFFFFF" },
      },
    },
    // semanticTokens: {
    //   colors: {
    //     bg: { default: "{colors.background.value}" },
    //     text: { default: "{colors.text.value}" },
    //     primary: { default: "{colors.primary.value}" },
    //     secondary: { default: "{colors.secondary.value}" },
    //   },
    // },
  },
});
