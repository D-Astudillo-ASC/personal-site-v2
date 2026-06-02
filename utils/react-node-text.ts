import { isValidElement, type ReactNode } from "react";

/** Flatten React children to plain text (for heading slug generation). */
export function getTextFromReactNode(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getTextFromReactNode).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) {
    return getTextFromReactNode(node.props.children);
  }
  return "";
}
