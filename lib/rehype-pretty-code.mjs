import rehypePrettyCode from "rehype-pretty-code";

/** Default export: [plugin, options] tuple for @next/mdx string reference. */
export default [
  rehypePrettyCode,
  {
    theme: {
      dark: "github-dark-dimmed",
      light: "github-light",
    },
    keepBackground: false,
    defaultLang: "plaintext",
    onVisitLine(node) {
      if (node.children.length === 0) {
        node.children = [{ type: "text", value: " " }];
      }
    },
    onVisitHighlightedLine(node) {
      const existing = (node.properties.className) ?? [];
      node.properties.className = [...existing, "line--highlighted"];
    },
    onVisitHighlightedChars(node) {
      const existing = (node.properties.className) ?? [];
      node.properties.className = [...existing, "chars--highlighted"];
    },
  },
];
