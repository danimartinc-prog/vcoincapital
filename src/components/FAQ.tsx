import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const FAQ = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const faqs = [
    {
      question: t('faq.questions.whatIsVCoin'),
      answer: t('faq.questions.whatIsVCoinAnswer')
    },
    {
      question: t('faq.questions.howToParticipate'),
      answer: t('faq.questions.howToParticipateAnswer')
    },
    {
      question: t('faq.questions.benefits'),
      answer: t('faq.questions.benefitsAnswer')
    },
    {
      question: t('faq.questions.hybridFunding'),
      answer: t('faq.questions.hybridFundingAnswer')
    },
    {
      question: t('faq.questions.security'),
      answer: t('faq.questions.securityAnswer')
    },
    {
      question: t('faq.questions.projectTypes'),
      answer: t('faq.questions.projectTypesAnswer')
    }
  ];

  return (
    <section id="faq" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            {t('faq.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('faq.subtitle')}
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
          <p className="text-muted-foreground mb-4">{t('faq.stillHaveQuestions')}</p>
          <Button variant="outline" size="lg">
            {t('faq.contactSupport')}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;