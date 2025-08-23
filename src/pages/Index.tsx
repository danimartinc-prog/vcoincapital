import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Tokenomics from "@/components/Tokenomics";
import Roadmap from "@/components/Roadmap";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <Tokenomics />
        <Roadmap />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
