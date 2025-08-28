import { memo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const ChatWindow = () => {
  const [messages, setMessages] = useState([
    { id: 2, text: " How about you?", sender: "U" },
    { id: 1, text: "I’m good! How about you?", sender: "me" },
  ])
  const [input, setInput] = useState("")

  const sendMessage = () => {
    if (!input.trim()) return
    setMessages([...messages, { id: Date.now(), text: input, sender: "me" }])
    setInput("")
  }

  return (
    <div className="w-full flex flex-col h-[700px] rounded-2xl shadow-lg">
      {/* Chat Messages */}
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-end ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
          >
            {/* Avatar on left if NOT me */}
            {msg.sender !== "me" && (
              <Avatar className="w-8 h-8 mr-2">
                <AvatarImage src="/other-user.png" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            )}

            {/* Message bubble */}
            <div
              className={`px-4 py-2 rounded-2xl max-w-[70%] text-sm shadow 
          ${msg.sender === "me"
                  ? "bg-primary text-primary-foreground rounded-br-none"
                  : "bg-gray-200 text-gray-900 rounded-bl-none"}`}
            >
              {msg.text}
            </div>

            {/* Avatar on right if me */}
            {msg.sender === "me" && (
              <Avatar className="w-8 h-8 ml-2">
                <AvatarImage src="/my-user.png" alt="Me" />
                <AvatarFallback>Me</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
      </CardContent>

      {/* Input Area */}
    </div>
  )
}

export default memo(ChatWindow);