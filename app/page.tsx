'use client';

import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    const bot = JSON.parse(localStorage.getItem("selectedBot") || "{}");
    const systemPrompt = bot.system_prompt || "You are a helpful assistant.";

    setMessages([...messages, userMsg]);
    setInput('');
    setLoading(true);

    const res = await fetch(process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: input, system_prompt: systemPrompt }),
    });

    const data = await res.json();
    setMessages([...messages, userMsg, { role: "ai", text: data.response }]);
    setLoading(false);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">NoLimitsAI</h1>
      <div className="space-y-4">
        {messages.map((msg, idx) => (
          <Card key={idx} className={msg.role === "user" ? "bg-gray-100" : "bg-blue-100"}>
            <CardContent className="p-2">
              <strong>{msg.role === "user" ? "You" : "AI Bot"}</strong>: {msg.text}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type your message..."
        />
        <Button onClick={sendMessage} disabled={loading}>
          Send
        </Button>
      </div>
    </div>
  );
}
