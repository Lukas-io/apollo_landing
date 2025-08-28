import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';

// Configuration object matching the main app
const CONFIG = {
  brand: {
    name: "7 Days Love",
    tagline: "7 Days to Find Real Love",
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
    }
  },
  gradients: {
    brand: "from-purple-600 to-pink-600",
  }
};

interface PrivacyPolicyProps {
  onBack: () => void;
}

export function PrivacyPolicy({ onBack }: PrivacyPolicyProps) {
  const theme = CONFIG.colors.light;
  const brandGradient = CONFIG.gradients.brand;
  const logoSrc = '/logo.png';

  // Function to handle webview close
  const handleWebviewClose = () => {
    if (window.parent && window.parent !== window) {
      // Send message to parent app
      window.parent.postMessage({ type: 'CLOSE_WEBVIEW' }, '*');
    } else {
      // Fallback to navigation back if not in webview
      onBack();
    }
  };

  return (
    <div 
      className={`min-h-screen ${CONFIG.colors.light.rightSide} transition-colors duration-500`}
      style={{ fontFamily: 'var(--font-sans)' }}
    >
      <div className="max-w-4xl mx-auto p-6 font-sans">
        {/* Header */}
        <div className="flex items-center gap-5 mb-8 pt-6">
          <Button
            onClick={handleWebviewClose}
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Close</span>
          </Button>
          
          <div className="flex items-center gap-3">
            <img src={logoSrc} alt={CONFIG.brand.name} className="w-8 h-8 rounded-lg shadow-lg" />
            <span
              className={`text-xl font-semibold transition-colors duration-200`}
              style={{ fontFamily: 'var(--font-display)', color: '#111214' }}
            >
              {CONFIG.brand.name}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12">
          <h1 
            className={`text-4xl md:text-5xl font-bold ${theme.text.primary} mb-4 tracking-tight`}
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Privacy Policy
          </h1>
          
          <p className={`text-lg ${theme.text.secondary} mb-8`}>
            Last updated: August 28, 2025
          </p>

          <div className="prose prose-gray max-w-none">
            <section className="mb-8">
              <h2 
                className={`text-2xl font-semibold ${theme.text.primary} mb-4`}
                style={{ fontFamily: 'var(--font-display)' }}
              >
                1. Introduction
              </h2>
              <p className={`${theme.text.secondary} leading-relaxed mb-4`}>
                Welcome to 7DaysLove ("we," "our," or "us"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application and services.
              </p>
            </section>

            <section className="mb-8">
              <h2 
                className={`text-2xl font-semibold ${theme.text.primary} mb-4`}
                style={{ fontFamily: 'var(--font-display)' }}
              >
                2. Information We Collect
              </h2>
              
              <h3 className={`text-xl font-semibold ${theme.text.primary} mb-3 mt-6`}>Personal Information</h3>
              <ul className={`${theme.text.secondary} leading-relaxed space-y-2 ml-6 mb-4`}>
                <li>• <strong>Account Information:</strong> Phone number, email address, age, city location</li>
                <li>• <strong>Profile Information:</strong> Photos, self-descriptions, preferences, interests</li>
                <li>• <strong>Verification Data:</strong> Selfie photos for liveness detection, optional ID verification</li>
                <li>• <strong>Communication Data:</strong> Messages, voice calls, and interactions within the app</li>
              </ul>

              <h3 className={`text-xl font-semibold ${theme.text.primary} mb-3 mt-6`}>Automatically Collected Information</h3>
              <ul className={`${theme.text.secondary} leading-relaxed space-y-2 ml-6 mb-4`}>
                <li>• <strong>Usage Data:</strong> App interactions, features used, time spent, cohort participation</li>
                <li>• <strong>Device Information:</strong> Device type, operating system, unique device identifiers</li>
                <li>• <strong>Location Data:</strong> City-level location for cohort assignment (precise location not collected)</li>
              </ul>

              <h3 className={`text-xl font-semibold ${theme.text.primary} mb-3 mt-6`}>Information from Third Parties</h3>
              <ul className={`${theme.text.secondary} leading-relaxed space-y-2 ml-6`}>
                <li>• <strong>Payment Information:</strong> Payment processing data (handled by secure payment processors)</li>
                <li>• <strong>Referral Information:</strong> Information from users who refer you to the app</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 
                className={`text-2xl font-semibold ${theme.text.primary} mb-4`}
                style={{ fontFamily: 'var(--font-display)' }}
              >
                3. How We Use Your Information
              </h2>
              <p className={`${theme.text.secondary} leading-relaxed mb-4`}>
                We use your information to:
              </p>
              <ul className={`${theme.text.secondary} leading-relaxed space-y-2 ml-6`}>
                <li>• <strong>Provide Services:</strong> Create and maintain your account, facilitate matches, enable communication</li>
                <li>• <strong>Matching Algorithm:</strong> Generate compatible matches within your weekly cohort</li>
                <li>• <strong>Safety & Security:</strong> Verify identity, prevent fraud, enforce community guidelines</li>
                <li>• <strong>Communication:</strong> Send notifications, updates, and cohort-related messages</li>
                <li>• <strong>Improvement:</strong> Analyze usage patterns, improve features, develop new functionality</li>
                <li>• <strong>Legal Compliance:</strong> Comply with applicable laws and regulations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 
                className={`text-2xl font-semibold ${theme.text.primary} mb-4`}
                style={{ fontFamily: 'var(--font-display)' }}
              >
                4. Information Sharing and Disclosure
              </h2>
              
              <h3 className={`text-xl font-semibold ${theme.text.primary} mb-3 mt-6`}>With Other Users</h3>
              <ul className={`${theme.text.secondary} leading-relaxed space-y-2 ml-6 mb-4`}>
                <li>• <strong>Profile Information:</strong> Photos, age, interests, and self-descriptions visible to cohort members</li>
                <li>• <strong>Badges:</strong> Achievement badges displayed on your profile</li>
                <li>• <strong>Matching Status:</strong> Whether you're in exclusive mode (without revealing partner identity)</li>
              </ul>

              <h3 className={`text-xl font-semibold ${theme.text.primary} mb-3 mt-6`}>With Third Parties</h3>
              <ul className={`${theme.text.secondary} leading-relaxed space-y-2 ml-6 mb-4`}>
                <li>• <strong>Service Providers:</strong> Cloud storage, analytics, payment processing, content moderation</li>
                <li>• <strong>Legal Requirements:</strong> When required by law, court order, or government request</li>
                <li>• <strong>Safety Purposes:</strong> To protect users from harm, fraud, or illegal activity</li>
                <li>• <strong>Business Transfers:</strong> In case of merger, acquisition, or sale of assets</li>
              </ul>

              <h3 className={`text-xl font-semibold ${theme.text.primary} mb-3 mt-6`}>We Do NOT Sell</h3>
              <p className={`${theme.text.secondary} leading-relaxed mb-4`}>
                We do not sell, rent, or trade your personal information to third parties for marketing purposes.
              </p>
            </section>

            <section className="mb-8">
              <h2 
                className={`text-2xl font-semibold ${theme.text.primary} mb-4`}
                style={{ fontFamily: 'var(--font-display)' }}
              >
                5. Data Retention
              </h2>
              <ul className={`${theme.text.secondary} leading-relaxed space-y-2 ml-6`}>
                <li>• <strong>Active Profiles:</strong> Maintained while your account is active</li>
                <li>• <strong>Cohort Data:</strong> Archived after each cohort ends; chat history becomes read-only</li>
                <li>• <strong>Safety Data:</strong> Retained for safety and legal compliance purposes</li>
                <li>• <strong>Deleted Accounts:</strong> Personal data deleted within 30 days of account deletion (except as required for legal/safety reasons)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 
                className={`text-2xl font-semibold ${theme.text.primary} mb-4`}
                style={{ fontFamily: 'var(--font-display)' }}
              >
                6. Your Rights and Choices
              </h2>
              
              <h3 className={`text-xl font-semibold ${theme.text.primary} mb-3 mt-6`}>Account Controls</h3>
              <ul className={`${theme.text.secondary} leading-relaxed space-y-2 ml-6 mb-4`}>
                <li>• <strong>Profile Management:</strong> Edit or delete profile information</li>
                <li>• <strong>Communication Settings:</strong> Control notification preferences</li>
                <li>• <strong>Account Deletion:</strong> Delete your account and associated data</li>
              </ul>

              <h3 className={`text-xl font-semibold ${theme.text.primary} mb-3 mt-6`}>Data Rights (where applicable)</h3>
              <ul className={`${theme.text.secondary} leading-relaxed space-y-2 ml-6`}>
                <li>• <strong>Access:</strong> Request a copy of your personal data</li>
                <li>• <strong>Correction:</strong> Update inaccurate information</li>
                <li>• <strong>Deletion:</strong> Request deletion of your data</li>
                <li>• <strong>Portability:</strong> Receive your data in a portable format</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 
                className={`text-2xl font-semibold ${theme.text.primary} mb-4`}
                style={{ fontFamily: 'var(--font-display)' }}
              >
                7. Security
              </h2>
              <p className={`${theme.text.secondary} leading-relaxed mb-4`}>
                We implement appropriate technical and organizational measures to protect your information, including:
              </p>
              <ul className={`${theme.text.secondary} leading-relaxed space-y-2 ml-6`}>
                <li>• Encryption of data in transit and at rest</li>
                <li>• Access controls and authentication</li>
                <li>• Regular security assessments</li>
                <li>• Secure payment processing</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 
                className={`text-2xl font-semibold ${theme.text.primary} mb-4`}
                style={{ fontFamily: 'var(--font-display)' }}
              >
                8. Children's Privacy
              </h2>
              <p className={`${theme.text.secondary} leading-relaxed mb-4`}>
                7DaysLove is not intended for users under 18. We do not knowingly collect personal information from children under 18. If we learn we have collected such information, we will delete it immediately.
              </p>
            </section>

            <section className="mb-8">
              <h2 
                className={`text-2xl font-semibold ${theme.text.primary} mb-4`}
                style={{ fontFamily: 'var(--font-display)' }}
              >
                9. International Data Transfers
              </h2>
              <p className={`${theme.text.secondary} leading-relaxed mb-4`}>
                Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place for such transfers.
              </p>
            </section>

            <section className="mb-8">
              <h2 
                className={`text-2xl font-semibold ${theme.text.primary} mb-4`}
                style={{ fontFamily: 'var(--font-display)' }}
              >
                10. Changes to This Privacy Policy
              </h2>
              <p className={`${theme.text.secondary} leading-relaxed mb-4`}>
                We may update this Privacy Policy periodically. We will notify you of material changes through the app or email. Your continued use constitutes acceptance of the updated policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 
                className={`text-2xl font-semibold ${theme.text.primary} mb-4`}
                style={{ fontFamily: 'var(--font-display)' }}
              >
                11. Contact Us
              </h2>
              <p className={`${theme.text.secondary} leading-relaxed mb-4`}>
                For privacy-related questions or requests, contact us at:
              </p>
              <div className={`${theme.text.secondary} leading-relaxed mb-6`}>
                <p>Email: privacy@7dayslove.com</p>
                <p>Address: Somewhere in the Universe 🪐</p>
              </div>
              
              <div className={`bg-gray-50 rounded-lg p-4 border-l-4 border-purple-500`}>
                <p className={`${theme.text.secondary} text-sm italic`}>
                  By using 7DaysLove, you acknowledge that you have read and understood this Privacy Policy.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
