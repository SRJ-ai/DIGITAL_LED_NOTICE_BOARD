import React, { useState } from 'react';
import { MatrixPreset, HistoryItem } from '../types';
import { generateMatrixContent } from '../services/geminiService';

interface ControlCenterProps {
  connected: boolean;
  onSendMessage: (msg: string) => Promise<void>;
  history: HistoryItem[];
}

const presets: MatrixPreset[] = [
  { name: 'ON', payload: 'ON', icon: 'fa-power-off', color: 'text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/10' },
  { name: 'OFF', payload: 'OFF', icon: 'fa-power-off', color: 'text-red-400 border-red-500/30 hover:bg-red-500/10' },
  { name: 'HELLO', payload: 'Hello World', icon: 'fa-hand-wave', color: 'text-amber-400 border-amber-500/30 hover:bg-amber-500/10' },
  { name: 'TIME', payload: 'SHOW_TIME', icon: 'fa-clock', color: 'text-blue-400 border-blue-500/30 hover:bg-blue-500/10' },
];

const ControlCenter: React.FC<ControlCenterProps> = ({ connected, onSendMessage, history }) => {
  const [message, setMessage] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [activeTab, setActiveTab] = useState<'manual' | 'ai' | 'history'>('manual');
  const [displayType, setDisplayType] = useState<'scrolling' | 'static'>('scrolling');
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('gemini_api_key') || '');
  const [tempApiKey, setTempApiKey] = useState('');
  const [isEditingKey, setIsEditingKey] = useState(!localStorage.getItem('gemini_api_key'));

  const handleSaveKey = () => {
    if (tempApiKey.trim()) {
      localStorage.setItem('gemini_api_key', tempApiKey.trim());
      setApiKey(tempApiKey.trim());
      setIsEditingKey(false);
      setTempApiKey('');
    }
  };

  const handleClearKey = () => {
    localStorage.removeItem('gemini_api_key');
    setApiKey('');
    setIsEditingKey(true);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setIsSending(true);
    await onSendMessage(message);
    setIsSending(false);
    setMessage('');
  };

  const handleAiGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;

    setIsGenerating(true);
    try {
      const generated = await generateMatrixContent(aiPrompt, displayType, apiKey);
      await onSendMessage(generated);
      setMessage(generated); // Also set it in input for visibility
    } catch (error) {
      console.error("AI Gen Error", error);
      alert("Could not generate AI message. Check API Key.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-0 shadow-2xl overflow-hidden flex flex-col h-full">
      {/* Tabs */}
      <div className="flex border-b border-white/10 bg-white/5">
        <button
          onClick={() => setActiveTab('manual')}
          className={`flex-1 py-4 px-2 text-xs sm:text-sm font-semibold transition-all duration-300 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2
            ${activeTab === 'manual' ? 'bg-white/10 text-white border-b-2 border-white' : 'text-white/50 hover:text-white hover:bg-white/5'}`}
        >
          <i className="fa-solid fa-keyboard text-sm sm:text-base"></i>
          <span className="truncate">Manual</span>
        </button>
        <button
          onClick={() => setActiveTab('ai')}
          className={`flex-1 py-4 px-2 text-xs sm:text-sm font-semibold transition-all duration-300 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2
            ${activeTab === 'ai' ? 'bg-white/10 text-white border-b-2 border-white' : 'text-white/50 hover:text-white hover:bg-white/5'}`}
        >
          <i className="fa-solid fa-wand-magic-sparkles text-sm sm:text-base"></i>
          <span className="truncate">AI Gen</span>
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-4 px-2 text-xs sm:text-sm font-semibold transition-all duration-300 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2
            ${activeTab === 'history' ? 'bg-white/10 text-white border-b-2 border-white' : 'text-white/50 hover:text-white hover:bg-white/5'}`}
        >
          <i className="fa-solid fa-clock-rotate-left text-sm sm:text-base"></i>
          <span className="truncate">History</span>
        </button>
      </div>

      <div className="p-6 sm:p-8 flex-grow flex flex-col overflow-hidden">
        {activeTab === 'manual' && (
          <form onSubmit={handleSend} className="flex flex-col gap-5 h-full">
            <div>
              <label className="block text-xs text-white/40 mb-2 uppercase font-bold tracking-widest">Message Payload</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={!connected}
                placeholder="Enter text to display on LED Matrix..."
                className="w-full h-32 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all resize-none disabled:opacity-50 placeholder-white/30 font-mono"
              />
            </div>
            
            <button
              type="submit"
              disabled={!connected || !message.trim() || isSending}
              className="w-full py-3.5 bg-white text-black hover:bg-white/90 rounded-full font-semibold tracking-wide shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSending ? (
                <><i className="fa-solid fa-circle-notch fa-spin mr-2.5"></i> Sending...</>
              ) : (
                <>Send to Matrix <i className="fa-solid fa-paper-plane ml-2.5"></i></>
              )}
            </button>

            {/* Quick Actions */}
            <div className="mt-auto pt-6 border-t border-white/10">
              <h3 className="text-xs text-white/40 uppercase font-bold tracking-widest mb-4">Quick Presets</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {presets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => onSendMessage(preset.payload)}
                    disabled={!connected}
                    type="button"
                    className={`p-3 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex flex-col items-center justify-center gap-2 group ${preset.color}`}
                  >
                    <i className={`fa-solid ${preset.icon} text-lg mb-1`}></i>
                    <span className="text-xs font-semibold">{preset.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </form>
        )}

        {activeTab === 'ai' && (
          <div className="flex flex-col gap-5 h-full">
             <div className="bg-white/5 border border-white/10 p-4 rounded-2xl shrink-0">
                <p className="text-xs text-white/70 leading-relaxed">
                  <i className="fa-solid fa-circle-info mr-1.5 text-white/40"></i>
                  Describe what you want to say (e.g., "Cheer up my friend Bob"), and AI will format it for the LED display.
                </p>
             </div>

             {isEditingKey ? (
               <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                 <label className="block text-xs text-white/40 mb-3 uppercase font-bold tracking-widest">
                   Gemini API Key Required
                 </label>
                 <div className="text-xs text-white/60 mb-5 space-y-3">
                   <p>To use the AI generator, please provide your own free Gemini API key. It will be stored securely in your browser's local storage.</p>
                   <div className="bg-white/5 p-4 rounded-xl border border-white/10 mt-3">
                     <p className="font-semibold text-white/80 mb-2">How to get a free API key:</p>
                     <ol className="list-decimal list-inside space-y-1.5 ml-1">
                       <li>Go to <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">Google AI Studio</a></li>
                       <li>Sign in with your Google account</li>
                       <li>Click <strong>"Create API key"</strong></li>
                       <li>Copy the key and paste it below</li>
                     </ol>
                   </div>
                 </div>
                 <div className="flex gap-3">
                   <input
                     type="password"
                     value={tempApiKey}
                     onChange={(e) => setTempApiKey(e.target.value)}
                     placeholder="AIzaSy..."
                     className="flex-grow bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
                   />
                   <button
                     onClick={handleSaveKey}
                     disabled={!tempApiKey.trim()}
                     className="px-6 py-3 bg-white text-black hover:bg-white/90 rounded-full text-sm font-semibold transition-all disabled:opacity-50 active:scale-[0.98]"
                   >
                     Save
                   </button>
                 </div>
               </div>
             ) : (
               <form onSubmit={handleAiGenerate} className="flex flex-col gap-5 flex-grow">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium text-white/70"><i className="fa-solid fa-check-circle mr-1.5 text-white/40"></i> API Key Saved</span>
                    <button type="button" onClick={handleClearKey} className="text-xs font-medium text-white/40 hover:text-white transition-colors">Clear Key</button>
                  </div>
                  <div>
                    <label className="block text-xs text-white/40 mb-2 uppercase font-bold tracking-widest">Display Type</label>
                    <div className="relative">
                      <select
                        value={displayType}
                        onChange={(e) => setDisplayType(e.target.value as 'scrolling' | 'static')}
                        disabled={!connected || isGenerating}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all disabled:opacity-50 appearance-none"
                      >
                        <option value="scrolling" className="bg-black">Short Scrolling Text (LED Matrix)</option>
                        <option value="static" className="bg-black">Static Text (Larger Display)</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/40">
                        <i className="fa-solid fa-chevron-down text-xs"></i>
                      </div>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <label className="block text-xs text-white/40 mb-2 uppercase font-bold tracking-widest">Idea Prompt</label>
                    <textarea
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      disabled={!connected || isGenerating}
                      placeholder="Make a spooky halloween greeting..."
                      className="w-full h-32 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all resize-none disabled:opacity-50 placeholder-white/30"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!connected || !aiPrompt.trim() || isGenerating}
                    className="w-full py-3.5 bg-white text-black hover:bg-white/90 rounded-full font-semibold tracking-wide shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center group"
                  >
                     {isGenerating ? (
                       <><i className="fa-solid fa-circle-notch fa-spin mr-2.5"></i> Generating...</>
                     ) : (
                       <>Generate & Send <i className="fa-solid fa-bolt ml-2.5 group-hover:animate-bounce"></i></>
                     )}
                  </button>
               </form>
             )}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="flex flex-col h-full">
              <div className="bg-white/5 rounded-2xl border border-white/10 flex-grow overflow-y-auto custom-scrollbar p-4 space-y-3">
                  {history.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-white/40">
                          <i className="fa-solid fa-folder-open text-4xl mb-3 opacity-50"></i>
                          <p className="text-sm font-medium">No messages yet</p>
                          <p className="text-xs text-white/30 mt-1">Messages sent to the topic will appear here.</p>
                      </div>
                  ) : (
                      history.map(item => (
                          <div key={item.id} className="bg-white/5 border border-white/10 p-4 rounded-2xl flex justify-between items-center group hover:border-white/30 hover:bg-white/10 transition-all">
                              <div className="flex-grow mr-4 min-w-0">
                                  <div className="text-[10px] text-white/40 font-mono mb-1.5 flex items-center">
                                    <i className="fa-regular fa-clock mr-1.5"></i>
                                    {item.timestamp.toLocaleTimeString()}
                                  </div>
                                  <div className="text-sm text-white/90 font-mono break-all">
                                      {item.payload}
                                  </div>
                              </div>
                              <button 
                                  onClick={() => {
                                      setMessage(item.payload);
                                      setActiveTab('manual');
                                  }}
                                  disabled={!connected}
                                  className="p-2.5 bg-white/5 text-white/60 hover:bg-white hover:text-black rounded-xl transition-all shrink-0"
                                  title="Use this message"
                              >
                                  <i className="fa-solid fa-pen-to-square"></i>
                              </button>
                          </div>
                      ))
                  )}
              </div>
              <div className="mt-4 text-center">
                  <p className="text-[10px] text-white/40 font-medium">
                    <i className="fa-solid fa-circle-info mr-1.5"></i>
                    Showing last {history.length} messages received on current session
                  </p>
              </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ControlCenter;