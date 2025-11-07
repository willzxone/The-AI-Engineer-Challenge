# 🎨 AI Engineer Challenge Frontend

A stunning **Next.js** frontend with **glassmorphism** design that connects to your FastAPI backend! This beautiful chat interface uses Tailwind CSS to create that gorgeous frosted glass effect you've been dreaming about. ✨

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ (we recommend using the latest LTS version)
- **npm** or **yarn** (comes with Node.js)
- Your FastAPI backend running on `http://localhost:8000` (or configure it differently)

### Installation

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   
   Or if you prefer yarn:
   ```bash
   yarn install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   
   Or with yarn:
   ```bash
   yarn dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) and prepare to be amazed! 🎉

## 🎨 Features

- **Glassmorphism Design**: Beautiful frosted glass UI with backdrop blur effects
- **Streaming Chat**: Real-time streaming responses from the OpenAI API
- **Responsive**: Works beautifully on desktop, tablet, and mobile devices
- **TypeScript**: Fully typed for a better developer experience
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Local Storage**: Your API key is stored locally (never sent to our servers)

## 🛠️ Configuration

### API URL Configuration

By default, the frontend connects to `http://localhost:8000` for the FastAPI backend. If your backend runs on a different URL, you can:

1. **Set an environment variable:**
   Create a `.env.local` file in the `frontend` directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

2. **Or modify `next.config.js`:**
   Update the `rewrites` configuration to point to your backend URL.

## 📦 Available Scripts

- `npm run dev` - Start the development server (with hot reload)
- `npm run build` - Build the production-ready app
- `npm run start` - Start the production server (run `build` first!)
- `npm run lint` - Run ESLint to check for code issues

## 🎯 How It Works

1. **Enter Your API Key**: When you first load the app, you'll be prompted to enter your OpenAI API key. Don't worry - it's stored locally in your browser!

2. **Set System Message**: Customize the AI's behavior with a developer/system message (optional, defaults to "You are a helpful AI assistant.")

3. **Start Chatting**: Type your message and hit Enter (or click Send). Watch as the AI streams its response in real-time!

4. **Clear Chat**: Want to start fresh? Click the "Clear Chat" button to reset the conversation.

## 🏗️ Project Structure

```
frontend/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Main page component
│   └── globals.css        # Global styles with glassmorphism utilities
├── components/            # React components
│   ├── ApiKeyInput.tsx    # API key input form
│   ├── ChatInterface.tsx  # Main chat interface
│   ├── ChatInput.tsx      # Message input component
│   └── MessageBubble.tsx  # Individual message bubbles
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── next.config.js         # Next.js configuration
```

## 🎨 Glassmorphism Magic

This frontend uses custom glassmorphism utilities defined in `globals.css`:

- `.glass` - Standard glass effect with subtle blur
- `.glass-dark` - Darker glass variant
- `.glass-strong` - Stronger blur for emphasis

All components use Tailwind classes combined with these custom utilities to create that beautiful frosted glass aesthetic!

## 🚢 Deployment

This frontend is ready to deploy on **Vercel**! Just:

1. Push your code to GitHub
2. Import your repository in Vercel
3. Vercel will automatically detect Next.js and configure everything
4. Make sure to set `NEXT_PUBLIC_API_URL` in Vercel's environment variables if your backend is hosted elsewhere

## 🐛 Troubleshooting

**Can't connect to the backend?**
- Make sure your FastAPI backend is running on `http://localhost:8000`
- Check that CORS is properly configured in your FastAPI app
- Verify the API URL in `next.config.js` or `.env.local`

**API key not working?**
- Make sure your API key starts with `sk-`
- Check that you have credits in your OpenAI account
- Verify the API key is correct (you can test it in the OpenAI playground)

**Styling looks off?**
- Make sure Tailwind CSS is properly installed (`npm install`)
- Clear your browser cache and hard refresh (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)

## 🎉 Have Fun!

This is your frontend - make it your own! Customize the colors, add new features, experiment with different glassmorphism effects. The sky's the limit! 🚀

---

Built with ❤️ using Next.js, Tailwind CSS, and lots of glassmorphism magic! ✨
