import ReactMarkdown from "react-markdown";
import "katex/dist/katex.min.css";
import RemarkMath from "remark-math";
import RemarkBreaks from "remark-breaks";
import RehypeKatex from "rehype-katex";
import RemarkGfm from "remark-gfm";
import RehypeHighlight from "rehype-highlight";
import { useRef, useState, RefObject, useEffect } from "react";
import mermaid from "mermaid";
import React from "react";
import { useDebouncedCallback } from "use-debounce";
import LoadingIcon from "../../icons/three_dot.svg";

// 配置 mermaid
mermaid.initialize({
    startOnLoad: false,
    theme: "default",
});

// 全局日志记录函数
const logError = (message: string, error: any) => {
    console.error(`[Markdown] ${message}:`, error);
};

export function Mermaid(props: { code: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        if (props.code && ref.current) {
            mermaid
                .run({
                    nodes: [ref.current],
                    suppressErrors: true,
                })
                .catch((e) => {
                    setHasError(true);
                    logError("Mermaid rendering error", e);
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.code]);

    function viewSvgInNewWindow() {
        const svg = ref.current?.querySelector("svg");
        if (!svg) return;
        const text = new XMLSerializer().serializeToString(svg);
        const blob = new Blob([text], { type: "image/svg+xml" });
        const url = URL.createObjectURL(blob);
        const win = window.open(url);
        if (win) {
            win.onload = () => URL.revokeObjectURL(url);
        }
    }

    if (hasError) {
        return <div className="mermaid-error">Mermaid rendering failed.</div>;
    }

    return (
        <div
            className="no-dark mermaid"
            style={{
                cursor: "pointer",
                overflow: "auto",
            }}
            ref={ref}
            onClick={() => viewSvgInNewWindow()}
        >
            {props.code}
        </div>
    );
}

export function PreCode(props: { children: any }) {
    const ref = useRef<HTMLPreElement>(null);
    const refText = ref.current?.innerText;
    const [mermaidCode, setMermaidCode] = useState("");

    const renderMermaid = useDebouncedCallback(() => {
        if (!ref.current) return;
        const mermaidDom = ref.current.querySelector("code.language-mermaid");
        if (mermaidDom) {
            setMermaidCode((mermaidDom as HTMLElement).innerText);
        }
    }, 600);

    useEffect(() => {
        setTimeout(renderMermaid, 1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refText]);

    const copyCode = () => {
        if (ref.current) {
            const text = ref.current.innerText;
            navigator.clipboard.writeText(text).then(() => {
                console.log("Code copied to clipboard");
            }).catch((error) => {
                logError("Copy code error", error);
            });
        }
    };

    return (
        <>
            {mermaidCode.length > 0 && (
                <Mermaid code={mermaidCode} key={mermaidCode} />
            )}
            <pre ref={ref}>
                <span
                    className="copy-code-button"
                    onClick={copyCode}
                >
                    Copy
                </span>
                {props.children}
            </pre>
        </>
    );
}

function _MarkDownContent(props: { content: string }) {
    return (
        <ReactMarkdown
            remarkPlugins={[RemarkMath, RemarkGfm, RemarkBreaks]}
            rehypePlugins={[
                RehypeKatex,
                [
                    RehypeHighlight,
                    {
                        detect: false,
                        ignoreMissing: true,
                    },
                ],
            ]}
            components={{
                pre: PreCode,
                a: (aProps) => {
                    const href = aProps.href || "";
                    const isInternal = /^\/#/i.test(href);
                    const target = isInternal ? "_self" : aProps.target ?? "_blank";
                    return <a {...aProps} target={target} />;
                },
            }}
        >
            {props.content}
        </ReactMarkdown>
    );
}

export const MarkdownContent = React.memo(_MarkDownContent);

export function Markdown(
    props: {
        content: string;
        loading?: boolean;
        fontSize?: number;
        parentRef?: RefObject<HTMLDivElement>;
        defaultShow?: boolean;
        className?: string;
        style?: React.CSSProperties;
    } & React.DOMAttributes<HTMLDivElement>,
) {
    const combinedStyle = {
        fontSize: `${props.fontSize ?? 14}px`,
        direction: /[\u0600-\u06FF]/.test(props.content) ? "rtl" : "ltr",
        ...props.style
    };

    return (
        <div
            className={`markdown-body ${props.className || ""}`}

            ref={props.parentRef}
        >
            {props.loading ? (
                <LoadingIcon />
            ) : (
                <MarkdownContent content={props.content} />
            )}
        </div>
    );
}
