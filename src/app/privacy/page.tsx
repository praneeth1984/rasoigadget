import Section from '@/components/Section';
import SectionTitle from '@/components/SectionTitle';
import Header from '@/components/Header';

export default function PrivacyPage() {
  const lastUpdated = "December 25, 2025";

  return (
    <main className="min-h-screen bg-dark-bg">
      <Header />
      
      <div className="pt-24 pb-16">
        <Section>
          <div className="max-w-4xl mx-auto">
            <SectionTitle subtitle={`Last Updated: ${lastUpdated}`}>
              Privacy Policy
            </SectionTitle>
            
            <div className="prose prose-invert prose-sm md:prose-base max-w-none text-text-secondary">
              <p className="mb-6">
                At Rasoi Gadget, accessible from rasoigadget.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Rasoi Gadget and how we use it.
              </p>

              <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">1. Information We Collect</h2>
              <p className="mb-4">
                We collect several different types of information for various purposes to provide and improve our service to you:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Personal identification information (Name, email address, phone number, etc.)</li>
                <li>Payment details (processed through secure third-party gateways like Razorpay)</li>
                <li>Usage data and website cookies</li>
              </ul>

              <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">2. How We Use Your Information</h2>
              <p className="mb-4">
                We use the information we collect in various ways, including to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Provide, operate, and maintain our website</li>
                <li>Improve, personalize, and expand our website</li>
                <li>Understand and analyze how you use our website</li>
                <li>Develop new products, services, features, and functionality</li>
                <li>Communicate with you, either directly or through one of our partners</li>
                <li>Process your transactions and send you related information</li>
              </ul>

              <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">3. Log Files</h2>
              <p className="mb-6">
                Rasoi Gadget follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks.
              </p>

              <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">4. Cookies and Web Beacons</h2>
              <p className="mb-6">
                Like any other website, Rasoi Gadget uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
              </p>

              <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">5. Payment Security</h2>
              <p className="mb-6">
                We use Razorpay for processing payments. We do not store or collect your payment card details. That information is provided directly to our third-party payment processors whose use of your personal information is governed by their Privacy Policy.
              </p>

              <h2 className="text-xl font-bold text-text-primary mt-8 mb-4">6. Contact Us</h2>
              <p className="mb-6">
                If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at support@rasoigadget.com.
              </p>
            </div>
          </div>
        </Section>
      </div>
    </main>
  );
}
