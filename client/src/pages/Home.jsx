import React from "react";
import Hero from "../components/Hero";
import FeaturedSection from "../components/FeaturedSection";
import Banner from "../components/Banner";
import Testimonial from "../components/Testimonial";
import Newsletter from "../components/Newsletter";

const Home = () => {
  return (
    <div className="bg-black text-white">

      {/* Hero Section */}
      <Hero />

      {/* Featured Cars */}
      <section className="py-20 px-6 md:px-16 lg:px-24 xl:px-32">
        <FeaturedSection />
      </section>

      {/* Promotional Banner */}
      <section className="py-20 bg-gradient-to-b from-black via-[#111] to-black px-6 md:px-16 lg:px-24 xl:px-32">
        <Banner />
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 md:px-16 lg:px-24 xl:px-32">
        <Testimonial />
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-[#111] px-6 md:px-16 lg:px-24 xl:px-32">
        <Newsletter />
      </section>

    </div>
  );
};

export default Home;
