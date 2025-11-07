'use client'

import { useState, KeyboardEvent } from 'react'

interface ChatInputProps {
  onSend: (message: string) => void
  disabled?: boolean
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && !disabled) {
      onSend(message)
      setMessage('')
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as any)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message... (Press Enter to send, Shift+Enter for new line)"
        disabled={disabled}
        rows={1}
        className="flex-1 glass rounded-xl px-4 py-3 text-white placeholder-white/50 border border-white/20 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ minHeight: '48px', maxHeight: '120px' }}
        onInput={(e) => {
          const target = e.target as HTMLTextAreaElement
          target.style.height = 'auto'
          target.style.height = `${Math.min(target.scrollHeight, 120)}px`
        }}
      />
      <button
        type="submit"
        disabled={!message.trim() || disabled}
        className="glass-strong rounded-xl px-6 py-3 text-white font-semibold hover:bg-white/20 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent flex items-center justify-center min-w-[80px]"
      >
        {disabled ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          'Send'
        )}
      </button>
    </form>
  )
}

