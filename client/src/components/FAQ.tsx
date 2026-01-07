import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How far in advance should I book?",
    answer: "We recommend booking at least 2-3 days in advance for airport transfers and 1-2 weeks for tours to ensure availability. However, we'll do our best to accommodate last-minute requests whenever possible.",
  },
  {
    question: "What is your cancellation policy?",
    answer: "Free cancellation up to 24 hours before your scheduled service. Cancellations within 24 hours may incur a 50% charge. No-shows will be charged the full amount. We understand emergencies happen - please contact us to discuss special circumstances.",
  },
  {
    question: "Are your vehicles air-conditioned?",
    answer: "Yes, all our vehicles are modern, well-maintained, and fully air-conditioned for your comfort. We regularly service our fleet to ensure reliability and safety.",
  },
  {
    question: "Do you offer group discounts?",
    answer: "Yes! We offer competitive rates for groups of 6 or more passengers. Contact us with your group size and itinerary for a customized quote. Corporate and tour operator rates are also available.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept cash (South African Rand), credit/debit cards (Visa, Mastercard), and bank transfers. Full payment or deposit may be required for tours. We'll provide clear payment instructions when you book.",
  },
  {
    question: "Are drivers licensed and insured?",
    answer: "Absolutely. All our drivers hold valid professional driving permits and undergo regular training. All vehicles are fully insured, and we maintain comprehensive liability coverage for your peace of mind.",
  },
  {
    question: "Do wine tours include tastings?",
    answer: "Yes! Our wine tours include visits to 3-4 wine estates with tastings at each location. Some estates may charge tasting fees (usually R50-150) which aren't included in the tour price. Lunch can be arranged at select estates.",
  },
  {
    question: "What should I bring on a safari tour?",
    answer: "We recommend comfortable clothing in neutral colors, a hat, sunscreen, sunglasses, binoculars, and a camera. Early morning safaris can be cool, so bring a light jacket. We provide water, but feel free to bring snacks.",
  },
  {
    question: "Can you accommodate special requests?",
    answer: "Yes! We're happy to customize tours, accommodate dietary restrictions, provide child seats, assist with mobility needs, and more. Just let us know your requirements when booking and we'll do our best to accommodate.",
  },
  {
    question: "Do you provide airport meet and greet service?",
    answer: "Yes! For airport transfers, your driver will meet you at the arrivals hall holding a sign with your name. We track flight times, so if your flight is delayed, we'll adjust accordingly at no extra charge.",
  },
];

export default function FAQ() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" data-testid="text-faq-title">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about our services
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border rounded-lg px-6 hover-elevate"
              data-testid={`faq-item-${index}`}
            >
              <AccordionTrigger className="text-left hover:no-underline py-4">
                <span className="font-semibold">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Still have questions? We're here to help!
          </p>
          <a 
            href="tel:+27795519945"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
          >
            Call us at +27 (0)79 551 9945
          </a>
        </div>
      </div>
    </section>
  );
}
