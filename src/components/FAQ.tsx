import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const faqs = [
    {
      question: "What is CryptoICO and how does it work?",
      answer: "CryptoICO is a revolutionary PayFi platform that enables users to send fiat payments to any bank account worldwide using cryptocurrency. Simply connect your wallet, select the recipient bank details, and our protocol handles the conversion and transfer automatically."
    },
    {
      question: "How do I participate in the presale?",
      answer: "To participate in the presale, connect your wallet to our platform, choose your payment method (ETH, USDT, or Credit Card), enter the amount you want to purchase, and complete the transaction. Your $RTX tokens will be distributed after the presale ends."
    },
    {
      question: "What are the tokenomics of $RTX?",
      answer: "The total supply of $RTX is 1 billion tokens. 40% is allocated for presale, 25% for liquidity, 15% for development, 10% for marketing, and 10% for the team. This distribution ensures sustainable growth and long-term value creation."
    },
    {
      question: "When will $RTX be listed on exchanges?",
      answer: "We are planning major CEX listings in Q4 2025 following our mainnet launch. We've already secured partnerships with several top-tier exchanges and will announce them as we get closer to the launch date."
    },
    {
      question: "Is CryptoICO secure and audited?",
      answer: "Yes, CryptoICO has undergone comprehensive security audits by leading blockchain security firms. Our smart contracts are audited, and we implement military-grade encryption and decentralized architecture to ensure maximum security."
    },
    {
      question: "What countries will CryptoICO support?",
      answer: "CryptoICO will initially support major markets including US, EU, UK, and Asia-Pacific regions. We're continuously expanding our network of banking partners to provide global coverage for cross-border payments."
    }
  ];

  return (
    <section id="faq" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Frequently Asked <span className="bg-gradient-primary bg-clip-text text-transparent">Questions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get answers to the most common questions about CryptoICO, our presale, and the future of cross-border payments.
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