"use client";

import { motion } from "framer-motion";
import { Check, Star, Crown, Users, Zap } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "0",
    currency: "SOL",
    period: "forever",
    description: "Perfect for getting started with tontines",
    icon: Users,
    color: "gray",
    features: [
      "Join up to 2 tontines",
      "Basic reputation tracking",
      "Standard support",
      "Mobile app access",
      "Transaction history",
      "Community forums"
    ],
    limitations: [
      "Limited to small tontines (≤10 members)",
      "Standard bidding priority"
    ]
  },
  {
    name: "Premium",
    price: "0.1",
    currency: "SOL",
    period: "per month",
    description: "Enhanced features for active savers",
    icon: Star,
    color: "emerald",
    popular: true,
    features: [
      "Join unlimited tontines",
      "Advanced reputation system",
      "Priority support",
      "Mobile & web access",
      "Detailed analytics",
      "Early access to new features",
      "Custom notifications",
      "Export transaction data"
    ],
    limitations: []
  },
  {
    name: "Organizer",
    price: "0.5",
    currency: "SOL",
    period: "per month",
    description: "For tontine organizers and power users",
    icon: Crown,
    color: "purple",
    features: [
      "Everything in Premium",
      "Create & manage tontines",
      "Advanced member screening",
      "Custom tontine rules",
      "Organizer dashboard",
      "Member management tools",
      "Revenue sharing (2% of fees)",
      "White-label options",
      "API access",
      "Dedicated account manager"
    ],
    limitations: []
  }
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-white">
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
            Simple, Transparent <span className="text-emerald-600">Pricing</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Choose the plan that fits your tontine participation needs. All plans include core features 
            with transparent SOL-based pricing.
          </p>
          
          <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium">
            <Zap className="w-4 h-4" />
            <span>All transactions powered by Solana - ultra-low fees guaranteed</span>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const colorClasses = {
              gray: {
                bg: "bg-gray-50",
                border: "border-gray-200",
                icon: "bg-gray-500",
                button: "bg-gray-600 hover:bg-gray-700"
              },
              emerald: {
                bg: "bg-emerald-50",
                border: "border-emerald-200",
                icon: "bg-emerald-500",
                button: "bg-emerald-600 hover:bg-emerald-700"
              },
              purple: {
                bg: "bg-purple-50",
                border: "border-purple-200",
                icon: "bg-purple-500",
                button: "bg-purple-600 hover:bg-purple-700"
              }
            };

            const colors = colorClasses[plan.color as keyof typeof colorClasses];

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative ${colors.bg} ${colors.border} border-2 rounded-3xl p-8 ${
                  plan.popular ? 'ring-4 ring-emerald-200 scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div className={`w-16 h-16 ${colors.icon} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  
                  <div className="mb-6">
                    <div className="flex items-baseline justify-center space-x-2">
                      <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-lg font-semibold text-gray-600">{plan.currency}</span>
                    </div>
                    <div className="text-sm text-gray-500">{plan.period}</div>
                  </div>

                  <button className={`w-full ${colors.button} text-white py-3 px-6 rounded-xl font-semibold transition-all transform hover:scale-105`}>
                    {plan.name === "Free" ? "Get Started" : "Choose Plan"}
                  </button>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Features included:</h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {plan.limitations.length > 0 && (
                    <div className="pt-4 border-t border-gray-200">
                      <h5 className="font-medium text-gray-600 text-sm mb-2">Limitations:</h5>
                      <ul className="space-y-2">
                        {plan.limitations.map((limitation, limitIndex) => (
                          <li key={limitIndex} className="text-gray-500 text-sm">
                            • {limitation}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Pricing Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gray-50 rounded-3xl p-8 lg:p-12"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Transparent Fee Structure
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-700">Tontine Transaction Fee</span>
                  <span className="font-semibold text-gray-900">~$0.00025 SOL</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-700">Platform Fee (Premium/Organizer)</span>
                  <span className="font-semibold text-gray-900">1% of contribution</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-700">Withdrawal Fee</span>
                  <span className="font-semibold text-gray-900">Network fee only</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-700">Hidden Fees</span>
                  <span className="font-semibold text-emerald-600">$0.00</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl">
              <h4 className="text-xl font-bold text-gray-900 mb-4">
                Why SOL Pricing?
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-emerald-500 mt-0.5" />
                  <span className="text-gray-700 text-sm">
                    Stable pricing regardless of fiat currency fluctuations
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-emerald-500 mt-0.5" />
                  <span className="text-gray-700 text-sm">
                    Instant payments with no banking delays
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-emerald-500 mt-0.5" />
                  <span className="text-gray-700 text-sm">
                    Global accessibility without currency conversion
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-emerald-500 mt-0.5" />
                  <span className="text-gray-700 text-sm">
                    Transparent, on-chain payment verification
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
