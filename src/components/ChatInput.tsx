import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import ToolsDropdown from './ToolsDropdown';
import FileUploadModal from './FileUploadModal';
import {
  Send,
  Mic,
  SlidersHorizontal,
  File,
} from 'lucide-react';

interface ChatInputProps {
  message: string;
  setMessage: (value: string) => void;
  handleSendMessage: (e: React.FormEvent) => void;
  isLoading?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ message, setMessage, handleSendMessage, isLoading = false }) => {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const [showTools, setShowTools] = useState(false);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const scrollHeight = textarea.scrollHeight;
      const maxHeight = 5 * 24; // 5 lines * 24px line-height (approx)
      if (scrollHeight > maxHeight) {
        textarea.style.height = `${maxHeight}px`;
        textarea.style.overflowY = 'auto';
      } else {
        textarea.style.height = `${scrollHeight}px`;
        textarea.style.overflowY = 'hidden';
      }
    }
  }, [message]);

  return (
    <>
      <div className="w-full max-w-3xl mx-auto">
        <form onSubmit={handleSendMessage} className="relative">
          <div className={`relative flex items-center rounded-full border-2 transition-colors ${
            isDark
              ? 'bg-[#2f2f2f] border-gray-600 focus-within:border-gray-500'
              : 'bg-gray-50 border-gray-300 focus-within:border-gray-400'
          }`}>
            <div className="flex items-center pl-3">
              <button
                type="button"
                onClick={() => setShowFileUpload(true)}
                className={`p-2 transition-colors text-sm ${
                  isDark
                    ? 'text-gray-400 hover:text-white'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <File size={18} />
                <span className="sr-only">{t('chat.tools')}</span>
              </button>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowTools(!showTools)}
                  className={`p-2 transition-colors text-sm ${
                    isDark
                      ? 'text-gray-400 hover:text-white'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <SlidersHorizontal size={18} />
                  <span className="sr-only">{t('chat.tools')}</span>
                </button>
                <ToolsDropdown isOpen={showTools} />
              </div>
            </div>
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t('chat.placeholder')}
              className={`flex-1 w-full bg-transparent py-3.5 resize-none outline-none ${
                isDark
                  ? 'text-white placeholder-gray-400'
                  : 'text-gray-900 placeholder-gray-500'
              }`}
              rows={1}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(e);
                }
              }}
            />
            <div className="flex items-center gap-2 pr-3">
              <button
                type="button"
                className={`p-2 transition-colors ${
                  isDark
                    ? 'text-gray-400 hover:text-white'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Mic size={20} />
              </button>
              <button
                type="submit"
                disabled={!message.trim() || isLoading}
                className={`
                  p-2 rounded-full transition-colors
                  ${message.trim() && !isLoading
                    ? isDark
                      ? 'bg-white text-black hover:bg-gray-200'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                    : isDark
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }
                `}
              >
                {isLoading ? (
                  <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
                ) : (
                  <Send size={16} />
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
      <FileUploadModal isOpen={showFileUpload} onClose={() => setShowFileUpload(false)} />
    </>
  );
};

export default ChatInput;