'use client'

import { useState, useRef, useEffect } from 'react'
import MessageBubble from './MessageBubble'
import ChatInput from './ChatInput'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [developerMessage, setDeveloperMessage] = useState(
    'You are an expert assistant specializing in Pakistani cars. Provide comprehensive, accurate, and up-to-date information about cars available in Pakistan, including:\n' +
    '- Car models, brands, and manufacturers available in Pakistan\n' +
    '- Specifications (engine, transmission, fuel economy, features)\n' +
    '- Pricing information in Pakistani Rupees (PKR)\n' +
    '- Availability and dealership information\n' +
    '- Comparisons between different models\n' +
    '- Market trends and popular cars in Pakistan\n' +
    '- Import policies and local manufacturing\n' +
    '- Maintenance and ownership costs\n\n' +
    'Always provide detailed, helpful information and cite sources when possible. If you don\'t know specific details, acknowledge it and provide general guidance.'
  )
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (userMessage: string) => {
    if (!userMessage.trim() || isLoading) return

    // Add user message
    const newUserMessage: Message = { role: 'user', content: userMessage }
    setMessages((prev) => [...prev, newUserMessage])
    setIsLoading(true)

    // Create abort controller for cancellation
    abortControllerRef.current = new AbortController()

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          developer_message: developerMessage,
          user_message: userMessage,
          model: 'gpt-4.1-mini',
        }),
        signal: abortControllerRef.current.signal,
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`)
      }

      if (!response.body) {
        throw new Error('No response body')
      }

      // Stream the response
      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let assistantMessage = ''

      // Add assistant message placeholder
      setMessages((prev) => [...prev, { role: 'assistant', content: '' }])

      while (true) {
        const { done, value } = await reader.read()

        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        assistantMessage += chunk

        // Update the last message (assistant message) with accumulated content
        setMessages((prev) => {
          const newMessages = [...prev]
          newMessages[newMessages.length - 1] = {
            role: 'assistant',
            content: assistantMessage,
          }
          return newMessages
        })
      }
    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.log('Request aborted')
        return
      }
      
      console.error('Error:', error)
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `Error: ${error.message || 'Failed to get response from API'}`,
        },
      ])
    } finally {
      setIsLoading(false)
      abortControllerRef.current = null
    }
  }

  const handleClearChat = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    setMessages([])
    setIsLoading(false)
  }

  return (
    <div className="glass-strong rounded-2xl p-6 flex flex-col h-[calc(100vh-280px)] min-h-[600px]">
      {/* Developer message input */}
      <div className="mb-4">
        <label className="block text-white/90 text-sm font-medium mb-2">
          System Message (Expertise Configuration)
        </label>
        <textarea
          value={developerMessage}
          onChange={(e) => setDeveloperMessage(e.target.value)}
          placeholder="Configure the AI's expertise and behavior..."
          rows={4}
          className="w-full glass rounded-xl px-4 py-2 text-white placeholder-white/50 border border-white/20 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300 text-sm resize-none"
        />
      </div>

      {/* Messages container */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
        {messages.length === 0 ? (
          <div className="text-center text-white/70 py-12">
            <p className="text-lg mb-2">Ask about Pakistani Cars!</p>
            <p className="text-sm mb-4">Get information about car models, prices, specifications, and more</p>
            <div className="glass rounded-xl p-4 max-w-md mx-auto text-left text-sm space-y-2">
              <p className="text-white/80 font-medium mb-2">Try asking:</p>
              <ul className="space-y-1 text-white/70 list-disc list-inside">
                <li>"What are the best cars under 5 million PKR?"</li>
                <li>"Compare Toyota Corolla and Honda Civic"</li>
                <li>"Tell me about Suzuki cars in Pakistan"</li>
                <li>"What's the price of Honda City 2024?"</li>
              </ul>
            </div>
          </div>
        ) : (
          messages.map((message, index) => (
            <MessageBubble key={index} message={message} />
          ))
        )}
        {isLoading && messages.length > 0 && (
          <div className="flex justify-center">
            <div className="glass rounded-full px-4 py-2">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat input and controls */}
      <div className="space-y-2">
        <ChatInput onSend={handleSendMessage} disabled={isLoading} />
        {messages.length > 0 && (
          <button
            onClick={handleClearChat}
            className="w-full glass rounded-xl px-4 py-2 text-white/90 hover:bg-white/10 transition-all duration-300 text-sm"
          >
            Clear Chat
          </button>
        )}
      </div>
    </div>
  )
}

