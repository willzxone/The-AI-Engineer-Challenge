'use client'

import { useState, useRef, useEffect } from 'react'
import ChatInterface from '@/components/ChatInterface'
import ApiKeyInput from '@/components/ApiKeyInput'

export default function Home() {
  const [apiKey, setApiKey] = useState<string>('')
  const [isApiKeySet, setIsApiKeySet] = useState<boolean>(false)

  useEffect(() => {
    // Check if API key is stored in localStorage
    const storedKey = localStorage.getItem('openai_api_key')
    if (storedKey) {
      setApiKey(storedKey)
      setIsApiKeySet(true)
    }
  }, [])

  const handleApiKeySubmit = (key: string) => {
    setApiKey(key)
    setIsApiKeySet(true)
    localStorage.setItem('openai_api_key', key)
  }

  const handleApiKeyChange = () => {
    setIsApiKeySet(false)
    setApiKey('')
    localStorage.removeItem('openai_api_key')
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 p-4 md:p-8">
      {/* Animated background gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-blue-600/20 animate-pulse pointer-events-none" />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header with glassmorphism */}
        <header className="glass rounded-2xl p-6 mb-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
            AI Engineer Challenge
          </h1>
          <p className="text-white/90 text-lg">
            Beautiful Glassmorphism Chat Interface
          </p>
        </header>

        {/* Main content area */}
        {!isApiKeySet ? (
          <ApiKeyInput onSubmit={handleApiKeySubmit} />
        ) : (
          <div className="space-y-4">
            <div className="glass rounded-2xl p-4 flex justify-between items-center">
              <p className="text-white/90">API Key configured</p>
              <button
                onClick={handleApiKeyChange}
                className="glass-strong px-4 py-2 rounded-xl text-white hover:bg-white/20 transition-all duration-300 text-sm font-medium"
              >
                Change API Key
              </button>
            </div>
            <ChatInterface apiKey={apiKey} />
          </div>
        )}
      </div>
    </main>
  )
}

