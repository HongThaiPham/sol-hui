"use client";

import { motion } from "framer-motion";
import { 
  Zap, 
  Wallet, 
  Link, 
  BarChart3, 
  Shield,
  Coins,
  Globe,
  CheckCircle
} from "lucide-react";

const ecosystemFeatures = [
  {
    icon: Wallet,
    title: "Wallet Integration",
    description: "Seamlessly connect with popular Solana wallets like Phantom, Solflare, and Backpack.",
    wallets: ["Phantom", "Solflare", "Backpack", "Glow"]
  },
  {
    icon: Link,
    title: "DeFi Connections",
    description: "Integrate with Solana DeFi protocols for yield farming and additional earning opportunities.",
    protocols: ["Jupiter", "Raydium", "Orca", "Marinade"]
  },
  {
    icon: BarChart3,
    title: "Performance Metrics",
    description: "Leverage Solana's industry-leading performance for optimal user experience.",
    metrics: ["65,000 TPS", "400ms finality", "99.9% uptime"]
  }
];

const performanceStats = [
  {
    metric: "Transaction Speed",
    value: "65,000",
    unit: "TPS",
    description: "Transactions per second capacity"
  },
  {
    metric: "Block Time",
    value: "400",
    unit: "ms",
    description: "Average block confirmation time"
  },
  {
    metric: "Transaction Cost",
    value: "$0.00025",
    unit: "avg",
    description: "Average transaction fee"
  },
  {
    metric: "Energy Efficiency",
    value: "99.9%",
    unit: "less",
    description: "Compared to proof-of-work chains"
  }
];

export function SolanaEcosystemSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
              Built on <span className="text-purple-600">Solana</span>
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Harness the power of Solana's high-performance blockchain for lightning-fast, 
            low-cost tontine operations with seamless ecosystem integration.
          </p>
        </motion.div>

        {/* Performance Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {performanceStats.map((stat, index) => (
            <div key={index} className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl text-center border border-purple-100">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {stat.value}
                <span className="text-lg text-purple-400 ml-1">{stat.unit}</span>
              </div>
              <div className="font-semibold text-gray-900 mb-1">{stat.metric}</div>
              <div className="text-sm text-gray-600">{stat.description}</div>
            </div>
          ))}
        </motion.div>

        {/* Ecosystem Features */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {ecosystemFeatures.map((feature, index) => {
            const Icon = feature.icon;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 bg-purple-500 rounded-xl flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {feature.description}
                </p>

                <div className="space-y-2">
                  {(feature.wallets || feature.protocols || feature.metrics)?.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-purple-500" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Solana Advantages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 lg:p-12 text-white"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6">
                Why Solana for Tontines?
              </h3>
              <p className="text-lg text-purple-100 mb-8">
                Solana's unique architecture makes it the perfect blockchain for tontine operations, 
                offering the speed, cost-efficiency, and scalability needed for global adoption.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Zap className="w-6 h-6 text-yellow-300 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Ultra-Fast Transactions</h4>
                    <p className="text-purple-100 text-sm">
                      Sub-second finality ensures instant contribution confirmations and payouts.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Coins className="w-6 h-6 text-yellow-300 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Minimal Fees</h4>
                    <p className="text-purple-100 text-sm">
                      Micro-cent transaction costs make small, frequent contributions economical.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Globe className="w-6 h-6 text-yellow-300 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Global Scale</h4>
                    <p className="text-purple-100 text-sm">
                      Handle thousands of concurrent tontines with millions of participants.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Shield className="w-6 h-6 text-yellow-300 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Proven Security</h4>
                    <p className="text-purple-100 text-sm">
                      Battle-tested blockchain with billions in total value locked across the ecosystem.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <h4 className="text-xl font-bold mb-6 text-center">Solana Network Stats</h4>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-purple-200">Total Transactions</span>
                    <span className="font-bold">240B+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-purple-200">Active Validators</span>
                    <span className="font-bold">3,400+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-purple-200">Total Value Locked</span>
                    <span className="font-bold">$8B+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-purple-200">Network Uptime</span>
                    <span className="font-bold">99.9%</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/20">
                  <div className="text-center">
                    <div className="text-2xl font-bold mb-1">Trusted by</div>
                    <div className="text-purple-200">10M+ users worldwide</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
