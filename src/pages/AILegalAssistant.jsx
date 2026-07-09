import VoiceInput from "../components/VoiceInput";
import { useState, useRef, useEffect, useCallback } from 'react'
import {
  Send,
  Bot,
  User,
  Sparkles,
  AlertCircle,
  Mic,
  MicOff,
  Trash2,
} from 'lucide-react'
import Card from '../components/Card'

const WELCOME_MESSAGE = {
  id: 'welcome',
  role: 'assistant',
  content:
    'Namaste! I\'m HAQMarg\'s AI Legal Assistant. Ask me anything about your legal rights — in English or Hindi.\n\nनमस्ते! मैं HAQMarg का AI कानूनी सहायक हूँ। अपने कानूनी अधिकारों के बारे में कुछ भी पूछें।',
  timestamp: Date.now(),
}

const suggestedQuestions = [
  'What are my rights if my husband refuses to pay maintenance?',
  'How do I file a domestic violence complaint?',
  'Can I claim my share in ancestral property?',
  'मेरे पति दहेज की मांग करते हैं, मैं क्या कर सकती हूँ?',
]

function formatTime(timestamp) {
  return new Date(timestamp).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

function createMessage(role, content) {
  return {
    id: crypto.randomUUID(),
    role,
    content,
    timestamp: Date.now(),
  }
}

export default function AILegalAssistant() {
  const [messages, setMessages] = useState([WELCOME_MESSAGE])
  const [input, setInput] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [voiceSupported, setVoiceSupported] = useState(false)
  const [voiceError, setVoiceError] = useState('')

  const bottomRef = useRef(null)
  const inputRef = useRef(null)
  const recognitionRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition
    setVoiceSupported(!!SpeechRecognition)

    if (!SpeechRecognition) return

    const recognition = new SpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = true
    recognition.lang = 'hi-IN'

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join('')
      setInput(transcript)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognition.onerror = (event) => {
      setIsListening(false)
      if (event.error === 'not-allowed') {
        setVoiceError('Microphone access denied. Please allow microphone permission.')
      } else if (event.error !== 'aborted') {
        setVoiceError('Voice input failed. Please try again or type your message.')
      }
    }

    recognitionRef.current = recognition

    return () => {
      recognition.abort()
    }
  }, [])

  const sendMessage = useCallback(
    async (text) => {
      const trimmed = text.trim()
      if (!trimmed) return

      setMessages((prev) => [...prev, createMessage('user', trimmed)])
      const response = await fetch(
  "https://h-a-qmarg-hackathon-project.onrender.com/api/chat",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: trimmed,
    }),
  }
);

const data = await response.json();

setMessages((prev) => [
  ...prev,
  createMessage("assistant", data.reply),
]);
      setInput('')
      setVoiceError('')
      inputRef.current?.focus()
    },
    [],
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    sendMessage(input)
  }

  const toggleVoice = () => {
    setVoiceError('')

    if (!voiceSupported) {
      setVoiceError('Voice input is not supported in this browser.')
      return
    }

    if (isListening) {
      recognitionRef.current?.stop()
      setIsListening(false)
      return
    }

    try {
      recognitionRef.current?.start()
      setIsListening(true)
    } catch {
      setVoiceError('Could not start voice input. Please try again.')
      setIsListening(false)
    }
  }

  const clearHistory = () => {
    setMessages([WELCOME_MESSAGE])
    setInput('')
    setVoiceError('')
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <header className="text-center mb-6 sm:mb-8 animate-slide-up">
        <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-medium mb-4">
          <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
          Guest mode — chats are not saved
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          AI Legal Assistant
        </h1>
        <p className="mt-2 text-gray-500 text-sm sm:text-base">
          Ask about your rights in simple language — Hindi or English
        </p>
      </header>

      <Card
        padding="p-0"
        className="overflow-hidden flex flex-col"
        style={{
          height: 'calc(100dvh - 260px)',
          minHeight: '480px',
          maxHeight: '680px',
        }}
      >
        {/* Chat header */}
        <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-pink-100 bg-white/70">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-full gradient-purple flex items-center justify-center"
              aria-hidden="true"
            >
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">HAQMarg Assistant</p>
              <p className="text-xs text-gray-400">AI not connected yet</p>
            </div>
          </div>
          {messages.length > 1 && (
            <button
              type="button"
              onClick={clearHistory}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              aria-label="Clear chat history"
            >
              <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">Clear chat</span>
            </button>
          )}
        </div>

        {/* Message history */}
        <div
          className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5"
          role="log"
          aria-live="polite"
          aria-relevant="additions"
          aria-label="Chat message history"
        >
          {messages.map((msg) => {
            const isUser = msg.role === 'user'

            return (
              <article
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
                aria-label={`${isUser ? 'You' : 'Assistant'} at ${formatTime(msg.timestamp)}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    isUser
                      ? 'bg-pink-100 text-pink-600'
                      : 'gradient-purple text-white'
                  }`}
                  aria-hidden="true"
                >
                  {isUser ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                </div>

                <div className={`max-w-[85%] sm:max-w-[75%] ${isUser ? 'text-right' : ''}`}>
                  <div
                    className={`inline-block rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line text-left ${
                      isUser
                        ? 'gradient-purple text-white rounded-tr-sm'
                        : 'bg-gray-50 text-gray-700 rounded-tl-sm border border-gray-100'
                    }`}
                  >
                    {msg.content}
                  </div>
                  <time
                    dateTime={new Date(msg.timestamp).toISOString()}
                    className={`block mt-1 text-[10px] text-gray-400 ${isUser ? 'text-right' : ''}`}
                  >
                    {formatTime(msg.timestamp)}
                  </time>
                </div>
              </article>
            )
          })}
          <div ref={bottomRef} />
        </div>

        {/* Input area */}
        <div className="border-t border-pink-100 p-4 bg-white/80">
          {messages.length <= 1 && (
            <div className="flex flex-wrap gap-2 mb-3" role="group" aria-label="Suggested questions">
              {suggestedQuestions.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => sendMessage(q)}
                  className="text-xs px-3 py-1.5 rounded-full bg-primary-50 text-primary-700 hover:bg-primary-100 transition-colors border border-primary-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                >
                  {q.length > 48 ? `${q.slice(0, 48)}…` : q}
                </button>
              ))}
            </div>
          )}

          {voiceError && (
            <p className="mb-3 text-xs text-red-600" role="alert">
              {voiceError}
            </p>
          )}

          <form onSubmit={handleSubmit} className="flex items-end gap-2">
            <div className="flex-1 relative">
              <label htmlFor="chat-input" className="sr-only">
                Type your legal question
              </label>
              <textarea
                id="chat-input"
                ref={inputRef}
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSubmit(e)
                  }
                }}
                placeholder="Type your question… / अपना सवाल लिखें…"
                className="w-full px-4 py-3 pr-4 rounded-xl border border-pink-200 bg-white text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow min-h-[48px] max-h-32"
                aria-describedby="chat-input-hint"
              />
              <p id="chat-input-hint" className="sr-only">
                Press Enter to send, Shift+Enter for a new line
              </p>
            </div>

            <button
              type="button"
              onClick={toggleVoice}
              disabled={!voiceSupported}
              className={`p-3 rounded-xl border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 shrink-0 ${
                isListening
                  ? 'bg-red-50 border-red-200 text-red-600 motion-safe:animate-pulse'
                  : 'bg-white border-pink-200 text-primary-600 hover:bg-primary-50 disabled:opacity-40 disabled:cursor-not-allowed'
              }`}
              aria-label={
                isListening
                  ? 'Stop voice input'
                  : voiceSupported
                    ? 'Start voice input'
                    : 'Voice input not supported'
              }
              aria-pressed={isListening}
              title={
                voiceSupported
                  ? isListening
                    ? 'Listening… click to stop'
                    : 'Speak your question'
                  : 'Voice not supported in this browser'
              }
            >
              {isListening ? (
                <MicOff className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Mic className="w-5 h-5" aria-hidden="true" />
              )}
            </button>

            <button
              type="submit"
              disabled={!input.trim()}
              className="p-3 rounded-xl gradient-purple text-white disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 shrink-0"
              aria-label="Send message"
            >
              <Send className="w-5 h-5" aria-hidden="true" />
            </button>
          </form>

          {isListening && (
            <p className="mt-2 text-xs text-primary-600 flex items-center gap-1.5" role="status">
              <span className="w-2 h-2 rounded-full bg-red-500 motion-safe:animate-pulse" aria-hidden="true" />
              Listening… speak now
            </p>
          )}
        </div>
      </Card>

      <p className="mt-4 flex items-start gap-2 text-xs text-gray-400">
        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
        <span>
          HAQMarg provides general legal information, not professional legal advice.
          AI responses are not connected yet — messages are stored only for this session.
        </span>
      </p>
    </div>
  )
}
