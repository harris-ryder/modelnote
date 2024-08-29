import React from 'react';

const TosPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-sky-200 text-navy-900 p-8">
      <div className="max-w-4xl mx-auto bg-white bg-opacity-20 backdrop-blur-lg rounded-xl shadow-lg p-8">
        <img src="/logo.svg" alt="ModelNote Logo" className="mx-auto mb-6 w-32 h-32" />
        <h1 className="text-4xl font-bold mb-6 text-center">Terms and Conditions</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="mb-4">By using ModelNote you confirm your acceptance of, and agree to be bound by, these terms and conditions.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Agreement to Terms and Conditions</h2>
          <p className="mb-4">This Agreement takes effect on the date on which you first use the ModelNote application.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Unlimited Access Software License with Termination Rights</h2>
          <p className="mb-4">The ModelNote Software License facilitates the acquisition of ModelNote software through a single purchase, granting users unrestricted and perpetual access to its comprehensive functionalities. Tailored for independent creators, entrepreneurs, and small businesses, ModelNote empowers users to create compelling web pages and online portfolios.</p>
          <p className="mb-4">This license entails a straightforward and flexible arrangement, exempting users from recurring fees or subscriptions. However, it is important to acknowledge that the licensor retains the right to terminate the license without conditions or prerequisites. This termination provision enables the licensor to exercise control over software distribution and utilization.</p>
          <p className="mb-4">Opting for the ModelNote Software License enables users to enjoy the benefits of the software while recognizing the licensor's unrestricted termination rights, which provide adaptability and address potential unforeseen circumstances.</p>

        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Refunds</h2>
          <p className="mb-4">Due to the nature of digital products, the ModelNote boilerplate cannot be refunded or exchanged once access is granted.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Disclaimer</h2>

        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Warranties and Limitation of Liability</h2>
          <p className="mb-4">ModelNote does not give any warranty, guarantee or other term as to the quality, fitness for purpose or otherwise of the software. ModelNote shall not be liable to you by reason of any representation (unless fraudulent), or any implied warranty, condition or other term, or any duty at common law, for any loss of profit or any indirect, special or consequential loss, damage, costs, expenses or other claims (whether caused by ModelNote's negligence or the negligence of its servants or agents or otherwise) which arise out of or in connection with the provision of any goods or services by ModelNote. ModelNote shall not be liable or deemed to be in breach of contract by reason of any delay in performing, or failure to perform, any of its obligations if the delay or failure was due to any cause beyond its reasonable control. Notwithstanding contrary clauses in this Agreement, in the event that ModelNote are deemed liable to you for breach of this Agreement, you agree that ModelNote's liability is limited to the amount actually paid by you for your services or software, which amount calculated in reliance upon this clause. You hereby release ModelNote from any and all obligations, liabilities and claims in excess of this limitation.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Responsibilities</h2>
          <p className="mb-4">ModelNote is not responsible for what the user does with the user-generated content.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Price Adjustments</h2>
          <p className="mb-4">As we continue to improve ModelNote and expand our offerings, the price may increase. The discount is provided to help customers secure the current price without being surprised by future increases.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. General Terms and Law</h2>
          <p className="mb-4">This Agreement is governed by the laws of Singapore. You acknowledge that no joint venture, partnership, employment, or agency relationship exists between you and ModelNote as a result of your use of these services. You agree not to hold yourself out as a representative, agent or employee of ModelNote. You agree that ModelNote will not be liable by reason of any representation, act or omission to act by you.</p>
        </section>

        <p className="text-sm text-center mt-8">Last updated: 21 June 2024.</p>
      </div>
    </div>
  );
};

export default TosPage;
