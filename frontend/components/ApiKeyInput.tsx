'use client'

import { useState } from 'react'

interface ApiKeyInputProps {
  onSubmit: (apiKey: string) => void
}

export default function ApiKeyInput({ onSubmit }: ApiKeyInputProps) {
  const [apiKey, setApiKey] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!apiKey.trim()) {
      setError('Please enter your OpenAI API key')
      return
    }

    if (!apiKey.startsWith('sk-')) {
      setError('Invalid API key format. OpenAI API keys start with "sk-"')
      return
    }

    setError('')
    onSubmit(apiKey)
  }

  return (
    <div className="glass-strong rounded-2xl p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-white mb-4 text-center">
        Enter Your OpenAI API Key
      </h2>
      <p className="text-white/80 text-sm mb-6 text-center">
        Your API key is stored locally and never sent to our servers
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => {
              setApiKey(e.target.value)
              setError('')
            }}
            placeholder="sk-..."
            className="w-full glass rounded-xl px-4 py-3 text-white placeholder-white/50 border border-white/20 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300"
          />
          {error && (
            <p className="text-red-300 text-sm mt-2">{error}</p>
          )}
        </div>
        
        <button
          type="submit"
          className="w-full glass-strong rounded-xl px-6 py-3 text-white font-semibold hover:bg-white/20 active:scale-95 transition-all duration-300 shadow-lg"
        >
          Continue
        </button>
      </form>
      
      <p className="text-white/60 text-xs mt-4 text-center">
        Get your API key from{' '}
        <a
          href="https://platform.openai.com/api-keys"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/90 hover:text-white underline"
        >
          OpenAI Platform
        </a>
      </p>
    </div>
  )
}

