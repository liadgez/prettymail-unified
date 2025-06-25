import React from 'react';

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
        <p className="text-sm text-gray-500 mb-8">Last Updated: June 25, 2025</p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">1. Agreement to Terms</h2>
        <p>
          By using PrettyMail, you agree to be bound by these Terms of Service.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">2. Use of the Service</h2>
        <p>
          You agree to use our service in compliance with all applicable laws and regulations. You are responsible for all activities that occur under your account.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">3. Intellectual Property</h2>
        <p>
          The service and its original content, features, and functionality are and will remain the exclusive property of PrettyMail and its licensors.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">4. Termination</h2>
        <p>
          We may terminate or suspend your account at any time, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">5. Governing Law</h2>
        <p>
          These Terms shall be governed and construed in accordance with the laws of the jurisdiction, without regard to its conflict of law provisions.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">6. Contact Us</h2>
        <p>
          If you have any questions about these Terms, please contact us at <a href="mailto:admin@terrific.co.il" className="text-blue-600 hover:underline">admin@terrific.co.il</a>.
        </p>
      </div>
    </div>
  );
};

export default TermsOfService;
