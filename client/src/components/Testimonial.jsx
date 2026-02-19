import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const Testimonial = () => {
  const testimonials = [
    {
      name: "Aarav Sharma",
      location: "Mumbai, India",
      testimonial:
        "The entire rental experience was smooth and hassle-free. Highly impressed with the service quality!",
    },
    {
      name: "Priya Iyer",
      location: "Chennai, India",
      testimonial:
        "Excellent cars and even better customer support! They made my trip extremely comfortable.",
    },
    {
      name: "Rohit Verma",
      location: "Delhi, India",
      testimonial:
        "Reliable, affordable, and premium quality service. I recommend Veloraw to everyone looking for car rentals.",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto">

      {/* Section Heading */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white">
          What Our <span className="text-yellow-500">Customers Say</span>
        </h2>
        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          Trusted by travelers across India for premium vehicles,
          seamless bookings, and world-class service.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {testimonials.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.2,
              ease: "easeOut",
            }}
            viewport={{ once: true }}
            className="bg-[#111] border border-gray-800 
            rounded-2xl p-8 hover:-translate-y-2 
            hover:shadow-yellow-500/10 hover:shadow-2xl 
            transition-all duration-500"
          >
            {/* Avatar + Name */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full 
              bg-yellow-500 text-black flex items-center justify-center font-bold">
                {item.name.charAt(0)}
              </div>

              <div>
                <p className="text-lg font-semibold text-white">
                  {item.name}
                </p>
                <p className="text-gray-400 text-sm">
                  {item.location}
                </p>
              </div>
            </div>

            {/* Stars */}
            <div className="flex items-center gap-1 mt-4">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <img
                    key={i}
                    src={assets.star_icon}
                    alt="star"
                    className="w-4 h-4"
                  />
                ))}
            </div>

            {/* Testimonial Text */}
            <p className="text-gray-400 mt-6 leading-relaxed">
              "{item.testimonial}"
            </p>
          </motion.div>
        ))}
      </div>

    </section>
  );
};

export default Testimonial;
