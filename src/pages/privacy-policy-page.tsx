import React, { useEffect } from 'react';

const PrivacyPage: React.FC = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-sky-200 text-navy-900 p-8">
      <div className="max-w-4xl mx-auto bg-white bg-opacity-20 backdrop-blur-lg rounded-xl shadow-lg p-8">
        <img src="/logo.svg" alt="ModelNote Logo" className="mx-auto mb-6 w-32 h-32" />
        <h1 className="text-4xl font-bold mb-6 text-center">Privacy Policy</h1>

        <p className="mb-4">Your privacy is important to us. It is ModelNote's policy to respect your privacy regarding any information we may collect from you across our website, and other sites we own and operate.</p>

        <p className="mb-4">We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we're collecting it and how it will be used.</p>

        <p className="mb-4">You can sign up with your Google account so your ModelNote's account username will be prefilled with your name and your public profile picture.</p>

        <p className="mb-4">We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we'll protect within commercially acceptable means to prevent loss and theft, as well as unauthorised access, disclosure, copying, use or modification.</p>

        <p className="mb-4">We don't share any personally identifying information publicly or with third-parties, except when required to by law.</p>

        <p className="mb-4">We act in the capacity of a data controller and a data processor with regard to the personal data processed through ModelNote and the services in terms of the applicable data protection laws, including the EU General Data Protection Regulation (GDPR).</p>

        <p className="mb-4">Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies.</p>

        <p className="mb-4">You are free to refuse our request for your personal information, with the understanding that we may be unable to provide you with some of your desired services.</p>

        <p className="mb-4">Your continued use of our website will be regarded as acceptance of our practices around privacy and personal information. If you have any questions about how we handle user data and personal information, feel free to contact us.</p>

        <p className="text-sm text-center mt-8">This policy is effective as of 26 July 2023.</p>
      </div>
    </div>
  );
};

export default PrivacyPage;
