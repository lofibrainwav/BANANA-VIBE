import React from 'react';
import Navbar from '@/components/layout/Navbar';
import WaveBackground from '@/components/ui/WaveBackground';

export default function GeminiAIChat() {
  // 실제 구현에서는 Gemini AI API와 연동하여 채팅 기능 구현
  const [messages, setMessages] = React.useState([
    { role: 'assistant', content: '안녕하세요! 바이브 코딩 어시스턴트입니다. 무엇을 도와드릴까요?' },
  ]);
  const [input, setInput] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // 사용자 메시지 추가
    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);
    
    // 실제 구현에서는 Gemini AI API 호출
    // 현재는 시뮬레이션
    setTimeout(() => {
      const aiResponse = { 
        role: 'assistant', 
        content: `${input}에 대한 답변입니다. 바이브 코딩 시스템에서는 이 기능을 다음과 같이 활용할 수 있습니다. 더 자세한 정보가 필요하시면 알려주세요.` 
      };
      setMessages(prev => [...prev, aiResponse]);
      setLoading(false);
    }, 1000);
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className="flex items-start">
            {message.role === 'assistant' ? (
              <>
                <div className="w-8 h-8 rounded-full bg-neon-purple/20 flex items-center justify-center mr-2 flex-shrink-0">
                  <span className="text-neon-purple text-xs">AI</span>
                </div>
                <div className="bg-bg-dark-secondary p-3 rounded-lg rounded-tl-none text-sm text-neutral-light max-w-[80%]">
                  {message.content}
                </div>
              </>
            ) : (
              <>
                <div className="w-8 h-8 rounded-full bg-neon-blue/20 flex items-center justify-center mr-2 flex-shrink-0">
                  <span className="text-neon-blue text-xs">You</span>
                </div>
                <div className="bg-bg-dark p-3 rounded-lg rounded-tl-none text-sm text-neutral-light max-w-[80%]">
                  {message.content}
                </div>
              </>
            )}
          </div>
        ))}
        
        {loading && (
          <div className="flex items-start">
            <div className="w-8 h-8 rounded-full bg-neon-purple/20 flex items-center justify-center mr-2 flex-shrink-0">
              <span className="text-neon-purple text-xs">AI</span>
            </div>
            <div className="bg-bg-dark-secondary p-3 rounded-lg rounded-tl-none text-sm text-neutral-light">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-neon-purple rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-neon-purple rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-neon-purple rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-800">
        <div className="flex">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-bg-dark border border-gray-700 rounded-l-lg p-2 text-neutral-light focus:outline-none focus:ring-2 focus:ring-neon-purple"
            placeholder="질문을 입력하세요..."
          />
          <button 
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-neon-purple/20 border border-neon-purple rounded-r-lg px-4 text-neutral-light disabled:opacity-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}
