"use client";

import { motion } from "framer-motion";
import { 
  UserPlus, 
  Coins, 
  Users, 
  Trophy, 
  ArrowRight, 
  Wallet,
  Calendar,
  DollarSign
} from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Join a Tontine",
    description: "Connect your Solana wallet and browse available tontine groups. Choose based on contribution amount, duration, and member reputation.",
    details: [
      "Connect Solana wallet (Phantom, Solflare, etc.)",
      "Browse available tontines by criteria",
      "Review group rules and member profiles",
      "Submit application with reputation score"
    ]
  },
  {
    icon: Coins,
    title: "Make Contributions",
    description: "Set up automated SOL contributions according to the tontine schedule. Smart contracts ensure timely and accurate payments.",
    details: [
      "Authorize smart contract for contributions",
      "Set up automatic payment schedule",
      "Receive confirmation for each contribution",
      "Track your contribution history"
    ]
  },
  {
    icon: Users,
    title: "Participate in Bidding",
    description: "When it's bidding time, submit your bid to receive the pot early. Transparent process ensures fairness for all members.",
    details: [
      "Receive bidding round notifications",
      "Submit sealed bids through the app",
      "View bidding results transparently",
      "Automatic winner selection and payout"
    ]
  },
  {
    icon: Trophy,
    title: "Receive Payouts",
    description: "Smart contracts automatically distribute funds to winners. Build reputation through consistent participation and reliability.",
    details: [
      "Instant payout to winner's wallet",
      "Transparent transaction records",
      "Reputation score updates",
      "Continue until tontine completion"
    ]
  }
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 bg-white">
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
            How <span className="text-emerald-600">Sontine</span> Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the seamless process of blockchain-powered tontines. 
            From joining to receiving payouts, everything is automated and transparent.
          </p>
        </motion.div>

        {/* Steps Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-emerald-200 via-purple-200 to-yellow-200"></div>

          <div className="space-y-16">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center ${
                    isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div className={`lg:w-5/12 ${isEven ? 'lg:pr-16' : 'lg:pl-16'}`}>
                    <div className="bg-gray-50 p-8 rounded-2xl">
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="w-12 h-12 bg-emerald-500 text-white rounded-xl flex items-center justify-center">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-emerald-600 mb-1">
                            Step {index + 1}
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900">
                            {step.title}
                          </h3>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {step.description}
                      </p>

                      <ul className="space-y-2">
                        {step.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-center space-x-3 text-sm text-gray-600">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Timeline Node */}
                  <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-white border-4 border-emerald-200 rounded-full items-center justify-center z-10">
                    <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{index + 1}</span>
                    </div>
                  </div>

                  {/* Visual/Illustration */}
                  <div className={`lg:w-5/12 ${isEven ? 'lg:pl-16' : 'lg:pr-16'} mt-8 lg:mt-0`}>
                    <div className="bg-gradient-to-br from-emerald-100 to-purple-100 p-8 rounded-2xl">
                      <div className="text-center">
                        <Icon className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
                        <div className="space-y-3">
                          {index === 0 && (
                            <div className="flex items-center justify-center space-x-2">
                              <Wallet className="w-5 h-5 text-purple-600" />
                              <span className="text-sm font-medium text-gray-700">Wallet Connected</span>
                            </div>
                          )}
                          {index === 1 && (
                            <div className="flex items-center justify-center space-x-2">
                              <Calendar className="w-5 h-5 text-purple-600" />
                              <span className="text-sm font-medium text-gray-700">Automated Schedule</span>
                            </div>
                          )}
                          {index === 2 && (
                            <div className="flex items-center justify-center space-x-2">
                              <Users className="w-5 h-5 text-purple-600" />
                              <span className="text-sm font-medium text-gray-700">Fair Bidding</span>
                            </div>
                          )}
                          {index === 3 && (
                            <div className="flex items-center justify-center space-x-2">
                              <DollarSign className="w-5 h-5 text-purple-600" />
                              <span className="text-sm font-medium text-gray-700">Instant Payout</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-emerald-50 p-8 rounded-2xl border border-emerald-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Start Your Tontine Journey?
            </h3>
            <p className="text-gray-600 mb-6">
              Join thousands of users already participating in transparent, automated tontines.
            </p>
            <button className="bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-emerald-700 transition-all transform hover:scale-105 inline-flex items-center space-x-2">
              <span>Get Started Now</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
