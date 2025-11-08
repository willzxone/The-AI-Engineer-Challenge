'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import 'highlight.js/styles/github-dark.css'

interface MessageBubbleProps {
  message: {
    role: 'user' | 'assistant'
    content: string
  }
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] md:max-w-[70%] rounded-2xl px-4 py-3 ${
          isUser
            ? 'glass-strong text-white'
            : 'glass text-white/90'
        }`}
      >
        <div className="text-sm font-medium mb-2 opacity-70">
          {isUser ? 'You' : 'Assistant'}
        </div>
        {message.content ? (
          <div className="markdown-content break-words">
            {isUser ? (
              // For user messages, use simple formatting
              <div className="whitespace-pre-wrap">{message.content}</div>
            ) : (
              // For assistant messages, use markdown rendering
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight, rehypeRaw]}
                components={{
                  // Customize code block styling
                  code({ node, inline, className, children, ...props }: any) {
                    const match = /language-(\w+)/.exec(className || '')
                    return !inline && match ? (
                      <pre className="bg-black/40 rounded-lg p-3 overflow-x-auto my-2 border border-white/10">
                        <code className={className} {...props}>
                          {children}
                        </code>
                      </pre>
                    ) : (
                      <code className="bg-black/30 px-1.5 py-0.5 rounded text-amber-300" {...props}>
                        {children}
                      </code>
                    )
                  },
                  // Customize table styling
                  table({ children }: any) {
                    return (
                      <div className="overflow-x-auto my-2">
                        <table className="min-w-full border-collapse">{children}</table>
                      </div>
                    )
                  },
                  // Customize list styling
                  ul({ children }: any) {
                    return <ul className="list-disc list-inside space-y-1 my-2">{children}</ul>
                  },
                  ol({ children }: any) {
                    return <ol className="list-decimal list-inside space-y-1 my-2">{children}</ol>
                  },
                  // Customize heading styling
                  h1({ children }: any) {
                    return <h1 className="text-xl font-bold mt-4 mb-2 pb-2 border-b border-white/20">{children}</h1>
                  },
                  h2({ children }: any) {
                    return <h2 className="text-lg font-bold mt-3 mb-2">{children}</h2>
                  },
                  h3({ children }: any) {
                    return <h3 className="text-base font-bold mt-2 mb-1">{children}</h3>
                  },
                  // Customize paragraph spacing
                  p({ children }: any) {
                    return <p className="mb-2 leading-relaxed">{children}</p>
                  },
                  // Customize blockquote
                  blockquote({ children }: any) {
                    return (
                      <blockquote className="border-l-4 border-white/30 pl-4 my-2 italic text-white/80">
                        {children}
                      </blockquote>
                    )
                  },
                  // Customize links
                  a({ children, href }: any) {
                    return (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-300 hover:text-blue-200 underline"
                      >
                        {children}
                      </a>
                    )
                  },
                }}
              >
                {message.content}
              </ReactMarkdown>
            )}
          </div>
        ) : (
          <span className="text-white/50 italic">Thinking...</span>
        )}
      </div>
    </div>
  )
}

