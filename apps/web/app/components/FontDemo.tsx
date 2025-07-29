"use client";

import { motion } from "framer-motion";

export function FontDemo() {
  return (
    <section className="py-24 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6 font-pixeloid">
            Pixeloid Font Demo
          </h2>
          <p className="text-xl text-gray-300">
            Experience the retro-modern aesthetic of pixel-perfect typography
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Sans Font Demo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gray-800 p-8 rounded-2xl"
          >
            <h3 className="text-2xl font-bold mb-6 text-emerald-400 font-pixeloid">
              Pixeloid Sans
            </h3>
            
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-400 mb-2">Pixel XS (9px)</p>
                <p className="text-pixel-xs font-pixeloid">
                  Sontine - Blockchain Tontines
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-400 mb-2">Pixel SM (18px)</p>
                <p className="text-pixel-sm font-pixeloid">
                  Tontine Meets Blockchain
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-400 mb-2">Pixel Base (36px)</p>
                <p className="text-pixel-base font-pixeloid">
                  SONTINE
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-400 mb-2">Bold Weight</p>
                <p className="text-2xl font-bold font-pixeloid">
                  Hụi Gặp Blockchain
                </p>
              </div>
            </div>
          </motion.div>

          {/* Mono Font Demo */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gray-800 p-8 rounded-2xl"
          >
            <h3 className="text-2xl font-bold mb-6 text-purple-400 font-pixeloid-mono">
              Pixeloid Mono
            </h3>
            
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-400 mb-2">Code & Numbers</p>
                <p className="text-lg font-pixeloid-mono text-green-400">
                  SOL: 0.00025<br/>
                  TPS: 65,000<br/>
                  Fee: $0.00025
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-400 mb-2">Wallet Address</p>
                <p className="text-sm font-pixeloid-mono text-yellow-400 break-all">
                  7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-400 mb-2">Smart Contract</p>
                <div className="bg-gray-900 p-4 rounded-lg">
                  <code className="text-sm font-pixeloid-mono text-cyan-400">
                    {`pub struct Tontine {
    pub members: Vec<Pubkey>,
    pub pot_amount: u64,
    pub round: u8,
}`}
                  </code>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Font Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-emerald-600 to-purple-600 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4 font-pixeloid">
              Font Features
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div>
                <h4 className="font-bold mb-2 font-pixeloid">135 Languages</h4>
                <p className="text-emerald-100">
                  Including Vietnamese, English, French, Spanish
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-2 font-pixeloid">Pixel Perfect</h4>
                <p className="text-emerald-100">
                  Optimized for 9px, 18px, 36px, 72px, 144px
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-2 font-pixeloid">Open Source</h4>
                <p className="text-emerald-100">
                  SIL Open Font License - Free for all projects
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Installation Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="bg-gray-800 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-6 font-pixeloid text-center">
              Installation Instructions
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-bold mb-4 text-emerald-400 font-pixeloid">
                  1. Download Font
                </h4>
                <ul className="space-y-2 text-gray-300">
                  <li>• Visit: ggbot.itch.io/pixeloid-font</li>
                  <li>• Click "Download Now" (free)</li>
                  <li>• Extract Pixeloid_Font_0_5.zip</li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-bold mb-4 text-purple-400 font-pixeloid">
                  2. Install Files
                </h4>
                <ul className="space-y-2 text-gray-300 font-pixeloid-mono text-sm">
                  <li>• PixeloidSans-Regular.ttf</li>
                  <li>• PixeloidSans-Bold.ttf</li>
                  <li>• PixeloidMono-Regular.ttf</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gray-900 rounded-lg">
              <p className="text-sm text-gray-400 mb-2">Copy to:</p>
              <code className="text-cyan-400 font-pixeloid-mono">
                apps/web/public/fonts/
              </code>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
