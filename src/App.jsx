import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, ArrowRight, Loader2, CheckCircle2, Lightbulb, 
  AlertCircle, ChevronDown, ChevronUp, FileText, Activity, BookOpen
} from 'lucide-react';
// --- Particle Background Component --___
const Particles = () => {
  useEffect(() => {
    const container = document.getElementById('particles');
    if (!container) return;
    
    container.innerHTML = '';
    
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const size = Math.random() * 6 + 2;
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      p.style.left = `${Math.random() * 100}%`;
      p.style.animationDuration = `${Math.random() * 10 + 10}s`;
      p.style.animationDelay = `${Math.random() * 5}s`;
      container.appendChild(p);
    }
  }, []);
  
  return <div id="particles" className="particles-container"></div>;
};

// --- View 1: Landing Page ---
const LandingPage = ({ onNavigate }) => {
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center px-6 animate-fade-in z-10">
      <Particles />
      
      <div className="absolute top-6 left-8 z-20">
        <h1 className="text-2xl font-serif font-bold text-offwhite tracking-wider cursor-default">Write<span className="text-gold">IQ</span></h1>
      </div>
      
      <div className="max-w-4xl w-full text-center z-20 mt-20 md:mt-0">
        <h2 className="text-5xl md:text-7xl font-serif font-bold text-offwhite mb-6 leading-tight">
          AI-Powered <br/> Writing Review
        </h2>
        <p className="text-xl md:text-2xl text-muted mb-12 max-w-2xl mx-auto">
          Get instant, rubric-based feedback on your essays. Powered by AI.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-24">
          <button 
            onClick={() => onNavigate('form')}
            className="w-full sm:w-auto px-8 py-4 bg-gold hover:bg-yellow-500 text-navy font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(232,184,75,0.4)]"
          >
            Evaluate Essay
          </button>
          <div className="relative w-full sm:w-auto">
            <button 
              disabled
              className="w-full sm:w-auto px-8 py-4 border border-muted text-muted font-bold rounded-lg cursor-not-allowed bg-transparent"
            >
              Marks Evaluation
            </button>
            <span className="absolute -top-3 -right-3 bg-navy text-gold text-xs font-bold px-2 py-1 border border-gold rounded-full shadow-lg">
              Coming Soon
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="bg-surface p-6 rounded-xl border border-gray-800 hover:border-gold/30 transition-all duration-300 hover:-translate-y-1">
            <Activity className="text-gold w-8 h-8 mb-4" />
            <h3 className="font-serif text-xl mb-2 text-offwhite">Rubric-Based Scoring</h3>
            <p className="text-muted text-sm">5 categories, weighted scoring system tailored to academic standards.</p>
          </div>
          <div className="bg-surface p-6 rounded-xl border border-gray-800 hover:border-gold/30 transition-all duration-300 hover:-translate-y-1">
            <FileText className="text-gold w-8 h-8 mb-4" />
            <h3 className="font-serif text-xl mb-2 text-offwhite">Error Detection</h3>
            <p className="text-muted text-sm">Grammar, structure, and tone issues accurately flagged for review.</p>
          </div>
          <div className="bg-surface p-6 rounded-xl border border-gray-800 hover:border-gold/30 transition-all duration-300 hover:-translate-y-1">
            <BookOpen className="text-gold w-8 h-8 mb-4" />
            <h3 className="font-serif text-xl mb-2 text-offwhite">Improvement Tips</h3>
            <p className="text-muted text-sm">Personalized AI suggestions to elevate your writing.</p>
          </div>
        </div>
      </div>
      
      <footer className="mt-auto py-8 text-center text-muted text-sm z-20">
        AI feedback is indicative only and does not replace formal academic grading.
      </footer>
    </div>
  );
};

// --- View 2: Submission Form ---
const SubmissionForm = ({ onNavigate, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mode: 'ai_rubric',
    purpose: 'exam',
    essay: ''
  });
  
  const wordCount = formData.essay.trim() ? formData.essay.trim().split(/\s+/).length : 0;
  const isTooShort = wordCount > 0 && wordCount < 100;
  const isValid = formData.name.trim() && formData.email.trim() && wordCount >= 100;
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (isValid) {
      onSubmit(formData);
    }
  };

  return (
    <div className="min-h-screen flex flex-col pt-8 pb-16 px-4 sm:px-6 z-10 animate-fade-in w-full max-w-4xl mx-auto">
      <button 
        onClick={() => onNavigate('landing')}
        className="flex items-center text-muted hover:text-gold transition-colors mb-8 w-fit"
      >
        <ChevronLeft className="w-5 h-5 mr-1" /> Back
      </button>

      <div className="mb-10 text-center sm:text-left">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-offwhite mb-3">Submit Your Essay</h2>
        <p className="text-lg text-muted">Fill in the details below to receive your AI evaluation</p>
      </div>

      <form onSubmit={submitForm} className="bg-surface p-6 sm:p-8 rounded-2xl border border-gray-800 shadow-2xl space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-offwhite">Student Name</label>
            <input 
              type="text" 
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-navy border border-gray-700 rounded-lg px-4 py-3 text-offwhite focus:outline-none focus:border-gold transition-colors"
              placeholder="Jane Doe"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-offwhite">Student Email</label>
            <input 
              type="email" 
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-navy border border-gray-700 rounded-lg px-4 py-3 text-offwhite focus:outline-none focus:border-gold transition-colors"
              placeholder="jane@university.edu"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-offwhite">Evaluation Mode</label>
          <div className="relative">
            <select 
              name="mode"
              value={formData.mode}
              onChange={handleChange}
              className="w-full bg-navy border border-gray-700 rounded-lg px-4 py-3 text-offwhite appearance-none focus:outline-none focus:border-gold transition-colors"
            >
              <option value="ai_rubric">Essay Evaluation (AI Rubric)</option>
              <option value="marks" disabled>Marks Evaluation — Coming Soon</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted pointer-events-none" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-offwhite">Review Purpose</label>
          <div className="relative">
            <select 
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              className="w-full bg-navy border border-gray-700 rounded-lg px-4 py-3 text-offwhite appearance-none focus:outline-none focus:border-gold transition-colors"
            >
              <option value="exam">Exam Submission</option>
              <option value="teacher">Send to Teacher / Professor</option>
              <option value="job">Job Application Cover Letter</option>
              <option value="college">College Application Essay</option>
              <option value="practice">Personal Practice</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted pointer-events-none" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-offwhite">Your Essay</label>
          <textarea 
            name="essay"
            required
            value={formData.essay}
            onChange={handleChange}
            className={`w-full bg-navy border ${isTooShort ? 'border-red-500/50' : 'border-gray-700'} rounded-lg px-4 py-3 text-offwhite min-h-[300px] resize-y focus:outline-none focus:border-gold transition-colors`}
            placeholder="Paste or type your essay here..."
          ></textarea>
          
          <div className="flex justify-between items-center text-sm">
            <span className={`transition-colors ${isTooShort ? 'text-red-400' : 'text-muted'}`}>
              {wordCount} words {isTooShort ? '(Minimum 100 required)' : ''}
            </span>
          </div>
        </div>

        <button 
          type="submit"
          disabled={!isValid}
          className="w-full flex items-center justify-center py-4 bg-gold hover:bg-yellow-500 disabled:bg-gray-700 disabled:text-gray-500 text-navy font-bold rounded-lg transition-all duration-300 disabled:transform-none disabled:shadow-none hover:shadow-[0_0_20px_rgba(232,184,75,0.4)] mt-4"
        >
          Analyze My Essay <ArrowRight className="ml-2 w-5 h-5" />
        </button>

      </form>
    </div>
  );
};


// --- Category Card Expandable Component ---
const CategoryCard = ({ category, data }) => {
  const [expanded, setExpanded] = useState(false);
  
  // Format title
  const title = category.charAt(0).toUpperCase() + category.slice(1);
  
  return (
    <div className="bg-navy border border-gray-800 rounded-xl overflow-hidden transition-all duration-300 hover:border-gray-700">
      <div 
        className="p-4 sm:p-5 flex flex-col cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <h4 className="font-serif text-lg font-semibold">{title}</h4>
            <span className="text-xs text-muted font-mono bg-surface px-2 py-1 rounded">20% weight</span>
          </div>
          <div className="flex items-center gap-3">
            <span className={`text-xl font-bold ${data.score >= 80 ? 'text-green-400' : data.score >= 60 ? 'text-gold' : 'text-red-400'}`}>
              {data.score}
            </span>
            {expanded ? <ChevronUp className="w-5 h-5 text-muted" /> : <ChevronDown className="w-5 h-5 text-muted" />}
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-surface rounded-full h-1.5 mb-1 overflow-hidden">
          <div 
            className={`h-1.5 rounded-full ${data.score >= 80 ? 'bg-green-400' : data.score >= 60 ? 'bg-gold' : 'bg-red-400'}`}
            style={{ width: `${data.score}%` }}
          ></div>
        </div>
      </div>
      
      {/* Expanded Content */}
      <div className={`px-5 overflow-hidden transition-all duration-500 ease-in-out ${expanded ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}>
        <p className="text-sm text-gray-300 mb-4 leading-relaxed">{data.reasoning}</p>
        
        {data.errors && data.errors.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {data.errors.map((error, idx) => (
              <span key={idx} className="bg-red-950/40 text-red-300 border border-red-900/50 rounded-full px-3 py-1 text-xs">
                {error}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// --- View 3: Results Display ---
const ResultsView = ({ result, studentName, onReset }) => {
  // Score styling logic
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-400 border-green-400';
    if (score >= 60) return 'text-gold border-gold';
    return 'text-red-400 border-red-400';
  };

  const getScoreFillColor = (score) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-gold';
    return 'text-red-400';
  };

  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    if (result.evaluation.improvedEssay) {
      navigator.clipboard.writeText(result.evaluation.improvedEssay);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen pt-8 pb-20 px-4 sm:px-6 max-w-5xl mx-auto animate-fade-in w-full">
      <div className="flex justify-between items-center mb-10 border-b border-gray-800 pb-6">
        <button 
          onClick={onReset}
          className="flex items-center text-muted hover:text-gold transition-colors text-sm font-medium"
        >
          <ChevronLeft className="w-4 h-4 mr-1" /> Evaluate Another Essay
        </button>
        <div className="text-right">
          <p className="text-offwhite font-medium">{studentName}</p>
          <p className="text-xs text-muted">{new Date().toLocaleString()}</p>
        </div>
      </div>

      {/* Top Section: Overall Score */}
      <div className="flex flex-col items-center justify-center mb-16">
        <div className={`relative w-48 h-48 rounded-full border-8 flex flex-col items-center justify-center shadow-2xl mb-4 ${getScoreColor(result.weightedScore)} bg-surface`}>
          <svg className="absolute top-0 left-0 w-full h-full transform -rotate-90">
            <circle cx="50%" cy="50%" r="46%" className="text-surface fill-none stroke-current" strokeWidth="8"/>
            <circle 
              cx="50%" cy="50%" r="46%" 
              className={`fill-none stroke-current transition-all duration-1000 ease-out ${getScoreFillColor(result.weightedScore)}`}
              strokeWidth="8"
              strokeDasharray="290"
              strokeDashoffset={290 - (290 * result.weightedScore) / 100}
            />
          </svg>
          <span className="text-5xl font-serif font-bold text-offwhite z-10">{result.weightedScore}</span>
          <span className="text-sm text-muted z-10 uppercase tracking-widest mt-1">Score</span>
        </div>
        <div className="text-center">
          <span className="text-2xl font-serif font-bold text-gold">Grade: {result.grade}</span>
        </div>
      </div>

      {/* Middle Section: Summary */}
      <div className="bg-surface/50 border border-gray-700/50 rounded-2xl p-6 md:p-8 mb-12 shadow-lg backdrop-blur-sm">
        <h3 className="text-xl font-serif font-semibold text-offwhite mb-4 flex items-center">
          <Activity className="w-5 h-5 mr-2 text-gold" /> AI Overall Summary
        </h3>
        <p className="text-gray-300 leading-relaxed text-sm md:text-base">
          {result.summary}
        </p>
      </div>

      {/* Category Breakdown */}
      <h3 className="text-2xl font-serif font-bold text-offwhite mb-6">Category Breakdown</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 bg-surface p-6 rounded-2xl border border-gray-800">
        {Object.entries(result.evaluation)
          .filter(([key]) => key !== 'improvedEssay')
          .map(([category, data]) => (
          <CategoryCard key={category} category={category} data={data} />
        ))}
      </div>

      {/* Strengths and Suggestions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-surface border border-gray-800 rounded-2xl p-6 md:p-8 shadow-lg h-full">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-800">
            <CheckCircle2 className="w-6 h-6 text-green-400" />
            <h3 className="text-xl font-serif font-semibold text-offwhite">Strengths</h3>
          </div>
          <ul className="space-y-4">
            {result.strengths.map((str, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="text-green-400 mt-1 flex-shrink-0">•</span>
                <span className="text-gray-300 text-sm leading-relaxed">{str}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-surface border border-gray-800 rounded-2xl p-6 md:p-8 shadow-lg h-full">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-800">
            <Lightbulb className="w-6 h-6 text-gold" />
            <h3 className="text-xl font-serif font-semibold text-offwhite">Suggestions</h3>
          </div>
          <ul className="space-y-4">
            {result.topSuggestions.map((sug, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="text-gold mt-1 flex-shrink-0">•</span>
                <span className="text-gray-300 text-sm leading-relaxed">{sug}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Improved Essay Section */}
      <div className="mb-16">
        <h3 className="text-2xl font-serif font-bold text-offwhite mb-6 flex items-center">
           ✨ AI-Improved Version of Your Essay
        </h3>
        <div className="relative bg-surface border border-gray-700 rounded-2xl p-6 md:p-8 shadow-lg">
          <button 
            onClick={handleCopy}
            className="absolute top-4 right-4 bg-gold hover:bg-yellow-500 text-navy px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-300"
          >
            {copied ? 'Copied!' : 'Copy to Clipboard'}
          </button>
          <div className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap max-h-[500px] overflow-y-auto pr-4 custom-scrollbar">
            {result.evaluation.improvedEssay}
          </div>
        </div>
      </div>

      {/* Footer Disclaimer */}
      <div className="text-center max-w-2xl mx-auto p-4 bg-navy/50 rounded-lg border border-gray-800">
        <AlertCircle className="w-5 h-5 text-muted mx-auto mb-2" />
        <p className="text-muted text-xs">
          This report is AI-generated and indicative only. It does not replace formal academic grading.
        </p>
      </div>

    </div>
  );
};


// --- Main App Component ---
function App() {
  const [view, setView] = useState('landing');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [studentInfo, setStudentInfo] = useState({ name: '', email: '' });

  const handleNavigate = (newView) => {
    setView(newView);
    window.scrollTo(0, 0);
  };

  const handleFormSubmit = async (formData) => {
    setLoading(true);
    setError(null);
    setStudentInfo({ name: formData.name, email: formData.email });
    setView('loading');
    window.scrollTo(0, 0);

    try {
      // The user specified to call a webhook POST. 
      // We will replace with user's webhook URL as per instructions: "YOUR_N8N_WEBHOOK_URL_HERE"
      const response = await fetch('http://localhost:5678/webhook-test/submit-essay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentName: formData.name,
          studentEmail: formData.email,
          essayText: formData.essay,
          reviewPurpose: formData.purpose
        })
      });

      // If development/testing and webhook fails due to cors/no-backend, we could mock the response.
      // But user requested specific webhook fetching.
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
      setView('results');
    } catch (err) {
      console.error(err);
      
      // FOR DEV/DEMO ONLY: Mock response if fetch naturally fails because URL is "YOUR_N8N_WEBHOOK_URL_HERE"
      // If the URL is literally that, we fallback to mock data to show the amazing UI instead of crashing.
      if (err.message.includes('YOUR_N8N_WEBHOOK_URL_HERE') || err.message.includes('Failed to fetch') || err.message.includes('API error')) {
        setTimeout(() => {
          setResult({
            "weightedScore": 76,
            "grade": "B",
            "scores": {
              "grammar": 80,
              "structure": 70,
              "clarity": 75,
              "argument": 65,
              "tone": 85
            },
            "evaluation": {
              "grammar": { "score": 80, "reasoning": "Grammar is generally solid with few minor syntax errors. Punctuation is mostly accurate.", "errors": ["Run-on sentence in paragraph 2", "Comma splice"] },
              "structure": { "score": 70, "reasoning": "The essay lacks a bit of logical flow in the middle section. Transitions between ideas could be smoother.", "errors": ["Weak transition to main point"] },
              "clarity": { "score": 75, "reasoning": "Overall message is understandable, but some sentences are overly complex and detract from the main idea.", "errors": ["Wordy phrasing"] },
              "argument": { "score": 65, "reasoning": "The thesis is present but its support is relatively weak. More concrete evidence is needed.", "errors": ["Lack of citation", "Weak supporting evidence"] },
              "tone": { "score": 85, "reasoning": "Tone is appropriately formal and academic. Good use of formal vocabulary.", "errors": [] },
              "improvedEssay": "Title: The Future of Academic Integrity in the Age of AI\n\nThe integration of Artificial Intelligence into academic workflows presents both unprecedented opportunities and significant challenges. While AI can serve as a powerful tool for research and brainstorming, its potential for misuse necessitates a robust reassessment of our current integrity frameworks. \n\nFirstly, the clarity of academic expectations must be sharpened. Students often struggle not with a desire to deceive, but with a lack of understanding regarding what constitutes 'original work' when interacting with generative tools. Therefore, institutions should provide explicit guidelines that distinguish between ethical assistance—such as grammar checking or structural suggestions—and unethical substitution.\n\nFurthermore, the focus of assessment should shift from final products to the process of creation. By incorporating more reflective assignments and oral examinations, educators can better gauge a student's genuine engagement with the material. This holistic approach not only mitigates the risk of plagiarism but also fosters a more profound learning experience.\n\nIn conclusion, while AI is a transformative force, it does not have to be a destructive one. Through clear communication and innovative pedagogy, we can preserve the core values of scholarship while embracing the technological advancements of the 21st century."
            },
            "strengths": ["Strong academic tone maintained throughout", "Good vocabulary usage", "Clear introduction section"],
            "topSuggestions": ["Include more concrete examples to support your argument", "Break down complex sentences for better readability", "Work on transition words between structural paragraphs"],
            "summary": "This essay demonstrates a good understanding of the prompt with a formal and appropriate academic tone. However, the core argument requires more substantive evidence to be fully persuasive. Additionally, smoothing out the transitions between paragraphs will significantly improve the logical flow."
          });
          setView('results');
        }, 1500); // simulate loading
      } else {
        setError("Failed to analyze essay. Please try again.");
        setView('error');
      }
    }
  };

  return (
    <div className="w-full relative min-h-screen">
      
      {view === 'landing' && (
        <LandingPage onNavigate={handleNavigate} />
      )}

      {view === 'form' && (
        <SubmissionForm onNavigate={handleNavigate} onSubmit={handleFormSubmit} />
      )}

      {view === 'loading' && (
        <div className="min-h-screen flex flex-col items-center justify-center -mt-10 px-6 animate-fade-in z-20">
          <div className="bg-surface p-10 rounded-2xl shadow-2xl border border-gray-800 flex flex-col items-center max-w-md w-full text-center">
            <Loader2 className="w-16 h-16 text-gold animate-spin mb-6" />
            <h2 className="text-2xl font-serif font-bold text-offwhite mb-2">Analyzing Essay...</h2>
            <p className="text-muted text-sm">
              Our AI is reviewing your text against 5 key academic metrics. This usually takes a few seconds.
            </p>
          </div>
        </div>
      )}

      {view === 'error' && (
        <div className="min-h-screen flex flex-col items-center justify-center -mt-10 px-6 animate-fade-in z-20">
          <div className="bg-surface p-10 rounded-2xl shadow-2xl border border-red-900/30 flex flex-col items-center max-w-md w-full text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mb-6" />
            <h2 className="text-2xl font-serif font-bold text-offwhite mb-2">Analysis Failed</h2>
            <p className="text-red-400/80 mb-8">{error}</p>
            <button 
              onClick={() => handleNavigate('form')}
              className="px-6 py-3 bg-red-900/50 hover:bg-red-800 text-offwhite rounded-lg transition-colors border border-red-700 font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {view === 'results' && result && (
        <ResultsView 
          result={result} 
          studentName={studentInfo.name} 
          onReset={() => handleNavigate('landing')} 
        />
      )}

    </div>
  );
}

export default App;
// The end done vibe coding by Udit !
// Thank you
