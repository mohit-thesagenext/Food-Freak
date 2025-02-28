import React from "react";
import Header from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  const faqs = [
    {
      question: "How do I place an order?",
      answer:
        "Simply browse restaurants, select your items, add them to cart, and proceed to checkout. You can track your order status in real-time.",
    },
    {
      question: "What are the delivery charges?",
      answer:
        "Delivery charges vary based on your location and the restaurant. The exact fee will be shown at checkout before you place your order.",
    },
    {
      question: "How long does delivery take?",
      answer:
        "Delivery times vary depending on your location and the restaurant. You can see the estimated delivery time for each restaurant while browsing.",
    },
    {
      question: "Can I schedule an order for later?",
      answer:
        "Yes, you can schedule orders for later delivery. Select your preferred delivery time during checkout.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, debit cards, and digital wallets. Cash on delivery is also available in select areas.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Once your order is confirmed, you can track its status in real-time through the 'Orders' section in your account.",
    },
    {
      question: "What if I need to cancel my order?",
      answer:
        "You can cancel your order within 5 minutes of placing it. After that, please contact our customer support for assistance.",
    },
    {
      question: "Do you have a minimum order value?",
      answer:
        "Minimum order values vary by restaurant. You can see the minimum order amount on each restaurant's page.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-[72px] pb-12">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <div className="text-center py-12">
            <h1 className="text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600">
              Find answers to common questions about our service
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </main>
      <Footer />
    </div>
  );
}
