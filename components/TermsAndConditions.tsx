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

interface TermsAndConditionsProps {
  onBack: () => void;
}

export function TermsAndConditions({ onBack }: TermsAndConditionsProps) {
  const theme = CONFIG.colors.light;
  const brandGradient = CONFIG.gradients.brand;
  const logoSrc = '/logo.png';

  return (
    <div 
      className={`min-h-screen ${CONFIG.colors.light.rightSide} transition-colors duration-500`}
      style={{ fontFamily: 'var(--font-sans)' }}
    >
      <div className="max-w-4xl mx-auto p-6 font-sans">
        {/* Header */}
        <div className="flex items-center gap-5 mb-8 pt-6">
          <Button
            onClick={onBack}
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
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
            Terms and Conditions
          </h1>
          
          <p className={`text-lg ${theme.text.secondary} mb-8`}>
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="prose prose-gray max-w-none">
            <section className="mb-8">
              <h2 
                className={`text-2xl font-semibold ${theme.text.primary} mb-4`}
                style={{ fontFamily: 'var(--font-display)' }}
              >
                1. Acceptance of Terms
              </h2>
              <p className={`${theme.text.secondary} leading-relaxed mb-4`}>
                By downloading, accessing, or using 7DaysLove ("the App"), you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree, do not use the App.
              </p>
            </section>

            <section className="mb-8">
              <h2 
                className={`text-2xl font-semibold ${theme.text.primary} mb-4`}
                style={{ fontFamily: 'var(--font-display)' }}
              >
                2. Description of Service
              </h2>
              <p className={`${theme.text.secondary} leading-relaxed mb-4`}>
                7DaysLove is a mobile dating application that operates on weekly cohorts. Users have 7 days to meet and choose potential matches within their city-based cohort, with the option to enter exclusive mode with a mutual match.
              </p>
            </section>

            <section className="mb-8">
              <h2 
                className={`text-2xl font-semibold ${theme.text.primary} mb-4`}
                style={{ fontFamily: 'var(--font-display)' }}
              >
                3. Eligibility and Account Requirements
              </h2>
              
              <h3 className={`text-xl font-semibold ${theme.text.primary} mb-3 mt-6`}>Eligibility</h3>
              <ul className={`${theme.text.secondary} leading-relaxed space-y-2 ml-6 mb-4`}>
                <li>• You must be at least 18 years old</li>
                <li>• You must provide accurate and current information</li>
                <li>• You must not be prohibited from using the service under applicable law</li>
              </ul>

              <h3 className={`text-xl font-semibold ${theme.text.primary} mb-3 mt-6`}>Account Responsibilities</h3>
              <ul className={`${theme.text.secondary} leading-relaxed space-y-2 ml-6`}>
                <li>• Maintain confidentiality of your account credentials</li>
                <li>• You are responsible for all activities under your account</li>
                <li>• Notify us immediately of any unauthorized use</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 
                className={`text-2xl font-semibold ${theme.text.primary} mb-4`}
                style={{ fontFamily: 'var(--font-display)' }}
              >
                4. How 7DaysLove Works
              </h2>
              
              <h3 className={`text-xl font-semibold ${theme.text.primary} mb-3 mt-6`}>Cohort System</h3>
              <ul className={`${theme.text.secondary} leading-relaxed space-y-2 ml-6 mb-4`}>
                <li>• New cohorts begin every Sunday at GMT+1</li>
                <li>• Users cannot join consecutive cohorts (skip-a-week rule)</li>
                <li>• Each cohort lasts exactly 7 days</li>
              </ul>

              <h3 className={`text-xl font-semibold ${theme.text.primary} mb-3 mt-6`}>Matching and Communication</h3>
              <ul className={`${theme.text.secondary} leading-relaxed space-y-2 ml-6 mb-4`}>
                <li>• You will see 8-12 curated profiles per cohort</li>
                <li>• Maximum of 7 concurrent connections per cohort</li>
                <li>• Exclusive mode locks you to one match for the remainder of the cohort</li>
              </ul>

              <h3 className={`text-xl font-semibold ${theme.text.primary} mb-3 mt-6`}>Paid Features</h3>
              <ul className={`${theme.text.secondary} leading-relaxed space-y-2 ml-6`}>
                <li>• <strong>Queue Skip ($7):</strong> Enter current cohort faster</li>
                <li>• <strong>Visibility Boost ($7):</strong> Increased profile visibility</li>
                <li>• All purchases are one-time, non-refundable transactions</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 
                className={`text-2xl font-semibold ${theme.text.primary} mb-4`}
                style={{ fontFamily: 'var(--font-display)' }}
              >
                5. User Conduct and Community Guidelines
              </h2>
              
              <h3 className={`text-xl font-semibold ${theme.text.primary} mb-3 mt-6`}>Prohibited Conduct</h3>
              <p className={`${theme.text.secondary} leading-relaxed mb-4`}>You may not:</p>
              <ul className={`${theme.text.secondary} leading-relaxed space-y-2 ml-6 mb-4`}>
                <li>• Provide false, misleading, or fraudulent information</li>
                <li>• Use someone else's photos or impersonate others</li>
                <li>• Engage in harassment, abuse, or discriminatory behavior</li>
                <li>• Share inappropriate, explicit, or illegal content</li>
                <li>• Attempt to circumvent safety measures or app limitations</li>
                <li>• Use the service for commercial purposes or spam</li>
                <li>• Create multiple accounts to evade restrictions</li>
              </ul>

              <h3 className={`text-xl font-semibold ${theme.text.primary} mb-3 mt-6`}>Content Standards</h3>
              <ul className={`${theme.text.secondary} leading-relaxed space-y-2 ml-6`}>
                <li>• Profile photos must be recent, clear photos of yourself</li>
                <li>• No nudity, sexually explicit, or inappropriate content</li>
                <li>• No promotional or commercial content</li>
                <li>• Content must comply with applicable laws</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 
                className={`text-2xl font-semibold ${theme.text.primary} mb-4`}
                style={{ fontFamily: 'var(--font-display)' }}
              >
                6. Safety and Verification
              </h2>
              
              <h3 className={`text-xl font-semibold ${theme.text.primary} mb-3 mt-6`}>Verification</h3>
              <ul className={`${theme.text.secondary} leading-relaxed space-y-2 ml-6 mb-4`}>
                <li>• Phone/email verification required</li>
                <li>• Selfie and liveness detection required</li>
                <li>• Optional ID verification available</li>
                <li>• We reserve the right to verify user identity</li>
              </ul>

              <h3 className={`text-xl font-semibold ${theme.text.primary} mb-3 mt-6`}>Safety Measures</h3>
              <ul className={`${theme.text.secondary} leading-relaxed space-y-2 ml-6`}>
                <li>• Report and block features available</li>
                <li>• Content moderation and community enforcement</li>
                <li>• We may investigate and take action on violations</li>
                <li>• Emergency safety features may be implemented</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 
                className={`text-2xl font-semibold ${theme.text.primary} mb-4`}
                style={{ fontFamily: 'var(--font-display)' }}
              >
                7. Privacy and Data
              </h2>
              <p className={`${theme.text.secondary} leading-relaxed mb-4`}>
                Your privacy is governed by our Privacy Policy, which is incorporated into these Terms by reference. By using the App, you consent to the collection and use of your information as described in the Privacy Policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 
                className={`text-2xl font-semibold ${theme.text.primary} mb-4`}
                style={{ fontFamily: 'var(--font-display)' }}
              >
                8. Payment and Refunds
              </h2>
              
              <h3 className={`text-xl font-semibold ${theme.text.primary} mb-3 mt-6`}>Payments</h3>
              <ul className={`${theme.text.secondary} leading-relaxed space-y-2 ml-6 mb-4`}>
                <li>• All payments are processed through secure third-party payment processors</li>
                <li>• Prices are subject to change with notice</li>
                <li>• Applicable taxes may be added to purchases</li>
              </ul>

              <h3 className={`text-xl font-semibold ${theme.text.primary} mb-3 mt-6`}>Refund Policy</h3>
              <ul className={`${theme.text.secondary} leading-relaxed space-y-2 ml-6`}>
                <li>• All purchases are final and non-refundable</li>
                <li>• We do not provide refunds for unused services or features</li>
                <li>• Refunds may be considered for technical issues at our sole discretion</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 
                className={`text-2xl font-semibold ${theme.text.primary} mb-4`}
                style={{ fontFamily: 'var(--font-display)' }}
              >
                9. Intellectual Property
              </h2>
              
              <h3 className={`text-xl font-semibold ${theme.text.primary} mb-3 mt-6`}>Our Content</h3>
              <ul className={`${theme.text.secondary} leading-relaxed space-y-2 ml-6 mb-4`}>
                <li>• 7DaysLove and all related trademarks, logos, and content are owned by us</li>
                <li>• You may not use our intellectual property without permission</li>
              </ul>

              <h3 className={`text-xl font-semibold ${theme.text.primary} mb-3 mt-6`}>Your Content</h3>
              <ul className={`${theme.text.secondary} leading-relaxed space-y-2 ml-6`}>
                <li>• You retain ownership of content you upload</li>
                <li>• You grant us a license to use, modify, and display your content for service operation</li>
                <li>• You represent that you have rights to all content you upload</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 
                className={`text-2xl font-semibold ${theme.text.primary} mb-4`}
                style={{ fontFamily: 'var(--font-display)' }}
              >
                10. Disclaimers and Limitations
              </h2>
              
              <h3 className={`text-xl font-semibold ${theme.text.primary} mb-3 mt-6`}>Service Disclaimer</h3>
              <ul className={`${theme.text.secondary} leading-relaxed space-y-2 ml-6 mb-4`}>
                <li>• The service is provided "as is" without warranties</li>
                <li>• We do not guarantee matches, relationships, or outcomes</li>
                <li>• We are not responsible for user conduct or interactions</li>
                <li>• Service availability may vary and is not guaranteed</li>
              </ul>

              <h3 className={`text-xl font-semibold ${theme.text.primary} mb-3 mt-6`}>Limitation of Liability</h3>
              <ul className={`${theme.text.secondary} leading-relaxed space-y-2 ml-6`}>
                <li>• Our liability is limited to the maximum extent permitted by law</li>
                <li>• We are not liable for indirect, incidental, or consequential damages</li>
                <li>• Total liability shall not exceed amounts paid by you for the service</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 
                className={`text-2xl font-semibold ${theme.text.primary} mb-4`}
                style={{ fontFamily: 'var(--font-display)' }}
              >
                11. Termination
              </h2>
              
              <h3 className={`text-xl font-semibold ${theme.text.primary} mb-3 mt-6`}>By You</h3>
              <ul className={`${theme.text.secondary} leading-relaxed space-y-2 ml-6 mb-4`}>
                <li>• You may delete your account at any time</li>
                <li>• Termination does not entitle you to refunds</li>
              </ul>

              <h3 className={`text-xl font-semibold ${theme.text.primary} mb-3 mt-6`}>By Us</h3>
              <p className={`${theme.text.secondary} leading-relaxed mb-4`}>We may suspend or terminate your account if you:</p>
              <ul className={`${theme.text.secondary} leading-relaxed space-y-2 ml-6`}>
                <li>• Violate these Terms or community guidelines</li>
                <li>• Engage in fraudulent or illegal activity</li>
                <li>• Pose a risk to other users or the service</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 
                className={`text-2xl font-semibold ${theme.text.primary} mb-4`}
                style={{ fontFamily: 'var(--font-display)' }}
              >
                12. Changes to Terms
              </h2>
              <p className={`${theme.text.secondary} leading-relaxed mb-4`}>
                We may modify these Terms at any time. Material changes will be communicated through the App or email. Continued use after changes constitutes acceptance of new Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 
                className={`text-2xl font-semibold ${theme.text.primary} mb-4`}
                style={{ fontFamily: 'var(--font-display)' }}
              >
                13. Dispute Resolution
              </h2>
              
              <h3 className={`text-xl font-semibold ${theme.text.primary} mb-3 mt-6`}>Governing Law</h3>
              <p className={`${theme.text.secondary} leading-relaxed mb-4`}>
                These Terms are governed by the laws of [Your Jurisdiction].
              </p>

              <h3 className={`text-xl font-semibold ${theme.text.primary} mb-3 mt-6`}>Dispute Process</h3>
              <ul className={`${theme.text.secondary} leading-relaxed space-y-2 ml-6`}>
                <li>• First, contact us to resolve issues informally</li>
                <li>• Disputes may be subject to binding arbitration</li>
                <li>• Class action lawsuits are waived where permitted by law</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 
                className={`text-2xl font-semibold ${theme.text.primary} mb-4`}
                style={{ fontFamily: 'var(--font-display)' }}
              >
                14. General Provisions
              </h2>
              
              <h3 className={`text-xl font-semibold ${theme.text.primary} mb-3 mt-6`}>Severability</h3>
              <p className={`${theme.text.secondary} leading-relaxed mb-4`}>
                If any provision is found invalid, the remainder of these Terms remains in effect.
              </p>

              <h3 className={`text-xl font-semibold ${theme.text.primary} mb-3 mt-6`}>Entire Agreement</h3>
              <p className={`${theme.text.secondary} leading-relaxed mb-4`}>
                These Terms, along with the Privacy Policy, constitute the entire agreement between you and 7DaysLove.
              </p>

              <h3 className={`text-xl font-semibold ${theme.text.primary} mb-3 mt-6`}>Assignment</h3>
              <p className={`${theme.text.secondary} leading-relaxed mb-4`}>
                We may assign these Terms; you may not assign without our consent.
              </p>
            </section>

            <section className="mb-8">
              <h2 
                className={`text-2xl font-semibold ${theme.text.primary} mb-4`}
                style={{ fontFamily: 'var(--font-display)' }}
              >
                15. Contact Information
              </h2>
              <p className={`${theme.text.secondary} leading-relaxed mb-4`}>
                For questions about these Terms, contact us at:
              </p>
              <div className={`${theme.text.secondary} leading-relaxed mb-6`}>
                <p>Email: legal@7dayslove.com</p>
                <p>Support: support@7dayslove.com</p>
                <p>Address: Somewhere in the Universe 🪐</p>
              </div>
              
              <div className={`bg-gray-50 rounded-lg p-4 border-l-4 border-purple-500`}>
                <p className={`${theme.text.secondary} text-sm italic`}>
                  By using 7DaysLove, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
