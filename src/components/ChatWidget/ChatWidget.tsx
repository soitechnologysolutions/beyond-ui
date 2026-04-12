import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { Button } from "../Button";
import { Input } from "../Input";
import { Card, CardHeader, CardTitle, CardContent } from "../Card";
import { Avatar, AvatarFallback } from "../Avatar";

const chatWidgetVariants = cva(
  "z-50 flex flex-col transition-all duration-300 ease-in-out",
  {
    variants: {
      position: {
        "bottom-right": "bottom-4 right-4 items-end",
        "bottom-left": "bottom-4 left-4 items-start",
      },
      strategy: {
        fixed: "fixed",
        absolute: "absolute",
      },
    },
    defaultVariants: {
      position: "bottom-right",
      strategy: "fixed",
    },
  }
);

export interface Message {
  id: string;
  content: string;
  sender: "user" | "agent" | "ai";
  timestamp: Date;
}

export interface ChatWidgetProps extends VariantProps<typeof chatWidgetVariants> {
  className?: string;
  title?: string;
  subtitle?: string;
  greeting?: string;
  onSendMessage?: (message: string) => Promise<void> | void;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({
  className,
  position,
  strategy,
  title = "Support",
  subtitle = "We typically reply in a few minutes",
  greeting = "Hello! How can we help you today?",
  onSendMessage,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    { id: "1", content: greeting, sender: "ai", timestamp: new Date() },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen, messages, isTyping]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue("");
    setIsTyping(true);

    if (onSendMessage) {
      await onSendMessage(newUserMessage.content);
      setIsTyping(false);
    } else {
      // Default fallback mock response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            content: "Thanks for reaching out! A representative will be with you shortly.",
            sender: "ai",
            timestamp: new Date(),
          },
        ]);
        setIsTyping(false);
      }, 1500);
    }
  };

  return (
    <div className={cn(chatWidgetVariants({ position, strategy }), className)}>
      {/* Chat Window */}
      {isOpen && (
        <Card className="w-80 sm:w-96 h-[32rem] mb-4 flex flex-col shadow-2xl border-gray-200 dark:border-gray-800 animate-in slide-in-from-bottom-4 fade-in overflow-hidden">
          <CardHeader className="bg-primary-600 dark:bg-primary-700 text-white p-4 flex flex-row items-center justify-between rounded-none rounded-t-lg">
            <div className="flex items-center space-x-3">
              <Avatar size="sm" className="border border-white/20">
                <AvatarFallback className="bg-primary-800 text-white">
                  <Bot size={16} />
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-white text-base font-semibold">{title}</CardTitle>
                <p className="text-primary-100 text-xs font-normal">{subtitle}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-primary-800 hover:text-white rounded-full p-2 h-8 w-8"
              onClick={() => setIsOpen(false)}
            >
              <X size={16} />
            </Button>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900/50">
            {messages.map((msg) => {
              const isUser = msg.sender === "user";
              return (
                <div key={msg.id} className={cn("flex", isUser ? "justify-end" : "justify-start")}>
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm",
                      isUser
                        ? "bg-primary-600 text-white rounded-tr-sm"
                        : "bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-tl-sm shadow-sm"
                    )}
                  >
                    {msg.content}
                  </div>
                </div>
              );
            })}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl rounded-tl-sm px-4 py-3.5 shadow-sm flex space-x-1.5 items-center">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>

          <div className="p-3 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center space-x-2">
              <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Type your message..." className="flex-1" />
              <Button type="submit" variant="primary" size="sm" disabled={!inputValue.trim()} className="h-10 w-10 p-0 rounded-full flex-shrink-0">
                <Send size={16} className="ml-1" />
              </Button>
            </form>
          </div>
        </Card>
      )}

      {/* Floating Toggle Button */}
      <Button onClick={() => setIsOpen(!isOpen)} className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl bg-primary-600 hover:bg-primary-700 text-white transition-transform hover:scale-105 flex items-center justify-center p-0">
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </Button>
    </div>
  );
};