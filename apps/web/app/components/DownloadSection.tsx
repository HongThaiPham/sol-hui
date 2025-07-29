"use client";

import { motion } from "framer-motion";
import { 
  Download, 
  Smartphone, 
  Monitor, 
  Wallet, 
  CheckCircle, 
  ArrowRight,
  Apple,
  Play
} from "lucide-react";

const platforms = [
  {
    name: "iOS App Store",
    icon: Apple,
    description: "Download for iPhone and iPad",
    status: "Available Now",
    link: "#",
    color: "bg-black"
  },
  {
    name: "Google Play",
    icon: Play,
    description: "Download for Android devices",
    status: "Available Now", 
    link: "#",
    color: "bg-green-600"
  },
  {
    name: "Web App",
    icon: Monitor,
    description: "Access directly from your browser",
    status: "Beta Access",
    link: "#",
    color: "bg-blue-600"
  }
];

const requirements = [
  {
    platform: "iOS",
    version: "iOS 14.0 or later",
    storage: "50 MB",
    features: ["Face ID/Touch ID", "Push Notifications", "Wallet Integration"]
  },
  {
    platform: "Android", 
    version: "Android 8.0 (API 26) or later",
    storage: "45 MB",
    features: ["Biometric Auth", "Background Sync", "Wallet Connect"]
  },
  {
    platform: "Web",
    version: "Modern browser (Chrome, Firefox, Safari)",
    storage: "No installation required",
    features: ["Desktop Notifications", "Full Feature Set", "Cross-Platform Sync"]
  }
];

export function DownloadSection() {
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
            Get <span className="text-emerald-600">Sontine</span> Today
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start your tontine journey on any device. Available on mobile and web 
            with seamless Solana wallet integration.
          </p>
        </motion.div>

        {/* Download Options */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {platforms.map((platform, index) => {
            const Icon = platform.icon;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-8 rounded-2xl text-center hover:shadow-lg transition-all duration-300 group"
              >
                <div className={`w-16 h-16 ${platform.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {platform.name}
                </h3>
                
                <p className="text-gray-600 mb-4">
                  {platform.description}
                </p>
                
                <div className="mb-6">
                  <span className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
                    <CheckCircle className="w-4 h-4" />
                    <span>{platform.status}</span>
                  </span>
                </div>

                <button className="w-full bg-emerald-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-emerald-700 transition-all transform hover:scale-105 flex items-center justify-center space-x-2">
                  <Download className="w-5 h-5" />
                  <span>Download</span>
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* System Requirements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gray-50 rounded-3xl p-8 lg:p-12 mb-16"
        >
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            System Requirements
          </h3>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {requirements.map((req, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl">
                <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  {req.platform === "iOS" && <Smartphone className="w-6 h-6 mr-2 text-gray-600" />}
                  {req.platform === "Android" && <Smartphone className="w-6 h-6 mr-2 text-green-600" />}
                  {req.platform === "Web" && <Monitor className="w-6 h-6 mr-2 text-blue-600" />}
                  {req.platform}
                </h4>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Version:</span>
                    <span className="font-medium text-gray-900">{req.version}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Storage:</span>
                    <span className="font-medium text-gray-900">{req.storage}</span>
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold text-gray-900 mb-3">Features:</h5>
                  <ul className="space-y-2">
                    {req.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Wallet Integration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-emerald-600 to-purple-600 rounded-3xl p-8 lg:p-12 text-white"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6">
                Seamless Wallet Integration
              </h3>
              <p className="text-lg text-emerald-100 mb-8">
                Sontine works with all major Solana wallets. Connect your existing wallet 
                or create a new one to get started with blockchain-powered tontines.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Wallet className="w-6 h-6 text-yellow-300" />
                  <span className="font-semibold">Phantom Wallet</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Wallet className="w-6 h-6 text-yellow-300" />
                  <span className="font-semibold">Solflare</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Wallet className="w-6 h-6 text-yellow-300" />
                  <span className="font-semibold">Backpack</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Wallet className="w-6 h-6 text-yellow-300" />
                  <span className="font-semibold">Glow Wallet</span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <h4 className="text-xl font-bold mb-6">Getting Started</h4>
                <div className="space-y-4 text-left">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">1</div>
                    <div>
                      <p className="font-semibold">Download Sontine</p>
                      <p className="text-sm text-emerald-100">Install from your preferred platform</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">2</div>
                    <div>
                      <p className="font-semibold">Connect Wallet</p>
                      <p className="text-sm text-emerald-100">Link your Solana wallet securely</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">3</div>
                    <div>
                      <p className="font-semibold">Join Tontines</p>
                      <p className="text-sm text-emerald-100">Browse and join your first tontine</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Beta Access CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Join the Beta Program
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Be among the first to experience the future of tontines. Beta users get early access 
              to new features and help shape the platform's development.
            </p>
            <button className="bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-emerald-700 transition-all transform hover:scale-105 inline-flex items-center space-x-2">
              <span>Request Beta Access</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
