import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-8">Last Updated: June 25, 2025</p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">1. Introduction</h2>
        <p>
          Welcome to PrettyMail. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our application.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">2. Information We Collect</h2>
        <p>
          We may collect information that you provide directly to us, such as when you create an account. The only personal information we collect is your Google email address for authentication purposes. We do not store your emails or any other personal data from your Google account.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">3. How We Use Your Information</h2>
        <p>
          We use the information we collect solely to provide and improve our services. Your email is used to authenticate your session and secure your account.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">4. Information Sharing</h2>
        <p>
          We do not share your personal information with third parties.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">5. Data Security</h2>
        <p>
          We use administrative, technical, and physical security measures to help protect your personal information.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">6. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at <a href="mailto:admin@terrific.co.il" className="text-blue-600 hover:underline">admin@terrific.co.il</a>.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
