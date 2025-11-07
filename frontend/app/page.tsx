'use client'

import ChatInterface from '@/components/ChatInterface'

export default function Home() {
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
        <ChatInterface />
      </div>
    </main>
  )
}

