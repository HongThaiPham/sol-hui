"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "What is a tontine and how does Sontine work?",
    answer: "A tontine is a rotating savings and credit association where members contribute regularly to a common pool, and each member receives the full pot in turn. Sontine digitizes this traditional practice using Solana blockchain smart contracts for transparency, automation, and global accessibility."
  },
  {
    question: "How is Sontine different from traditional hụi groups?",
    answer: "Unlike traditional hụi that require physical meetings and cash transactions, Sontine operates entirely digitally on the Solana blockchain. This provides global accessibility, automated operations, transparent record-keeping, instant settlements, and eliminates the need for a trusted intermediary."
  },
  {
    question: "What wallet do I need to use Sontine?",
    answer: "Sontine supports all major Solana wallets including Phantom, Solflare, Backpack, and Glow. You'll need a Solana wallet with some SOL for transaction fees and tontine contributions. We recommend Phantom for beginners due to its user-friendly interface."
  },
  {
    question: "How much does it cost to use Sontine?",
    answer: "Sontine offers a free tier for basic usage. Premium plans start at 0.1 SOL per month. Transaction fees are minimal (around $0.00025 per transaction) thanks to Solana's low-cost infrastructure. There's also a small platform fee of 1% on contributions for premium features."
  },
  {
    question: "Is Sontine secure and can I trust it with my money?",
    answer: "Yes, Sontine is built on Solana's secure blockchain with smart contracts that are audited and transparent. All transactions are recorded on-chain and cannot be altered. Your funds are held in smart contracts, not by Sontine, providing trustless operation. However, as with any financial service, only invest what you can afford to lose."
  },
  {
    question: "How do I join a tontine group?",
    answer: "Connect your Solana wallet to Sontine, browse available tontine groups, review the terms (contribution amount, duration, member count), and apply to join. Some groups may require reputation scores or approval from organizers. Once accepted, you'll receive instructions for making contributions."
  },
  {
    question: "What happens if someone doesn't pay their contribution?",
    answer: "Smart contracts automatically handle contributions and can enforce payment schedules. If a member fails to contribute, they may be removed from the tontine and their reputation score affected. The remaining members can vote on how to proceed, and the smart contract ensures fair distribution of any remaining funds."
  },
  {
    question: "Can I participate from any country?",
    answer: "Sontine is available globally wherever Solana blockchain access is permitted. However, you should check your local regulations regarding cryptocurrency use and financial services. We support 180+ countries and multiple languages to ensure global accessibility."
  },
  {
    question: "How does the bidding system work?",
    answer: "When it's time for a payout round, eligible members can submit sealed bids indicating how much they're willing to pay to receive the pot early. The highest bidder wins and receives the pot minus their bid amount. This creates a fair market-based system for early access to funds."
  },
  {
    question: "What is the reputation system?",
    answer: "Your reputation score is based on your participation history, payment reliability, and community feedback. Higher reputation scores give you access to premium tontine groups, better bidding priority, and lower platform fees. It's built on-chain for transparency and portability across the platform."
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center space-x-3 mb-6">
            <HelpCircle className="w-12 h-12 text-emerald-600" />
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
              Frequently Asked <span className="text-emerald-600">Questions</span>
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get answers to common questions about Sontine, tontines, and blockchain-powered savings.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-sm overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-8">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <ChevronUp className="w-6 h-6 text-emerald-600" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gray-400" />
                  )}
                </div>
              </button>
              
              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? "auto" : 0,
                  opacity: openIndex === index ? 1 : 0
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-8 pb-6">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Additional Help */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Our support team is here to help you get started with Sontine and answer any questions about tontines.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-colors">
                Contact Support
              </button>
              <button className="border-2 border-emerald-600 text-emerald-600 px-6 py-3 rounded-xl font-semibold hover:bg-emerald-600 hover:text-white transition-colors">
                Join Community
              </button>
            </div>
          </div>
        </motion.div>

        {/* Vietnamese FAQ Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <p className="text-blue-800 font-medium mb-2">
              Câu hỏi thường gặp bằng tiếng Việt
            </p>
            <p className="text-blue-600 text-sm">
              Chúng tôi cung cấp hỗ trợ đầy đủ bằng tiếng Việt cho cộng đồng người Việt. 
              Liên hệ với chúng tôi để được hỗ trợ về hụi blockchain.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
