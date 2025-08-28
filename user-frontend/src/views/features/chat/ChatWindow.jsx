import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import ChatFooter from "./ChatFooter"

export default function ChatWindow() {
    const [messages, setMessages] = useState([
        { id: 1, text: "Hey, how are you?", sender: "other" },
        { id: 2, text: "I’m good! How about you?", sender: "me" },
    ])
    const [input, setInput] = useState("")

    const sendMessage = () => {
        if (!input.trim()) return
        setMessages([...messages, { id: Date.now(), text: input, sender: "me" }])
        setInput("")
    }

    return (
        <Card className="w-full max-w-md mx-auto flex flex-col h-[730px] rounded-2xl shadow-lg">
            {/* Chat Messages */}
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                    >
                        <div
                            className={`px-4 py-2 rounded-2xl max-w-[70%] text-sm shadow 
                ${msg.sender === "me"
                                    ? "bg-primary text-primary-foreground rounded-br-none"
                                    : "bg-gray-200 text-gray-900 rounded-bl-none"}`}
                        >
                            {msg.text}
                        </div>
                    </div>
                ))}
            </CardContent>

            {/* Input Area */}
        </Card>
    )
}