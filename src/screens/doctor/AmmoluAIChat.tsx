import { useNavigate } from 'react-router';
import { useState, useRef, useEffect } from 'react';
import { WebAppLayout } from '../../components/layout/WebAppLayout';
import {
  Send, Bot, User, Sparkles, MessageSquare, Clock, TrendingUp,
  FileText, Brain, Activity, AlertCircle, CheckCircle, Lightbulb
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Textarea } from '../../components/ui/textarea';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function AmmoluAIChat() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm Ammulu, your AI assistant for CXRT AI. I'm here to help you with any questions about using the system, interpreting AI results, understanding workflows, or general radiology queries. How can I assist you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickQuestions = [
    { icon: Brain, text: 'How do I interpret AI confidence scores?', color: 'text-purple-600', bg: 'bg-purple-50' },
    { icon: FileText, text: 'What workflow should I follow for critical cases?', color: 'text-blue-600', bg: 'bg-blue-50' },
    { icon: Activity, text: 'How does the AI heatmap visualization work?', color: 'text-green-600', bg: 'bg-green-50' },
    { icon: TrendingUp, text: 'How can I improve my review efficiency?', color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  const generateAIResponse = (userQuestion: string): string => {
    const question = userQuestion.toLowerCase();

    if (question.includes('confidence') || question.includes('score')) {
      return "AI confidence scores in CXRT AI range from 0-100% and indicate how certain the AI is about its findings:\n\n• **90-100%**: Very High Confidence - The AI has detected clear patterns matching known pathologies\n• **70-89%**: High Confidence - Strong indicators present, but review recommended\n• **50-69%**: Moderate Confidence - Some indicators present, careful review needed\n• **Below 50%**: Low Confidence - Unclear findings, rely on your clinical expertise\n\nAlways use your professional judgment alongside AI suggestions. The AI is a diagnostic aid, not a replacement for clinical expertise.";
    }

    if (question.includes('heatmap') || question.includes('visualization')) {
      return "The AI Heatmap Visualization uses color-coded overlays to show areas of interest:\n\n• **Red Zones**: High probability of abnormality detected\n• **Orange/Yellow**: Moderate concern areas\n• **Blue/Cool Colors**: Areas of interest but lower priority\n\nYou can:\n1. Toggle the heatmap on/off for clearer viewing\n2. Adjust opacity to see underlying X-ray details\n3. Click on colored regions to see specific AI findings\n4. Compare multiple heatmaps in split view\n\nThe heatmap helps focus your attention on areas the AI flagged for review.";
    }

    if (question.includes('critical') || question.includes('urgent') || question.includes('workflow')) {
      return "For critical cases, follow this workflow:\n\n**Step 1**: Check the Critical Alerts dashboard daily\n**Step 2**: Review cases marked with red 'URGENT' tags first\n**Step 3**: Examine AI findings and heatmap visualization\n**Step 4**: Verify findings with your clinical assessment\n**Step 5**: If confirmed critical, mark for immediate action\n**Step 6**: Generate preliminary report within 2 hours\n**Step 7**: Notify referring physician immediately\n\nCritical findings include: pneumothorax, large pleural effusions, suspicious masses, and acute fractures.";
    }

    if (question.includes('efficiency') || question.includes('faster') || question.includes('improve')) {
      return "Here are tips to improve your review efficiency:\n\n**1. Use Keyboard Shortcuts**\n• Space: Toggle heatmap\n• Arrow keys: Navigate between cases\n• Enter: Confirm diagnosis\n\n**2. Leverage AI Pre-screening**\n• Trust high-confidence normal cases\n• Focus time on flagged abnormalities\n\n**3. Batch Similar Cases**\n• Review chest X-rays in groups\n• Use consistent workflow patterns\n\n**4. Use Templates**\n• Create report templates for common findings\n• Use quick-fill options\n\n**5. Set Time Goals**\n• Aim for 10-15 minutes per complex case\n• 5-7 minutes for routine cases";
    }

    if (question.includes('report') || question.includes('generate')) {
      return "To generate reports efficiently:\n\n**Auto-Generation**:\n1. Review the AI-suggested findings\n2. Click 'Generate Report' button\n3. The system auto-fills: patient data, scan details, AI findings, and suggested impressions\n\n**Customization**:\n• Edit any section of the auto-generated report\n• Add your clinical observations\n• Modify the impression based on your expertise\n• Include recommendations\n\n**Templates**:\n• Use pre-built templates for common diagnoses\n• Create custom templates for your practice patterns\n• Save frequently used phrases\n\n**Review & Sign**:\n• Preview report before finalizing\n• Digitally sign when ready\n• Reports are immediately available to referring physicians";
    }

    if (question.includes('accuracy') || question.includes('reliable') || question.includes('trust')) {
      return "CXRT AI's accuracy metrics:\n\n**Overall Performance**:\n• Sensitivity: 94.3% for detecting abnormalities\n• Specificity: 96.8% for normal cases\n• Trained on 500,000+ chest X-rays\n• Validated across multiple institutions\n\n**What You Can Trust**:\n✅ High-confidence normal scans (>90%)\n✅ Detection of obvious abnormalities\n✅ Anatomical landmark identification\n✅ Image quality assessment\n\n**Always Verify**:\n⚠️ Subtle or rare findings\n⚠️ Low confidence scores (<70%)\n⚠️ Cases with poor image quality\n⚠️ Clinically complex patients\n\nThe AI is a powerful second reader, but your clinical judgment is paramount.";
    }

    if (question.includes('help') || question.includes('support') || question.includes('contact')) {
      return "I can help you with:\n\n**System Navigation**\n• How to access different features\n• Understanding the dashboard\n• Managing your workflow\n\n**AI Features**\n• Interpreting AI results\n• Using heatmap visualizations\n• Understanding confidence scores\n\n**Clinical Workflows**\n• Case review processes\n• Report generation\n• Critical case handling\n\n**Technical Support**\n• For technical issues, contact: support@cxrt-ai.com\n• For urgent system problems: Call +1 (555) CXRT-911\n• Training resources: Available in Help Center\n\nWhat specific area would you like help with?";
    }

    // Default response
    return `That's a great question! Based on CXRT AI's features, I can help you with:\n\n• **AI Analysis**: Understanding confidence scores, findings interpretation\n• **Workflows**: Case review, report generation, critical case handling\n• **Features**: Heatmaps, comparison tools, quality checks\n• **Best Practices**: Efficiency tips, accuracy optimization\n\nCould you provide more details about what you'd like to know? For example:\n- "How do I interpret AI confidence scores?"\n- "What's the workflow for critical cases?"\n- "How does the heatmap work?"\n- "How can I generate reports faster?"`;
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateAIResponse(userMessage.content),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <WebAppLayout
      role="doctor"
      title="Ammulu AI Assistant"
      breadcrumbs={[
        { label: 'Dashboard', path: '/doctor/dashboard' },
        { label: 'Ammulu AI Assistant' },
      ]}
    >
      <div className="max-w-4xl mx-auto h-[calc(100vh-12rem)] flex flex-col">
        {/* Header Card */}
        <div className="bg-gradient-to-r from-[#2563EB] to-blue-700 rounded-xl p-6 mb-4 text-white">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Ammulu AI Assistant</h2>
              <p className="text-blue-100 text-sm">Your intelligent guide to CXRT AI</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-blue-100 text-xs">
            <CheckCircle className="w-4 h-4" />
            <span>Available 24/7 • Instant responses • Context-aware</span>
          </div>
        </div>

        {/* Quick Questions */}
        {messages.length <= 1 && (
          <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-semibold text-slate-900">Quick Questions</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {quickQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleQuickQuestion(q.text)}
                  className={`flex items-start gap-3 p-3 rounded-lg ${q.bg} hover:shadow-md transition-all text-left border border-transparent hover:border-slate-200`}
                >
                  <q.icon className={`w-5 h-5 ${q.color} flex-shrink-0 mt-0.5`} />
                  <span className="text-sm text-slate-700">{q.text}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages Area */}
        <div className="flex-1 bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    message.role === 'user'
                      ? 'bg-[#2563EB]'
                      : 'bg-gradient-to-br from-purple-500 to-blue-600'
                  }`}
                >
                  {message.role === 'user' ? (
                    <User className="w-5 h-5 text-white" />
                  ) : (
                    <Bot className="w-5 h-5 text-white" />
                  )}
                </div>
                <div className={`flex-1 max-w-[80%] ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`rounded-2xl px-4 py-3 ${
                      message.role === 'user'
                        ? 'bg-[#2563EB] text-white'
                        : 'bg-slate-100 text-slate-900'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                  </div>
                  <div className="flex items-center gap-2 mt-1 px-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span className="text-xs text-slate-500">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="bg-slate-100 rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-slate-200 p-4 bg-slate-50">
            <div className="flex gap-3">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask Ammulu anything about CXRT AI..."
                className="resize-none bg-white"
                rows={2}
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="bg-[#2563EB] hover:bg-blue-700 px-6 self-end"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Press <kbd className="px-1.5 py-0.5 bg-slate-200 rounded text-xs">Enter</kbd> to send •{' '}
              <kbd className="px-1.5 py-0.5 bg-slate-200 rounded text-xs">Shift + Enter</kbd> for new line
            </p>
          </div>
        </div>
      </div>
    </WebAppLayout>
  );
}
