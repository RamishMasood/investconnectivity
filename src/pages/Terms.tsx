import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
        <div className="prose max-w-none">
          <p className="text-gray-600 mb-4">Last updated: {new Date().toLocaleDateString()}</p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 mb-4">
              By accessing and using InvestSphere, you agree to be bound by these Terms of Service
              and all applicable laws and regulations.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. User Responsibilities</h2>
            <p className="text-gray-600 mb-4">
              Users of InvestSphere agree to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Provide accurate information</li>
              <li>Maintain confidentiality of account credentials</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Not misuse the platform or its services</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Investment Risks</h2>
            <p className="text-gray-600 mb-4">
              All investments carry risks. Users acknowledge that they understand these risks
              and make investment decisions at their own discretion.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;