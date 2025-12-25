'use client';

import { useState } from 'react';

const faqs = [
  {
    question: "What exactly is the Satvik 3-Book Collection?",
    answer: "It's a comprehensive digital collection of 250+ ancient Indian recipes designed to detoxify your body and mind. It includes three distinct guides: Satvik Foundations (Main meals), Celebration & Festivities (Special occasions), and Daily Wellness (Healing recipes)."
  },
  {
    question: "Is this a physical book or a digital download?",
    answer: "This is an instant digital download in PDF format. You will receive an email with the download link immediately after your payment is successful. This allows you to start your journey right away on your phone, tablet, or computer!"
  },
  {
    question: "Do these recipes contain onion or garlic?",
    answer: "No. All 250+ recipes are strictly Satvik, meaning they are prepared without onion, garlic, eggs, or meat. We use natural herbs and spices to ensure every meal is bursting with flavor while remaining pure and easy to digest."
  },
  {
    question: "Are the ingredients difficult to find?",
    answer: "Not at all! We use simple, wholesome ingredients available in any local Indian grocery store or vegetable market. No expensive 'superfoods' or imported items are required."
  },
  {
    question: "I'm a complete beginner. Can I follow these recipes?",
    answer: "Yes! Each recipe comes with clear, step-by-step instructions and beautiful photos. We've also included a 'Satvik Foundations' guide specifically to help beginners understand the principles and set up their kitchen for success."
  },
  {
    question: "How long can I access the download link?",
    answer: "Once you purchase the collection, the links are yours forever. You can download the files as many times as you need and save them to all your devices for easy access in the kitchen."
  },
  {
    question: "What is your refund policy?",
    answer: "Due to the digital nature of our products, we have a 'No Refund Policy' as stated in our terms. This is because the content is delivered instantly and cannot be 'returned' like a physical item. However, we are confident you'll love the recipes!"
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div id="faq" className="max-w-3xl mx-auto">
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className="group bg-dark-elevated rounded-2xl border border-royal-purple/20 overflow-hidden transition-all hover:border-gold/30"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-5 text-left flex items-center justify-between gap-4"
            >
              <h3 className="text-lg font-bold text-text-primary group-hover:text-gold transition-colors">
                {faq.question}
              </h3>
              <div className={`w-8 h-8 rounded-full bg-dark-surface flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                <svg className="w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>
            
            <div 
              className={`transition-all duration-300 ease-in-out ${
                openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-6 pb-6 text-text-secondary leading-relaxed border-t border-royal-purple/10 pt-4">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
