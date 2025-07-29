"use client";

import { motion } from "framer-motion";
import { Star, Users, TrendingUp, Globe, Quote } from "lucide-react";
import { Logo } from "./Logo";

const testimonials = [
  {
    name: "Minh Nguyen",
    location: "Ho Chi Minh City, Vietnam",
    role: "Small Business Owner",
    content:
      "Sontine đã thay đổi cách tôi tiết kiệm. Tôi có thể tham gia hụi với bạn bè ở Mỹ và nhận tiền ngay lập tức. Rất tiện lợi và minh bạch!",
    translation:
      "Sontine has changed how I save. I can join tontines with friends in the US and receive money instantly. Very convenient and transparent!",
    rating: 5,
    avatar: "MN",
  },
  {
    name: "Sarah Chen",
    location: "San Francisco, USA",
    role: "Software Engineer",
    content:
      "As someone who grew up with traditional susus, Sontine brings that community feeling to the digital age. The blockchain transparency gives me confidence.",
    rating: 5,
    avatar: "SC",
  },
  {
    name: "Jean-Pierre Dubois",
    location: "Paris, France",
    role: "Financial Advisor",
    content:
      "The concept of tontines modernized with blockchain is brilliant. My clients love the low fees and instant settlements compared to traditional banking.",
    rating: 5,
    avatar: "JD",
  },
  {
    name: "Kwame Asante",
    location: "Accra, Ghana",
    role: "Entrepreneur",
    content:
      "Sontine connects me with my diaspora community globally. We can maintain our traditional saving practices while leveraging modern technology.",
    rating: 5,
    avatar: "KA",
  },
];

const stats = [
  {
    icon: Users,
    value: "50K+",
    label: "Active Users",
    description: "Growing community of savers",
  },
  {
    icon: TrendingUp,
    value: "$2.5M+",
    label: "Total Saved",
    description: "Cumulative savings through tontines",
  },
  {
    icon: Globe,
    value: "45+",
    label: "Countries",
    description: "Global reach and accessibility",
  },
  {
    icon: Star,
    value: "4.9/5",
    label: "User Rating",
    description: "Average app store rating",
  },
];

export function SocialProofSection() {
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
            Trusted by <span className="text-emerald-600">Thousands</span>{" "}
            Worldwide
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join a growing global community of savers who have discovered the
            power of blockchain-enabled tontines.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <div
                key={index}
                className="text-center bg-white p-8 rounded-2xl shadow-sm"
              >
                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-emerald-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="font-semibold text-gray-900 mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-600">{stat.description}</div>
              </div>
            );
          })}
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            What Our Users Say
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role}
                    </div>
                    <div className="text-sm text-emerald-600">
                      {testimonial.location}
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </div>

                <Quote className="w-8 h-8 text-emerald-200 mb-4" />

                <blockquote className="text-gray-700 leading-relaxed mb-4">
                  "{testimonial.content}"
                </blockquote>

                {testimonial.translation && (
                  <div className="text-sm text-gray-500 italic border-l-2 border-emerald-200 pl-4">
                    Translation: "{testimonial.translation}"
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Community Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-teal-500 to-primary-200 rounded-3xl p-8 lg:p-12 text-white text-center"
        >
          <div className="flex justify-center mb-6">
            <Logo size="md" variant="white" />
          </div>
          <h3 className="text-3xl font-bold mb-6">
            Join the Global Tontine Revolution
          </h3>
          <p className="text-lg text-primary-50 mb-8 max-w-3xl mx-auto">
            Be part of a movement that's democratizing savings and bringing
            traditional community finance into the digital age. Connect with
            savers worldwide and build your financial future together.
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">180+</div>
              <div className="text-primary-100">Countries Supported</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-primary-100">Global Operations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">15+</div>
              <div className="text-primary-100">Languages Supported</div>
            </div>
          </div>

          <div className="mt-8">
            <button className="bg-white text-emerald-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105">
              Join Our Community
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
