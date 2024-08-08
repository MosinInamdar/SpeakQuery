import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import "../styles/ResponseDisplay.css";

const ResponseDisplay = ({ response, link, liked }) => (
  <div className="response-container">
    <ReactMarkdown
      children={response}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              style={materialLight}
              language={match[1]}
              PreTag="div"
              {...props}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    />
    {link && liked === null && (
      <p>
        This content has already been published. You can view it{" "}
        <a href={link} target="_blank" rel="noopener noreferrer">
          here
        </a>
        .
      </p>
    )}
  </div>
);

export default ResponseDisplay;
