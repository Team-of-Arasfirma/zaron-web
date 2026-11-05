import { createElement, type ReactNode } from "react";

export type RichNode = {
  type: string;
  text?: string;
  attrs?: {
    level?: number;
    start?: number;
    src?: string;
    alt?: string;
    href?: string;
  };
  marks?: { type: string; attrs?: { href?: string } }[];
  content?: RichNode[];
};
function safe(url?: string) {
  if (!url) return undefined;
  if (/^\/(?!\/)[^\s\\]*$/.test(url)) return url;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" && !parsed.username && !parsed.password
      ? url
      : undefined;
  } catch {
    return undefined;
  }
}
export function RichContent({ content }: { content: RichNode }) {
  function render(node: RichNode, key: number, depth = 0): ReactNode {
    if (depth > 20) return null;
    if (node.type === "text") {
      let text: ReactNode = node.text ?? "";
      for (const mark of node.marks ?? []) {
        const tag = {
          bold: "strong",
          italic: "em",
          strike: "s",
          underline: "u",
          code: "code",
        }[mark.type];
        if (tag) text = createElement(tag, {}, text);
        if (mark.type === "link" && safe(mark.attrs?.href))
          text = (
            <a href={safe(mark.attrs?.href)} rel="noopener noreferrer">
              {text}
            </a>
          );
      }
      return <span key={key}>{text}</span>;
    }
    if (node.type === "image") {
      const src = safe(node.attrs?.src);
      // Uploaded images are rendered without accepting HTML from the editor.
      /* eslint-disable @next/next/no-img-element -- Inline media uses safe CDN URLs. */
      return src ? (
        <img
          key={key}
          src={src}
          alt={node.attrs?.alt ?? ""}
          loading="lazy"
          className="max-w-full rounded-lg"
        />
      ) : null;
    }
    const tags: Record<string, string> = {
      doc: "div",
      paragraph: "p",
      heading: node.attrs?.level === 3 ? "h3" : "h2",
      bulletList: "ul",
      orderedList: "ol",
      listItem: "li",
      blockquote: "blockquote",
      hardBreak: "br",
      horizontalRule: "hr",
      codeBlock: "pre",
    };
    const tag = tags[node.type];
    if (!tag) return null;
    return createElement(
      tag,
      {
        key,
        ...(node.type === "orderedList" ? { start: node.attrs?.start } : {}),
      },
      ...(node.content ?? []).map((child, i) => render(child, i, depth + 1)),
    );
  }
  return <div className="blog-rich-content">{render(content, 0)}</div>;
}
