import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { PhoneScreen } from './components/PhoneScreen';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsAndConditions } from './components/TermsAndConditions';
import { Heart, ArrowUpRight, Rocket, CheckCircle, AlertCircle } from 'lucide-react';
import { submitEmail } from './lib/supabase';

// Configuration object for easy editing
const CONFIG = {
  brand: {
    name: "7 Days Love",
    tagline: "7 Days to Find Real Love",
    description: "Your account deletes after 7 days. Either you find your person, or you start the journey again. The pressure creates magic ✨",
    socialHandle: "@lukasiuu",
    socialUrl: "https://twitter.com/lukasiuu"
  },
  colors: {
    light: {
      background: "bg-white",
      text: {
        primary: "text-gray-900",
        secondary: "text-gray-600", 
        muted: "text-gray-500"
      },
      rightSide: "bg-gradient-to-br from-gray-50 to-gray-100"
    },
    dark: {
      background: "bg-slate-950",
      text: {
        primary: "text-white",
        secondary: "text-slate-300",
        muted: "text-slate-400"
      },
      rightSide: "bg-gradient-to-br from-slate-900 via-purple-900/20 to-pink-900/20"
    }
  },
  gradients: {
    brand: "from-purple-600 to-pink-600",
    brandDark: "from-purple-400 to-pink-400",
    brandHover: "from-purple-700 to-pink-700"
  }
};

function LandingPage() {
  const [email, setEmail] = useState('');
  const [timeLeft, setTimeLeft] = useState({ days: 4, hours: 12, minutes: 34 }); // For phone screen
  const [launchCountdown, setLaunchCountdown] = useState({ days: 7, hours: 0, minutes: 0, seconds: 0 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  // Calculate launch date (7 days from now)
  const launchDate = React.useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return date;
  }, []);

  // Real countdown timer for app launch
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = launchDate.getTime() - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setLaunchCountdown({ days, hours, minutes, seconds });
      } else {
        setLaunchCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown(); // Initial call
    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, [launchDate]);

  // Simulate countdown timer for phone screen
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59 };
        } else if (prev.days > 0) {
          return { days: prev.days - 1, hours: 23, minutes: 59 };
        }
        return prev;
      });
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) return;
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitMessage('');
    
    // Add timeout for better UX
    const timeoutId = setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('error');
      setSubmitMessage('Request timed out. Please check your connection and try again.');
    }, 10000); // 10 second timeout
    
    try {
      const result = await submitEmail(email.trim());
      clearTimeout(timeoutId);
      
      if (result.success) {
        setSubmitStatus('success');
        setSubmitMessage('Thanks! You\'re on the waitlist. We\'ll notify you when the app launches!');
        setEmail('');
      } else {
        setSubmitStatus('error');
        setSubmitMessage(result.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      clearTimeout(timeoutId);
      setSubmitStatus('error');
      setSubmitMessage('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const theme = CONFIG.colors.light;
  const brandGradient = CONFIG.gradients.brand;
  const logoSrc = '/logo.png';

  return (
    <div 
      className={`min-h-screen md:h-screen overflow-y-auto overflow-x-hidden ${CONFIG.colors.light.rightSide} flex flex-col md:flex-row items-start md:items-center justify-center gap-6 md:gap-12 transition-colors duration-500`}
      style={{ fontFamily: 'var(--font-sans)' }}
    >
      <div className="max-w-[1000px] mx-auto p-6 font-sans flex flex-col items-center justify-center min-h-screen w-full">
        <main className="flex items-center gap-16 md:gap-24 w-full justify-center md:flex-row flex-col">
      {/* Left Side - Content */}
      <div className="md:w-[50%] w-full max-w-[450px] text-center md:text-left flex flex-col justify-center items-center md:items-start px-0 md:px-0 py-12 md:py-0">
        {/* Logo */}

          <div className="flex items-center gap-5 group cursor-pointer mb-7 justify-center md:justify-start">
            <img src={logoSrc} alt={CONFIG.brand.name} className="w-12 h-12 rounded-xl shadow-xl" />
            <span
              className={`text-3xl font-semibold transition-colors duration-200`}
              style={{ fontFamily: 'var(--font-display)', color: '#111214' }}
            >
              {CONFIG.brand.name}
            </span>

        </div>

        {/* Main Content */}
        <div className="max-w-2xl text-center md:text-left mx-auto md:mx-0 w-full">
          {/* Main Headline */}
          <h1 
            className={`text-5xl md:text-6xl lg:text-6xl font-bold ${theme.text.primary} tracking-tight leading-tight md:mb-2 transition-colors duration-200`}
            style={{ fontFamily: 'var(--font-display)' }}
          >
            7 Days to Find
            <br />
            <span className={`bg-gradient-to-r ${brandGradient} bg-clip-text text-transparent`}>
              Real Love
            </span>
          </h1>
          {/* Description */}
          <p className={`text-lg ${theme.text.secondary} leading-relaxed mb-6 transition-colors duration-200`}>
            {CONFIG.brand.description}
          </p>

          {/* Email Signup */}
          <form onSubmit={handleSubmit} className="w-full">
            <div className="flex w-full md:flex-row flex-col md:gap-0 gap-0 mb-2 md:mb-6 ">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`flex-1 py-[1.22rem] px-[1.1rem] border-inset border border-gray-300 md:rounded-l-md rounded-md md:rounded-r-none md:mb-0 mb-3 text-[0.95rem] outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/10 bg-white font-sans`}
                required
                disabled={isSubmitting}
              />
              <Button 
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className={`relative overflow-hidden group bg-gradient-to-r ${brandGradient} text-white py-[1.15rem] px-[1.3rem] border-none md:rounded-r-md rounded-md md:rounded-l-none text-[0.95rem] font-semibold cursor-pointer transition-all hover:brightness-105 whitespace-nowrap font-sans md:w-auto w-full disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <span aria-hidden className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <span className="relative z-10">{isSubmitting ? 'Joining...' : 'Join Waitlist'}</span>
              </Button>
            </div>
            
         </form>

          {/* Footer */}
          <div className="space-y-3">
            <a 
              href={CONFIG.brand.socialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${theme.text.muted} flex items-center gap-2 hover:text-purple-400 transition-colors cursor-pointer group text-sm md:text-base justify-center md:justify-start`}
            >
              <span>Follow {CONFIG.brand.socialHandle} for updates</span>
              <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </a>
            
            {/* Legal Links */}
            <div className="flex items-center gap-4 text-xs md:text-sm justify-center md:justify-start">
              <a 
                href="/privacy-policy" 
                className={`${theme.text.muted} hover:text-purple-400 transition-colors`}
              >
                Privacy Policy
              </a>
              <span className={`${theme.text.muted}`}>•</span>
              <a 
                href="/terms-and-conditions" 
                className={`${theme.text.muted} hover:text-purple-400 transition-colors`}
              >
                Terms & Conditions
              </a>
            </div>
          </div>

          {/* Status Message */}
          {submitStatus !== 'idle' && (
            <div className={`flex items-center gap-3 p-4 md:p-5 rounded-lg md:rounded-xl text-sm md:text-base mt-4 ${
              submitStatus === 'success' 
                ? 'bg-green-50 text-green-700 border border-green-200' 
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              {submitStatus === 'success' ? (
                <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
              ) : (
                <AlertCircle className="w-4 h-4 md:w-5 md:h-5" />
              )}
              <span>{submitMessage}</span>
            </div>
          )}
        </div>
      </div>

          {/*/!* Launch Countdown *!/*/}
          {/*<div className={`bg-white/80 rounded-2xl md:rounded-3xl p-6 md:p-8 mb-8 md:mb-12 transition-all duration-200 w-full max-w-sm backdrop-blur-sm`}>*/}
          {/*  <div className="flex items-center gap-3 mb-4 md:mb-6">*/}
          {/*    <Rocket className={`w-4 h-4 md:w-5 md:h-5 text-purple-600`} />*/}
          {/*    <span className={`text-xs md:text-sm font-medium ${theme.text.secondary} uppercase tracking-wide`} style={{ fontFamily: 'var(--font-display)' }}>*/}
          {/*    App Launches In*/}
          {/*  </span>*/}
          {/*  </div>*/}

          {/*  <div className="grid grid-cols-4 gap-4 md:gap-6">*/}
          {/*    {[*/}
          {/*      { value: launchCountdown.days, label: 'Days' },*/}
          {/*      { value: launchCountdown.hours, label: 'Hours' },*/}
          {/*      { value: launchCountdown.minutes, label: 'Minutes' },*/}
          {/*      { value: launchCountdown.seconds, label: 'Seconds' }*/}
          {/*    ].map((item, index) => (*/}
          {/*        <div key={index} className="text-center">*/}
          {/*          <div*/}
          {/*              className={`text-lg md:text-xl font-bold ${theme.text.primary} font-mono leading-tight transition-colors duration-200`}*/}
          {/*              style={{ fontFamily: 'var(--font-display)' }}*/}
          {/*          >*/}
          {/*            {item.value.toString().padStart(2, '0')}*/}
          {/*          </div>*/}
          {/*          <div className={`text-xs ${theme.text.muted} uppercase tracking-wide font-medium mt-1`}>*/}
          {/*            {item.label}*/}
          {/*          </div>*/}
          {/*        </div>*/}
          {/*    ))}*/}
          {/*  </div>*/}
          {/*</div>*/}

      {/* Right Side - Phone Mockup */}
      <div className={`w-full max-w-[400px] mt-6 md:mt-0`}>

        <div className="relative animate-float w-[400px] h-[1000px]">
          {/* Immersive 3D iPhone - No constraining frame */}
          <PhoneScreen  />

        </div>
      </div>
        </main>
      </div>
    </div>
  );
}

function AppRoutes() {
  const navigate = useNavigate();
  
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route 
        path="/privacy-policy" 
        element={<PrivacyPolicy />} 
      />
      <Route 
        path="/terms-and-conditions" 
        element={<TermsAndConditions />} 
      />
    </Routes>
  );
}

export default function App() {
  return <AppRoutes />;
}