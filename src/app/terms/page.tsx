import Section from '@/components/Section';
import SectionTitle from '@/components/SectionTitle';

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-dark-bg pt-20">
      <Section background="dark">
        <div className="max-w-4xl mx-auto">
          <SectionTitle subtitle="Last updated: December 25, 2025">
            Terms and Conditions
          </SectionTitle>

          <div className="prose prose-invert max-w-none">
            <div className="bg-dark-elevated rounded-2xl p-8 space-y-6 text-text-secondary">
              
              <section>
                <h2 className="text-2xl font-bold text-text-primary mb-4">1. Acceptance of Terms</h2>
                <p>
                  By accessing and using the Rasoi Gadget website and purchasing our digital products, you accept and agree to be bound by the terms and provision of this agreement.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-text-primary mb-4">2. Digital Products</h2>
                <p>
                  Rasoi Gadget offers digital cookbook products in PDF format. Upon successful payment, you will receive immediate access to download your purchased ebooks.
                </p>
                <p className="mt-2">
                  All digital products are delivered electronically and are available for download immediately after purchase confirmation.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-text-primary mb-4">3. No Refund Policy</h2>
                <div className="bg-urgent-red/10 border border-urgent-red/30 rounded-lg p-4 my-4">
                  <p className="font-semibold text-urgent-red mb-2">Important Notice:</p>
                  <p>
                    <strong>All sales of digital products are final.</strong> Due to the nature of digital products and the immediate access provided upon purchase, we do not offer refunds, returns, or exchanges.
                  </p>
                </div>
                <p className="mt-4">
                  By completing your purchase, you acknowledge and agree that:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Digital products cannot be returned once downloaded or accessed</li>
                  <li>You have reviewed the product description and sample content before purchasing</li>
                  <li>All sales are final and non-refundable</li>
                  <li>No refunds will be issued for any reason after purchase completion</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-text-primary mb-4">4. Intellectual Property</h2>
                <p>
                  All content, including but not limited to recipes, images, text, and design, is the property of Rasoi Gadget and is protected by copyright laws. You may not:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Reproduce, distribute, or share the digital products with others</li>
                  <li>Modify, adapt, or create derivative works</li>
                  <li>Use the content for commercial purposes</li>
                  <li>Upload or share the files on any public platform or file-sharing service</li>
                </ul>
                <p className="mt-4">
                  The digital products are licensed for personal use only. Sharing or distributing the files is strictly prohibited and may result in legal action.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-text-primary mb-4">5. Payment and Pricing</h2>
                <p>
                  All prices are listed in Indian Rupees (INR) and include applicable taxes (GST). Payment is processed securely through Razorpay. We accept major credit cards, debit cards, UPI, and net banking.
                </p>
                <p className="mt-2">
                  Prices are subject to change without notice. However, any price changes will not affect orders that have already been placed.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-text-primary mb-4">6. Technical Support</h2>
                <p>
                  If you experience technical issues with downloading or accessing your purchased products, please contact us at{' '}
                  <a href="mailto:help@rasoigadget.com" className="text-satvik-green hover:underline">
                    help@rasoigadget.com
                  </a>
                  . We will assist you in resolving technical problems.
                </p>
                <p className="mt-2 text-text-muted text-sm">
                  Note: Technical support does not constitute grounds for a refund. We will help you access your purchased products but cannot issue refunds for digital products.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-text-primary mb-4">7. Disclaimer</h2>
                <p>
                  The recipes and nutritional information provided in our digital products are for informational purposes only. We are not medical professionals, and our content should not be considered medical advice.
                </p>
                <p className="mt-2">
                  Always consult with a qualified healthcare provider before making significant changes to your diet, especially if you have any health conditions or concerns.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-text-primary mb-4">8. Limitation of Liability</h2>
                <p>
                  Rasoi Gadget shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our digital products.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-text-primary mb-4">9. Changes to Terms</h2>
                <p>
                  We reserve the right to modify these terms and conditions at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website after changes constitutes acceptance of the modified terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-text-primary mb-4">10. Contact Information</h2>
                <p>
                  If you have any questions about these Terms and Conditions, please contact us:
                </p>
                <div className="mt-4 bg-dark-surface rounded-lg p-4">
                  <p><strong>Email:</strong> <a href="mailto:help@rasoigadget.com" className="text-satvik-green hover:underline">help@rasoigadget.com</a></p>
                  <p className="mt-2"><strong>Website:</strong> <a href="https://rasoigadget.com" className="text-satvik-green hover:underline">rasoigadget.com</a></p>
                </div>
              </section>

              <div className="mt-8 pt-6 border-t border-gold/20">
                <p className="text-sm text-text-muted text-center">
                  By purchasing from Rasoi Gadget, you acknowledge that you have read, understood, and agree to these Terms and Conditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}
