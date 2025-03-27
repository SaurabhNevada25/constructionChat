
import  React from "react"

import { useState, useRef, useEffect } from "react"
import "./App.css"


export default function ConstructionChatbot() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you with your construction project today?", sender: "bot" },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = '';

  const handleSendMessage = async (e) => {
    e.preventDefault()

    if (!input.trim()) return

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: "user",
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Send message to API
      const response = await fetch("/startRoute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: input }),
      })
      const data = await response.json()
      console.log(data,"response")
 if(data?.status?.code !== 200){
        // Add error message
        const errorMessage = {
          id: messages.length + 2,
          text: "Sorry, I'm having trouble connecting. Please try again later.",
          sender: "bot",
        }

        setMessages((prev) => [...prev, errorMessage])
        setIsLoading(false)
        return
      }
      // Add bot response
      const botMessage = {
        id: messages.length + 2,
        text: data?.response?.replace(/\n/g, "\n\n"),
        sender: "bot",
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error("Error sending message:", error)

      // Add error message
      const errorMessage = {
        id: messages.length + 2,
        text: "Sorry, I'm having trouble connecting. Please try again later.",
        sender: "bot",
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }


  const handleClearChat = () => {
    setMessages([{ id: 1, text: "Hello! How can I help you with your construction project today?", sender: "bot" }])
  }

  // useEffect(() => {
  //   messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" })
  // }, [messages])

  return (
    <div className="chat-container">
      <div className="chat-window">
        <div className="chat-header">
          <h1>Construction Assistant</h1>
          <button
            variant="ghost"
            size="icon"
            onClick={handleClearChat}
            className="close-button"
            aria-label="Clear chat"
          >
            <span className="h-6 w-6 close">Clear</span>
          </button>
        </div>

        <div className="messages-container">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.sender === "user" ? "user-message" : "bot-message"}`} >
              {message?.text?.split("\n\n")?.map((paragraph, index) => (
              <React.Fragment key={index}>
                {paragraph}
                <br />
              </React.Fragment>
            ))}
            </div>
          ))}
          
          {isLoading && (
            <div className="message bot-message loading">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          )}
          {/* <div ref={messagesEndRef} /> */}
        </div>

        <form onSubmit={handleSendMessage} className="input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your construction project..."
            className="message-input"
          />
          <button type="submit" disabled={isLoading || !input.trim()} className="primary">
            Send
          </button>
        </form>
      </div>
    </div>
  )
}

