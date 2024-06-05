import { ComponentProps, FC, memo } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ReactMarkdown, { Options } from "react-markdown";
import remarkGfm from "remark-gfm";

import { cn } from "@/lib/utils";
import { MDXComponents } from "mdx/types";

const components: MDXComponents = {
  h1: ({ className, ...props }: ComponentProps<"h1">) => (
    <h1
      className={cn(
        "mt-2 flex w-full items-center gap-1 text-3xl font-extrabold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  ol: ({ className, ...props }: ComponentProps<"ol">) => (
    <ol className={cn("list-decimal pl-4", className)} {...props} />
  ),
  ul: ({ className, ...props }: ComponentProps<"ul">) => (
    <ul className={cn("list-disc pl-4", className)} {...props} />
  ),
  li: ({ className, ...props }: ComponentProps<"li">) => (
    <li className={cn("py-1", className)} {...props} />
  ),
  strong: ({ className, ...props }: ComponentProps<"strong">) => (
    <strong className={cn("font-medium", className)} {...props} />
  ),
  // more components + custom components
};

const MemoizedReactMarkdown: FC<Options> = memo(
  ReactMarkdown,
  (prevProps, nextProps) =>
    prevProps.children === nextProps.children &&
    prevProps.className === nextProps.className
);

export function RenderMessage({ children }: { children: string }) {
  return (
    <ErrorBoundary
      fallback={<div className="whitespace-pre-wrap">{children}</div>}
    >
      <MemoizedReactMarkdown
        //@ts-ignore
        components={components}
        remarkPlugins={[remarkGfm /* additional plugins */]}
      >
        {children}
      </MemoizedReactMarkdown>
    </ErrorBoundary>
  );
}
