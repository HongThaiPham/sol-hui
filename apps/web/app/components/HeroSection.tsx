"use client";

import { motion } from "framer-motion";
import { ArrowRight, Shield, Zap, Globe, Download, Play } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-emerald-50 via-white to-purple-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-2000"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center space-x-2"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <span className="text-2xl font-bold text-gray-900">Sontine</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hidden md:flex items-center space-x-8"
        >
          <a
            href="#features"
            className="text-gray-600 hover:text-emerald-600 transition-colors"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-gray-600 hover:text-emerald-600 transition-colors"
          >
            How it Works
          </a>
          <a
            href="#pricing"
            className="text-gray-600 hover:text-emerald-600 transition-colors"
          >
            Pricing
          </a>
          <button className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
            Join Beta
          </button>
        </motion.div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium">
                <Zap className="w-4 h-4" />
                <span>Powered by Solana</span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight font-pixeloid">
                Tontine Meets
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-purple-600">
                  {" "}
                  Blockchain
                </span>
              </h1>

              <p className="text-lg text-gray-600 leading-relaxed">
                Join the future of rotating savings with Sontine. Built on
                Solana blockchain for transparent, automated, and global tontine
                groups. Fast, cheap, and secure.
              </p>

              <p className="text-base text-gray-500 font-medium font-pixeloid">
                Hụi Gặp Blockchain - Tương Lai Tài Chính Thông Minh
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button className="bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-emerald-700 transition-all transform hover:scale-105 flex items-center justify-center space-x-2">
                <Download className="w-5 h-5" />
                <span>Download App</span>
              </button>

              <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-emerald-600 hover:text-emerald-600 transition-all flex items-center justify-center space-x-2">
                <Play className="w-5 h-5" />
                <span>Watch Demo</span>
              </button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex items-center space-x-6 pt-8"
            >
              <div className="flex items-center space-x-2 text-gray-600">
                <Shield className="w-5 h-5 text-emerald-600" />
                <span className="text-sm">Solana Secured</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Zap className="w-5 h-5 text-purple-600" />
                <span className="text-sm">Lightning Fast</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Globe className="w-5 h-5 text-yellow-600" />
                <span className="text-sm">Global Access</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative"
          >
            <div className="relative w-full h-96 lg:h-[500px]">
              {/* Circular Animation representing Tontine + Blockchain */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                  {/* Outer Ring - Blockchain Network */}
                  <div className="absolute inset-0 border-4 border-emerald-200 rounded-full animate-spin-slow">
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-emerald-500 rounded-full"></div>
                    <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 w-4 h-4 bg-purple-500 rounded-full"></div>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-yellow-500 rounded-full"></div>
                    <div className="absolute top-1/2 -left-2 transform -translate-y-1/2 w-4 h-4 bg-emerald-500 rounded-full"></div>
                  </div>

                  {/* Inner Ring - Tontine Members */}
                  <div className="absolute inset-8 border-2 border-purple-200 rounded-full animate-spin-reverse">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-3 h-3 bg-purple-400 rounded-full"
                        style={{
                          top: "50%",
                          left: "50%",
                          transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-60px)`,
                        }}
                      ></div>
                    ))}
                  </div>

                  {/* Center - Sontine Logo */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
                      <span className="text-white font-bold text-2xl">S</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
