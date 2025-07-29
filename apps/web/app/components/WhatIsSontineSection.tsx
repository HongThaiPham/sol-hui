"use client";

import { motion } from "framer-motion";
import { Users, ArrowRight, Coins, Shield, Clock, Globe } from "lucide-react";

export function WhatIsSontineSection() {
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
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            What is <span className="text-emerald-600">Sontine</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Sontine combines the time-tested tradition of tontines (rotating savings groups) 
            with the power of Solana blockchain technology.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left - Traditional vs Modern */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-gray-900">
                From Traditional Hụi to Digital Tontines
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                For centuries, communities worldwide have used rotating savings and credit associations (ROSCAs) 
                - known as "hụi" in Vietnam, "tontines" in France, and "susus" in West Africa. 
                These groups help members save money and access credit through collective participation.
              </p>
            </div>

            {/* Traditional vs Modern Comparison */}
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-gray-600" />
                  Traditional Hụi/Tontines
                </h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Requires physical meetings</li>
                  <li>• Limited to local communities</li>
                  <li>• Manual record keeping</li>
                  <li>• Trust-based, no guarantees</li>
                  <li>• Cash-only transactions</li>
                </ul>
              </div>

              <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-200">
                <h4 className="font-semibold text-emerald-900 mb-3 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-emerald-600" />
                  Sontine (Blockchain-Powered)
                </h4>
                <ul className="space-y-2 text-emerald-800">
                  <li>• Fully digital and remote</li>
                  <li>• Global participation</li>
                  <li>• Automated smart contracts</li>
                  <li>• Transparent and secure</li>
                  <li>• Cryptocurrency payments</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Right - Visual Representation */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-emerald-100 to-purple-100 p-8 rounded-2xl">
              <div className="space-y-6">
                <h4 className="text-2xl font-bold text-gray-900 text-center">
                  How Sontine Works
                </h4>
                
                {/* Step by step visual */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 bg-white p-4 rounded-xl shadow-sm">
                    <div className="w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold">
                      1
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Join a Tontine</p>
                      <p className="text-sm text-gray-600">Connect your Solana wallet</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 bg-white p-4 rounded-xl shadow-sm">
                    <div className="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">
                      2
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Make Contributions</p>
                      <p className="text-sm text-gray-600">Automated SOL payments</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 bg-white p-4 rounded-xl shadow-sm">
                    <div className="w-10 h-10 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold">
                      3
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Receive Payouts</p>
                      <p className="text-sm text-gray-600">Smart contract distribution</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Key Benefits Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          <div className="text-center p-6 bg-emerald-50 rounded-xl">
            <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Blockchain Security</h3>
            <p className="text-gray-600">
              Smart contracts ensure transparent, tamper-proof operations with automatic execution.
            </p>
          </div>

          <div className="text-center p-6 bg-purple-50 rounded-xl">
            <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Global Access</h3>
            <p className="text-gray-600">
              Join tontines with people worldwide, breaking geographical barriers of traditional groups.
            </p>
          </div>

          <div className="text-center p-6 bg-yellow-50 rounded-xl">
            <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Automated Operations</h3>
            <p className="text-gray-600">
              No manual coordination needed. Smart contracts handle contributions, bidding, and payouts.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
