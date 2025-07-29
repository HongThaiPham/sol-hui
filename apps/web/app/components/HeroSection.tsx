"use client";

import { motion } from "framer-motion";
import { Shield, Zap, Globe, Download, Play } from "lucide-react";
import { Logo } from "./Logo";
import { SMHLogo } from "./SMHLogo";
import { APP_CONFIG } from "../../lib/constants";

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-navy-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-2000"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Logo size="lg" variant="default" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hidden md:flex items-center space-x-8"
        >
          <a
            href="#features"
            className="text-navy-500 hover:text-teal-500 transition-colors"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-navy-500 hover:text-teal-500 transition-colors"
          >
            How it Works
          </a>
          <a
            href="#pricing"
            className="text-navy-500 hover:text-teal-500 transition-colors"
          >
            Pricing
          </a>
          <button className="bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition-colors">
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
              <div className="flex items-center space-x-4">
                <div className="inline-flex items-center space-x-2 bg-primary-50 text-teal-600 px-4 py-2 rounded-full text-sm font-medium">
                  <Zap className="w-4 h-4" />
                  <span>Powered by Solana</span>
                </div>

                {/* Separator */}
                <div className="w-px h-6 bg-gray-300"></div>

                {/* SMH Logo */}
                <div className="flex items-center">
                  <SMHLogo size="sm" />
                </div>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold text-dark-500 leading-tight font-pixeloid">
                Tontine Meets
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-primary-200">
                  {" "}
                  Blockchain
                </span>
              </h1>

              <p className="text-lg text-navy-500 leading-relaxed">
                {APP_CONFIG.DESCRIPTION}
              </p>

              <p className="text-base text-navy-400 font-medium font-pixeloid">
                {APP_CONFIG.TAGLINE_VI}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button className="bg-teal-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-teal-600 transition-all transform hover:scale-105 flex items-center justify-center space-x-2">
                <Download className="w-5 h-5" />
                <span>Download App</span>
              </button>

              <button className="border-2 border-navy-300 text-navy-500 px-8 py-4 rounded-xl font-semibold text-lg hover:border-teal-500 hover:text-teal-500 transition-all flex items-center justify-center space-x-2">
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
              <div className="flex items-center space-x-2 text-navy-500">
                <Shield className="w-5 h-5 text-teal-500" />
                <span className="text-sm">Solana Secured</span>
              </div>
              <div className="flex items-center space-x-2 text-navy-500">
                <Zap className="w-5 h-5 text-primary-200" />
                <span className="text-sm">Lightning Fast</span>
              </div>
              <div className="flex items-center space-x-2 text-navy-500">
                <Globe className="w-5 h-5 text-primary-100" />
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
                  <div className="absolute inset-0 border-4 border-primary-100 rounded-full animate-spin-slow">
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-teal-500 rounded-full"></div>
                    <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 w-4 h-4 bg-primary-200 rounded-full"></div>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-navy-400 rounded-full"></div>
                    <div className="absolute top-1/2 -left-2 transform -translate-y-1/2 w-4 h-4 bg-teal-500 rounded-full"></div>
                  </div>

                  {/* Inner Ring - Tontine Members */}
                  <div className="absolute inset-8 border-2 border-teal-200 rounded-full animate-spin-reverse">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-3 h-3 bg-primary-200 rounded-full"
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
                    <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-2xl p-2">
                      <Logo size="lg" showText={false} />
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
