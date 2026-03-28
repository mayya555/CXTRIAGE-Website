import React, { useState } from 'react';
import { ChevronLeft, Send, Brain, User, Sparkles, AlertTriangle, FileText, Copy, ThumbsUp, ThumbsDown, RotateCcw, Stethoscope, Activity, Zap, Shield } from 'lucide-react';

interface AIAssistantScreenProps {
  navigate: (screenId: number) => void;
}

interface Message {
  id: string;
  role: 'system' | 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const SYSTEM_PROMPT = `You are an AI medical assistant designed for doctors in a Chest X-ray diagnostic system.

Your role is to assist licensed medical professionals by:

- Explaining AI-based X-ray predictions clearly.
- Providing possible clinical interpretations.
- Suggesting differential diagnoses.
- Recommending general treatment options (non-prescriptive).
- Explaining radiological findings in medical terminology.
- Helping draft short medical reports.

You must:
- Use professional medical language.
- Be concise and clear.
- Never replace clinical judgment.
- Avoid giving direct prescriptions or dosage.
- Always suggest clinical correlation when needed.

If the case is serious, remind the doctor to confirm with further tests.`;

const SAMPLE_RESPONSES: { [key: string]: string } = {
  'pneumothorax': `**AI Finding: Pneumothorax (Left Lung) - Confidence 94%**

**Clinical Interpretation:**
The AI has detected a left-sided pneumothorax with high confidence. Key radiological findings include:
- Absence of lung markings in the left hemithorax periphery
- Visible visceral pleural line
- Potential mediastinal shift (requires confirmation)

**Differential Diagnoses:**
1. Spontaneous pneumothorax (primary/secondary)
2. Traumatic pneumothorax
3. Iatrogenic pneumothorax (post-procedure)
4. Tension pneumothorax (if clinical signs present)

**General Treatment Considerations:**
- Small pneumothorax (<2cm): Conservative management with oxygen therapy and observation
- Larger pneumothorax: Needle aspiration or chest tube insertion
- Tension pneumothorax: Immediate needle decompression

⚠️ **Clinical Correlation Required:**
Please correlate with patient's clinical presentation, vitals, and oxygen saturation. If respiratory distress is present, consider urgent intervention. Recommend follow-up imaging to assess resolution.

**Note:** This is AI-assisted analysis. Final diagnosis and treatment decisions rest with the treating physician.`,

  'pleural effusion': `**AI Finding: Pleural Effusion (Bilateral) - Confidence 89%**

**Clinical Interpretation:**
Bilateral pleural effusions detected with blunting of costophrenic angles bilaterally. Radiological features suggest:
- Moderate to large volume effusion
- Meniscus sign present
- No obvious mass lesions

**Differential Diagnoses:**
1. Congestive heart failure (transudative)
2. Pneumonia/parapneumonic effusion (exudative)
3. Malignancy (lung/pleural)
4. Pulmonary embolism
5. Hypoalbuminemia (nephrotic syndrome, cirrhosis)
6. Systemic inflammatory conditions

**General Treatment Considerations:**
- Diagnostic thoracentesis to determine transudate vs. exudate (Light's criteria)
- Treat underlying cause (diuretics for CHF, antibiotics for infection)
- Therapeutic thoracentesis if symptomatic
- Consider chest tube drainage for complicated parapneumonic effusion

⚠️ **Clinical Correlation Required:**
Assess patient's cardiac status, infectious symptoms, and renal/hepatic function. Consider ultrasound-guided thoracentesis for fluid analysis. Monitor for respiratory compromise.

**Suggested Follow-up:**
- Laboratory analysis of pleural fluid
- Echocardiography if cardiac etiology suspected
- CT chest for better characterization if needed`,

  'normal': `**AI Finding: No Acute Abnormalities Detected - Confidence 96%**

**Clinical Interpretation:**
The AI analysis indicates a normal chest radiograph with the following observations:
- Clear lung fields bilaterally
- Normal cardiac silhouette
- No pleural effusion or pneumothorax
- No focal consolidation or mass lesions
- Normal mediastinal contours
- Intact bony structures

**Clinical Assessment:**
While the AI has not detected significant abnormalities, clinical correlation is essential. Consider:
- Patient's presenting symptoms and history
- Physical examination findings
- Laboratory results
- Risk factors for pulmonary disease

**Recommendations:**
- If patient is symptomatic despite normal X-ray, consider:
  - Pulmonary function tests
  - CT chest for subtle findings
  - Cardiac workup if chest pain present
  - Alternative diagnoses

**Note:** Normal imaging does not exclude all pathology. Early-stage diseases, small lesions, or certain conditions may not be visible on plain radiography. Always correlate with clinical context.`,

  'tuberculosis': `**AI Finding: Findings Suggestive of Tuberculosis - Confidence 82%**

**Clinical Interpretation:**
AI has detected patterns consistent with pulmonary tuberculosis. Radiological findings include:
- Upper lobe predominant infiltrates
- Possible cavitary lesions
- Lymphadenopathy (hilar/mediastinal)
- Patchy consolidation

**Differential Diagnoses:**
1. Active pulmonary tuberculosis
2. Post-primary TB reactivation
3. Fungal infection (Histoplasmosis, Aspergillosis)
4. Lung abscess
5. Malignancy with cavitation
6. Atypical mycobacterial infection

**General Treatment Considerations:**
- Isolation and infection control measures
- Sputum collection for AFB smear and culture
- GeneXpert/NAAT testing for rapid diagnosis
- Standard TB treatment regimen (HRZE) if confirmed
- Contact tracing and screening

⚠️ **IMPORTANT - Infection Control:**
Implement airborne precautions immediately. Patient should be isolated pending microbiological confirmation. Consider drug-resistant TB in high-risk patients.

**Required Investigations:**
- Sputum for AFB smear (3 samples)
- GeneXpert MTB/RIF
- TB culture and sensitivity
- HIV testing
- Baseline liver and renal function tests

**Clinical Correlation Required:**
Assess for constitutional symptoms (fever, night sweats, weight loss), cough duration, TB contact history, and immunosuppression status.`,

  'pneumonia': `**AI Finding: Pneumonia (Right Lower Lobe) - Confidence 91%**

**Clinical Interpretation:**
Right lower lobe consolidation consistent with community-acquired pneumonia. Radiological findings:
- Dense opacity in right lower zone
- Air bronchograms visible
- Silhouette sign with right hemidiaphragm
- No significant pleural effusion

**Differential Diagnoses:**
1. Bacterial pneumonia (Streptococcus pneumoniae most common)
2. Atypical pneumonia (Mycoplasma, Chlamydia)
3. Aspiration pneumonia
4. Viral pneumonia (COVID-19, Influenza)
5. Pulmonary contusion (if trauma history)

**General Treatment Considerations:**
- Risk stratification using CURB-65 or PSI score
- Empirical antibiotic therapy based on severity and setting
- Supportive care (oxygen, hydration, antipyretics)
- Consider hospitalization based on severity scores
- Monitor for complications (effusion, empyema, sepsis)

**Suggested Workup:**
- Complete blood count, CRP/ESR
- Blood cultures (if severe)
- Sputum culture and sensitivity
- COVID-19/Influenza testing if indicated
- Arterial blood gas if respiratory distress

⚠️ **Clinical Correlation Required:**
Assess severity using clinical scoring systems. Consider age, comorbidities, vital signs, and oxygen requirements. Monitor for deterioration requiring ICU care.

**Follow-up:**
Repeat chest X-ray in 4-6 weeks to confirm resolution, especially in patients >50 years or with risk factors for malignancy.`
};

export const AIAssistantScreen = ({ navigate }: AIAssistantScreenProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // Hide welcome screen on first message
    if (showWelcome) {
      setShowWelcome(false);
    }

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const input = inputValue.toLowerCase();
      let response = '';

      // Match keywords to sample responses
      if (input.includes('pneumothorax')) {
        response = SAMPLE_RESPONSES['pneumothorax'];
      } else if (input.includes('pleural effusion') || input.includes('effusion')) {
        response = SAMPLE_RESPONSES['pleural effusion'];
      } else if (input.includes('normal') || input.includes('no abnormalities')) {
        response = SAMPLE_RESPONSES['normal'];
      } else if (input.includes('tuberculosis') || input.includes('tb')) {
        response = SAMPLE_RESPONSES['tuberculosis'];
      } else if (input.includes('pneumonia') || input.includes('consolidation')) {
        response = SAMPLE_RESPONSES['pneumonia'];
      } else {
        response = `**Analysis Request Received**

I'm ready to assist with your case. To provide the most accurate guidance, please share:

1. **AI Detection Results** (if available)
2. **Patient Symptoms** and clinical presentation
3. **Relevant History** (age, comorbidities, smoking)
4. **Specific Questions** you have about the findings

I can help with:
- Explaining radiological findings
- Differential diagnoses
- Clinical interpretation
- Treatment considerations
- Report drafting

Please provide more details so I can assist you effectively.`;
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickPrompt = (prompt: string) => {
    setInputValue(prompt);
  };

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const quickPrompts = [
    'Explain pneumothorax findings',
    'Differential diagnosis for pleural effusion',
    'Normal chest X-ray assessment',
    'Tuberculosis pattern analysis',
    'Pneumonia treatment considerations'
  ];

  const features = [
    {
      icon: <Stethoscope className="w-5 h-5" />,
      title: 'Clinical Analysis',
      description: 'Expert interpretation of X-ray findings'
    },
    {
      icon: <Activity className="w-5 h-5" />,
      title: 'Differential Diagnosis',
      description: 'Comprehensive diagnostic suggestions'
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: 'Instant Insights',
      description: 'Real-time clinical decision support'
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: 'Evidence-Based',
      description: 'Backed by medical guidelines'
    }
  ];

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-slate-50 to-white font-sans">
      {/* Status Bar */}
      <div className="bg-[#2563EB] text-white px-6 pt-3 pb-2 text-xs flex items-center justify-between font-medium">
        <span>12:30</span>
        <span>5G 100%</span>
      </div>

      {/* Blue Header with Gradient */}
      <div className="bg-gradient-to-br from-[#2563EB] to-[#1d4ed8] text-white px-4 py-5 shrink-0 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(36)} className="hover:bg-white/10 rounded-full p-1.5 transition-colors">
            <ChevronLeft className="w-6 h-6" strokeWidth={2.5} />
          </button>
          <div className="flex items-center gap-3 flex-1">
            {/* Ammulu Avatar with gradient */}
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/40 shadow-lg">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-[#2563EB]"></div>
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">Ammulu</h1>
              <p className="text-xs text-blue-100 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                AI Medical Assistant
              </p>
            </div>
          </div>
          <button 
            onClick={() => { setMessages([]); setShowWelcome(true); }}
            className="hover:bg-white/10 rounded-full p-2 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>

        {/* Status Pills */}
        <div className="flex gap-2">
          <div className="px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
            Online
          </div>
          <div className="px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
            Clinical Support Active
          </div>
        </div>
      </div>

      {/* Medical Disclaimer */}
      <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-b border-yellow-200 px-4 py-3">
        <div className="flex gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-900 leading-relaxed">
            <strong className="font-semibold">Medical Disclaimer:</strong> Ammulu provides clinical decision support only. All diagnoses and treatment decisions must be made by licensed physicians.
          </p>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4">
        {showWelcome && messages.length === 0 ? (
          // Welcome Screen
          <div className="max-w-xl mx-auto space-y-6 animate-in fade-in duration-500">
            {/* Welcome Card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-[#2563EB] to-[#1d4ed8] rounded-2xl flex items-center justify-center shadow-lg">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Hello, Doctor! 👋</h2>
                  <p className="text-sm text-slate-600">I'm Ammulu, your AI medical assistant</p>
                </div>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                I'm here to support you with chest X-ray analysis, differential diagnoses, treatment considerations, and clinical decision-making. Let's work together to provide the best patient care.
              </p>
            </div>

            {/* Features Grid */}
            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3 px-1">How I Can Help</h3>
              <div className="grid grid-cols-2 gap-3">
                {features.map((feature, idx) => (
                  <div key={idx} className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-md transition-all hover:border-blue-200 group">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg flex items-center justify-center mb-3 text-[#2563EB] group-hover:scale-110 transition-transform">
                      {feature.icon}
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 mb-1">{feature.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Start Prompts */}
            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3 px-1">Quick Start</h3>
              <div className="space-y-2">
                {quickPrompts.slice(0, 3).map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => { handleQuickPrompt(prompt); setShowWelcome(false); }}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-left hover:bg-blue-50 hover:border-blue-300 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <Sparkles className="w-4 h-4 text-[#2563EB]" />
                      </div>
                      <span className="text-sm text-slate-700 font-medium">{prompt}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          // Chat Messages
          <>
            {messages.map((message) => (
              <div key={message.id}>
                {message.role === 'user' && (
                  <div className="flex justify-end animate-in slide-in-from-right duration-300">
                    <div className="bg-gradient-to-br from-[#2563EB] to-[#1d4ed8] rounded-2xl rounded-tr-md px-5 py-3 max-w-[85%] shadow-md">
                      <p className="text-sm text-white leading-relaxed">{message.content}</p>
                      <span className="text-xs text-blue-100 mt-2 block">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                )}

                {message.role === 'assistant' && (
                  <div className="flex gap-3 animate-in slide-in-from-left duration-300">
                    <div className="w-9 h-9 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center shrink-0 shadow-sm border border-blue-200">
                      <Brain className="w-5 h-5 text-[#2563EB]" />
                    </div>
                    <div className="flex-1">
                      <div className="inline-block mb-1">
                        <span className="text-xs font-bold text-[#2563EB]">Ammulu</span>
                      </div>
                      <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-md px-5 py-4 shadow-md hover:shadow-lg transition-shadow">
                        <div className="prose prose-sm max-w-none">
                          {message.content.split('\n').map((line, idx) => {
                            if (line.startsWith('**') && line.endsWith('**')) {
                              return (
                                <div key={idx} className="font-bold text-slate-900 mb-2 mt-3 first:mt-0 text-base">
                                  {line.replace(/\*\*/g, '')}
                                </div>
                              );
                            } else if (line.startsWith('⚠️')) {
                              return (
                                <div key={idx} className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl px-4 py-3 my-3">
                                  <p className="text-sm text-amber-900 font-medium">{line}</p>
                                </div>
                              );
                            } else if (line.startsWith('-')) {
                              return (
                                <div key={idx} className="flex gap-2.5 my-1.5">
                                  <span className="text-[#2563EB] shrink-0 font-bold">•</span>
                                  <span className="text-sm text-slate-700 leading-relaxed">{line.substring(1).trim()}</span>
                                </div>
                              );
                            } else if (line.match(/^\d+\./)) {
                              return (
                                <div key={idx} className="flex gap-2.5 my-1.5">
                                  <span className="text-[#2563EB] font-bold shrink-0">{line.match(/^\d+\./)}</span>
                                  <span className="text-sm text-slate-700 leading-relaxed">{line.replace(/^\d+\./, '').trim()}</span>
                                </div>
                              );
                            } else if (line.trim()) {
                              return (
                                <p key={idx} className="text-sm text-slate-700 my-2 leading-relaxed">
                                  {line}
                                </p>
                              );
                            }
                            return null;
                          })}
                        </div>
                        <div className="flex items-center gap-3 mt-4 pt-3 border-t border-slate-100">
                          <span className="text-xs text-slate-400 font-medium">
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                          <div className="flex gap-1 ml-auto">
                            <button 
                              onClick={() => handleCopy(message.content)}
                              className="p-2 hover:bg-blue-50 rounded-lg transition-colors group"
                              title="Copy response"
                            >
                              <Copy className="w-4 h-4 text-slate-400 group-hover:text-[#2563EB]" />
                            </button>
                            <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors group">
                              <ThumbsUp className="w-4 h-4 text-slate-400 group-hover:text-green-600" />
                            </button>
                            <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors group">
                              <ThumbsDown className="w-4 h-4 text-slate-400 group-hover:text-red-600" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 animate-in slide-in-from-left duration-300">
                <div className="w-9 h-9 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center shrink-0 shadow-sm border border-blue-200">
                  <Brain className="w-5 h-5 text-[#2563EB]" />
                </div>
                <div className="flex-1">
                  <div className="inline-block mb-1">
                    <span className="text-xs font-bold text-[#2563EB]">Ammulu</span>
                    <span className="text-xs text-slate-400 ml-2">is typing...</span>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-md px-5 py-4 shadow-md">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 bg-[#2563EB] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2.5 h-2.5 bg-[#2563EB] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2.5 h-2.5 bg-[#2563EB] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Quick Prompts - Show when chatting */}
      {!showWelcome && messages.length > 0 && (
        <div className="bg-white border-t border-slate-200 px-4 py-3 shadow-lg">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Suggested</div>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickPrompt(prompt)}
                className="px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 text-[#2563EB] text-xs font-semibold rounded-xl hover:from-blue-100 hover:to-indigo-100 transition-all whitespace-nowrap shrink-0 border border-blue-100 shadow-sm"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="bg-white border-t border-slate-200 px-4 py-4 shadow-2xl">
        <div className="flex gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask Ammulu about X-ray findings, diagnosis, treatment..."
            className="flex-1 h-12 bg-slate-50 border border-slate-200 rounded-xl px-5 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all"
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="w-12 h-12 bg-gradient-to-br from-[#2563EB] to-[#1d4ed8] hover:from-[#1d4ed8] hover:to-[#1e40af] disabled:from-slate-200 disabled:to-slate-200 disabled:cursor-not-allowed text-white rounded-xl flex items-center justify-center transition-all active:scale-95 shadow-lg disabled:shadow-none"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className="text-xs text-slate-400 mt-3 text-center leading-relaxed">
          Ammulu provides clinical support. Always use professional medical judgment.
        </p>
      </div>
    </div>
  );
};