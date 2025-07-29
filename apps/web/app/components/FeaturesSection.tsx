"use client";

import { motion } from "framer-motion";
import { 
  Zap, 
  Shield, 
  Users, 
  Bell, 
  Star, 
  Globe, 
  Coins, 
  BarChart3,
  Lock,
  Smartphone,
  ArrowUpDown,
  CheckCircle
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Solana Smart Contracts",
    description: "Automated tontine operations with lightning-fast Solana blockchain technology. No manual intervention needed.",
    color: "emerald"
  },
  {
    icon: Shield,
    title: "Transparent Bidding",
    description: "Fair and transparent bidding system where all members can see bids and participate equally in the process.",
    color: "blue"
  },
  {
    icon: Users,
    title: "Multi-Tontine Management",
    description: "Join multiple tontine groups simultaneously and manage all your participations from one dashboard.",
    color: "purple"
  },
  {
    icon: Bell,
    title: "Real-time Notifications",
    description: "Stay updated with instant notifications for contributions, bidding rounds, and payout distributions.",
    color: "yellow"
  },
  {
    icon: Star,
    title: "Reputation System",
    description: "Build your reputation score through consistent participation and reliable contributions to unlock better groups.",
    color: "pink"
  },
  {
    icon: Globe,
    title: "Cross-border Capabilities",
    description: "Participate in tontines globally with automatic currency conversion and international accessibility.",
    color: "indigo"
  }
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-gray-50">
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
            Powerful Features for Modern
            <span className="text-emerald-600"> Tontines</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the next generation of rotating savings with advanced blockchain features 
            designed for transparency, security, and global accessibility.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const colorClasses = {
              emerald: "bg-emerald-500 text-white",
              blue: "bg-blue-500 text-white",
              purple: "bg-purple-500 text-white",
              yellow: "bg-yellow-500 text-white",
              pink: "bg-pink-500 text-white",
              indigo: "bg-indigo-500 text-white"
            };

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 group"
              >
                <div className={`w-14 h-14 ${colorClasses[feature.color as keyof typeof colorClasses]} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Feature Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-emerald-600 to-purple-600 rounded-3xl p-8 lg:p-12 text-white"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6">
                Built for the Solana Ecosystem
              </h3>
              <p className="text-lg text-emerald-100 mb-8">
                Leverage Solana's high-speed, low-cost infrastructure for seamless tontine operations. 
                Experience sub-second transaction finality and minimal fees.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-emerald-300" />
                  <span className="font-medium">Low Fees</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-emerald-300" />
                  <span className="font-medium">Fast Transactions</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-emerald-300" />
                  <span className="font-medium">Eco-Friendly</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-emerald-300" />
                  <span className="font-medium">Scalable</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-emerald-200">Transaction Speed</span>
                    <span className="font-bold">~400ms</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-emerald-200">Average Fee</span>
                    <span className="font-bold">$0.00025</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-emerald-200">Energy Efficiency</span>
                    <span className="font-bold">99.9% less</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-emerald-200">Network Uptime</span>
                    <span className="font-bold">99.9%</span>
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
