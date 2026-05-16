import ContactHero from "../../components/contact/ContactHero";
import ContactSection from "../../components/contact/ContactSection";

export const Contact = () => {
  return (
    <div className="min-h-screen bg-[#050816] text-white">
      {/* Hero Header */}
      <ContactHero />
      {/* from section */}
      <ContactSection />
    </div>
  );
};
