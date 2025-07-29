"use client";

import { motion } from "framer-motion";
import { 
  Zap, 
  Globe, 
  Shield, 
  Users, 
  TrendingUp, 
  Clock,
  DollarSign,
  CheckCircle
} from "lucide-react";

const benefits = [
  {
    icon: Zap,
    title: "Lightning Fast & Low Cost",
    description: "Solana's high-performance blockchain enables sub-second transactions with minimal fees, making micro-contributions economical.",
    stats: "~400ms transaction time, $0.00025 average fee",
    color: "emerald"
  },
  {
    icon: Globe,
    title: "Global Accessibility",
    description: "Participate in tontines with people worldwide. No geographical restrictions, no traditional banking requirements.",
    stats: "Available in 180+ countries",
    color: "blue"
  },
  {
    icon: Shield,
    title: "Transparency & Security",
    description: "Smart contracts ensure complete transparency. All transactions, bids, and payouts are recorded on the immutable blockchain.",
    stats: "100% transparent operations",
    color: "purple"
  },
  {
    icon: Users,
    title: "Community Building",
    description: "Connect with like-minded savers globally. Build lasting relationships while achieving your financial goals together.",
    stats: "Join communities of 10-50 members",
    color: "pink"
  }
];

const comparisonData = [
  {
    feature: "Transaction Speed",
    traditional: "Days to weeks",
    sontine: "~400ms",
    improvement: "99.9% faster"
  },
  {
    feature: "Transaction Fees",
    traditional: "$5-50 per transfer",
    sontine: "$0.00025",
    improvement: "99.99% cheaper"
  },
  {
    feature: "Geographic Reach",
    traditional: "Local community only",
    sontine: "Global access",
    improvement: "Unlimited reach"
  },
  {
    feature: "Transparency",
    traditional: "Trust-based records",
    sontine: "Blockchain verified",
    improvement: "100% transparent"
  }
];

export function BenefitsSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Why Choose <span className="text-emerald-600">Sontine</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the advantages of blockchain-powered tontines over traditional rotating savings groups.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            const colorClasses = {
              emerald: "from-emerald-500 to-emerald-600",
              blue: "from-blue-500 to-blue-600",
              purple: "from-purple-500 to-purple-600",
              pink: "from-pink-500 to-pink-600"
            };

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${colorClasses[benefit.color as keyof typeof colorClasses]} rounded-2xl flex items-center justify-center mb-6`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {benefit.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-4">
                  {benefit.description}
                </p>
                
                <div className="bg-gray-50 px-4 py-2 rounded-lg inline-block">
                  <span className="text-sm font-medium text-gray-700">
                    {benefit.stats}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-lg overflow-hidden"
        >
          <div className="bg-gradient-to-r from-emerald-600 to-purple-600 p-8 text-white text-center">
            <h3 className="text-3xl font-bold mb-2">
              Traditional Tontines vs Sontine
            </h3>
            <p className="text-emerald-100">
              See how blockchain technology transforms rotating savings
            </p>
          </div>

          <div className="p-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Feature</th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-600">Traditional</th>
                    <th className="text-center py-4 px-6 font-semibold text-emerald-600">Sontine</th>
                    <th className="text-center py-4 px-6 font-semibold text-purple-600">Improvement</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-6 font-medium text-gray-900">
                        {row.feature}
                      </td>
                      <td className="py-4 px-6 text-center text-gray-600">
                        {row.traditional}
                      </td>
                      <td className="py-4 px-6 text-center font-semibold text-emerald-600">
                        {row.sontine}
                      </td>
                      <td className="py-4 px-6 text-center font-semibold text-purple-600">
                        {row.improvement}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Financial Inclusion Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-emerald-100 to-purple-100 p-8 lg:p-12 rounded-3xl">
            <TrendingUp className="w-16 h-16 text-emerald-600 mx-auto mb-6" />
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Democratizing Financial Services
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              Sontine brings traditional community savings into the digital age, making financial services 
              accessible to anyone with a smartphone and internet connection. No bank account required, 
              no credit checks, no geographical limitations.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="flex items-center justify-center space-x-2 text-emerald-700">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">No Bank Account Needed</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-emerald-700">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Global Participation</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-emerald-700">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Instant Access</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
