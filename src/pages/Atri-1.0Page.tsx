import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, Bell, History, Paperclip, Mic, Send } from "lucide-react";
import { HistorySidebar } from "@/components/HistorySidebar";
import { motion } from "framer-motion";
import { _POST } from "@/api";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface ChatMessage {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Atri10Page = () => {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isEnglish, setIsEnglish] = useState(true);

  const toggleHistory = () => {
    setIsHistoryOpen(!isHistoryOpen);
  };

  const handleSendMessage = async () => {
    if (message.trim()) {
      const userMessage: ChatMessage = {
        id: Date.now(),
        text: message.trim(),
        sender: 'user',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, userMessage]);

      try {
        const apiUrl = isEnglish 
          ? import.meta.env.VITE_ATRI_1_0_ENGLISH_URI 
          : import.meta.env.VITE_ATRI_1_0_VIETNAMESE_URI;

        const response = await _POST(apiUrl, { message });
        const botMessage: ChatMessage = {
          id: Date.now() + 1,
          text: response.response || 'No response',
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
      } catch (error) {
        console.error("Error sending message:", error);
      }
      setMessage("");
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex h-[calc(100vh-2rem)] bg-background"
    >
      {/* Main Chat Area */}
      <motion.div 
        initial={{ x: -20 }}
        animate={{ x: 0 }}
        transition={{ delay: 0.2 }}
        className="flex-1 flex flex-col"
      >
        {/* Chat Header */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="h-16 flex items-center justify-between px-4"
        >
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold">Atri Chatbot</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className={`px-3 py-1 rounded-lg ${
                isEnglish 
                  ? 'bg-color-primary text-white' 
                  : 'bg-search-background'
              }`}
              onClick={() => setIsEnglish(true)}
            >
              EN
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className={`px-3 py-1 rounded-lg ${
                !isEnglish 
                  ? 'bg-color-primary text-white' 
                  : 'bg-search-background'
              }`}
              onClick={() => setIsEnglish(false)}
            >
              VI
            </motion.button>
          </div>
          
          <div className="flex items-center gap-4">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="relative w-64"
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search conversation..."
                className="pl-10 bg-search-background hover:bg-search-hover active:bg-search-active placeholder:text-search-placeholder focus:outline-none focus:ring-0 focus-visible:ring-0"
              />
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="flex items-center gap-2 p-2 rounded-lg bg-search-background hover:bg-search-hover"
            >
              <Bell className="h-5 w-5" />
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="flex items-center gap-2 p-2 rounded-lg bg-search-background hover:bg-search-hover"
              onClick={toggleHistory}
            >
              <History className="h-5 w-5" />
            </motion.div>
          </div>
        </motion.div>

        {/* Chat Messages Area */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex-1 overflow-y-auto p-4 space-y-4"
        >
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} items-start gap-2`}
            >
              {msg.sender === 'bot' && (
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/src/assets/avatars/atri-avatar.png" alt="Atri" />
                </Avatar>
              )}
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  msg.sender === 'user'
                    ? 'bg-color-primary text-white'
                    : 'bg-search-background'
                }`}
              >
                <p>{msg.text}</p>
                <span className="text-xs opacity-70">
                  {msg.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Chat Input Area */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="border-t p-4"
        >
          <div className="flex items-center gap-3">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="flex items-center gap-2 p-2 rounded-lg bg-search-background hover:bg-search-hover"
            >
              <Paperclip className="h-5 w-5" />
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="flex items-center gap-2 p-2 rounded-lg bg-search-background hover:bg-search-hover"
            >
              <Mic className="h-5 w-5" />
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex-1"
            >
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={isEnglish ? "Type your message..." : "Nhập tin nhắn của bạn..."}
                className="w-full bg-search-background hover:bg-search-hover active:bg-search-active placeholder:text-search-placeholder"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 p-2 rounded-lg bg-color-primary hover:bg-color-primary-hover cursor-pointer"
              onClick={handleSendMessage}
            >
              <Send className="h-5 w-5" />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* History Sidebar */}
      <HistorySidebar isOpen={isHistoryOpen} onClose={() => setIsHistoryOpen(false)} />
    </motion.div>
  );
};

export default Atri10Page;