import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RoadmapComponent from "@/components/Roadmap";
import SEO from "@/components/SEO";

const Roadmap = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        page="roadmap"
        title="Roadmap - VCoin Platform" 
        description="Discover VCoin's strategic roadmap for revolutionizing cross-border payments and establishing the leading PayFi solution."
      />
      <Header />
      <main className="pt-20">
        <RoadmapComponent />
      </main>
      <Footer />
    </div>
  );
};

export default Roadmap;
