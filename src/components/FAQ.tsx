import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const faqs = [
    {
      question: "What is VCoin and how does it work?",
      answer: "VCoin is a utility token that connects investors and entrepreneurs through hybrid funding. Projects can raise both cash and VCoin, creating aligned incentives between founders and their community. Token holders can invest in curated projects and benefit if VCoin's value increases."
    },
    {
      question: "How do I participate in the presale?",
      answer: "To participate in the presale, connect your wallet to our platform, choose your payment method (ETH, USDT, or Credit Card), enter the amount you want to purchase, and complete the transaction. Your VCoin tokens will be distributed after the presale ends."
    },
    {
      question: "What are the benefits of holding VCoin?",
      answer: "VCoin holders get early access to projects, better allocation terms, and exclusive perks. As the token value grows, your investment power increases. You can also participate in platform governance and access premium features."
    },
    {
      question: "How does hybrid funding work?",
      answer: "Projects set both cash and VCoin goals. If VCoin's price rises during the campaign, founders can capture more value while investors benefit from increased token value. Excess handling rules are transparent and defined upfront."
    },
    {
      question: "Is VCoin secure and compliant?",
      answer: "Yes, VCoin operates with full regulatory compliance including KYC/AML verification. Our smart contracts are audited, and we work with trusted custody partners. All project listings undergo thorough due diligence."
    },
    {
      question: "What types of projects can I invest in?",
      answer: "VCoin features curated projects across various sectors including startups, real estate, innovation projects, and more. Each project undergoes due diligence and offers clear terms, risk assessments, and progress tracking."
    }
  ];

  return (
    <section id="faq" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get answers to the most common questions about VCoin, our platform, and hybrid funding model.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <Card 
              key={index} 
              className={`bg-card/50 backdrop-blur-md border-primary/10 transition-all duration-300 ${
                openIndex === index ? 'border-primary/30 glow-primary' : 'hover:border-primary/20'
              }`}
            >
              <CardContent className="p-0">
                <Button
                  variant="ghost"
                  className="w-full p-6 text-left justify-between hover:bg-transparent"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <span className="font-semibold text-lg">{faq.question}</span>
                  <span className={`text-2xl transition-transform duration-300 ${
                    openIndex === index ? 'rotate-45' : ''
                  }`}>
                    +
                  </span>
                </Button>
                
                {openIndex === index && (
                  <div className="px-6 pb-6 pt-0">
                    <div className="w-full h-px bg-border mb-4" />
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">Still have questions?</p>
          <Button variant="outline" size="lg">
            Contact Support
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;