'use client'

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
        <div className="text-sm font-medium mb-1 opacity-70">
          {isUser ? 'You' : 'Assistant'}
        </div>
        <div className="whitespace-pre-wrap break-words">
          {message.content || (
            <span className="text-white/50 italic">Thinking...</span>
          )}
        </div>
      </div>
    </div>
  )
}

