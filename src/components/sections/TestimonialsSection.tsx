"use client";

import { motion, useAnimationFrame } from "framer-motion";
import { Star, Quote, BadgeCheck, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "Abhi Suresh",
    role: "Digital Marketing",
    image: "",
    review:
      "OutrightCreators is outstanding at what they do and is one of the best SEO and digital marketing Agency in Hyderabad. We have utilized their expertise in digital marketing, SEO optimization, PPC management & social media management. They always strive for 100% customer satisfaction. I would recommend Outrightcreators to any organization.",
    rating: 5,
  },
  {
    id: 2,
    name: "Maninder Kaur",
    role: "Digital Marketing",
    image: "",
    review:
      "The best digital marketing agency. The team of Outright Creators is outstanding. They provided me with top- class services Highly appreciated! Thank you",
    rating: 5,
  },
  {
    id: 3,
    name: "Aarif Pathan",
    role: "Digital Marketing",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop",
    review: "One of the best digital marketing company in city.",
    rating: 5,
  },
  {
    id: 4,
    name: "sharnjit kaur",
    role: "Branding and Advertising",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop",
    review:
      "I am happy with Outright Creator's branding services. They helped me to promote my novel. Their amazing branding and advertising ideas have boosted my novel sale from day 1. This agency is filled with creative and innovative people. All the best for the future!",
    rating: 5,
  },
  {
    id: 5,
    name: "amita sharma",
    role: "Branding and Advertising",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400&auto=format&fit=crop",
    review:
      "The team Outright is very friendly, creative, flexible, and helpful. They created an awesome e-commerce website for me. Moreover, They give realistic timelines and always there to assist you. I would definitely recommend the web designing and development services of this agency.",
    rating: 5,
  },
  {
    id: 6,
    name: "Aamantran Restaurant",
    role: "Branding and Advertising",
    image:
      "https://images.unsplash.com/photo-1531123897727-8e284d1bfaec?q=80&w=400&auto=format&fit=crop",
    review:
      "The team is very young & energetic with lots of creative ideas. The service is superb. All the Best Guys 😊",
    rating: 5,
  },
  {
    id: 7,
    name: "Amrinder maan 5233",
    role: "Branding and Advertising",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop",
    review:
      "We are pleased with our order of 1000 leaflets for marketing our clothing business. These people completely understand the requirements of the customers. We got great quality prints at a very reasonable price from Outright Creators. Apart from this their delivery is very fast. Highly recommended this agency for digital printing!!",
    rating: 5,
  },
  {
    id: 8,
    name: "Yamini Yammu",
    role: "Branding and Advertising",
    image: "",
    review:
      "Outright Creators have a team of friendly and experienced professionals.They are very upfront about their strategies which has helped our business achieve good results so far. They are honest with their approach and will guide the client with their best inputs. We will love to work with them for a long period.Positive Responsiveness, Quality, Professionalism, Value",
    rating: 5,
  },
];

const duplicatedTestimonials = [...testimonials, ...testimonials];

export default function TestimonialsSection() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const [isPaused, setIsPaused] = useState(false);

  const x = useRef(0);

  useAnimationFrame(() => {
    if (!sliderRef.current || isPaused) return;

    x.current -= 0.45;

    const sliderWidth = sliderRef.current.scrollWidth / 2;

    if (Math.abs(x.current) >= sliderWidth) {
      x.current = 0;
    }

    sliderRef.current.style.transform = `translateX(${x.current}px)`;
  });

  return (
    <section className="relative overflow-hidden py-10">
      {/* BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 h-[550px] w-[550px] -translate-x-1/2 rounded-full bg-yellow-400/10 blur-[150px]" />

        <div className="absolute right-0 bottom-0 h-[350px] w-[350px] rounded-full bg-yellow-400/10 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mx-auto mb-14 max-w-3xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-yellow-400/20 bg-yellow-400/10 px-4 py-2 backdrop-blur-xl"
          >
            <BadgeCheck className="h-4 w-4 text-yellow-500" />

            <span className="text-sm font-medium text-black">
              Google Reviews
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight text-black md:text-6xl"
          >
            Trusted By Clients
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-black/70 md:text-lg"
          >
            Real reviews from businesses who trusted Outright Creators.
          </motion.p>
        </div>

        {/* SLIDER */}
        <div className="relative overflow-hidden">
          {/* LEFT FADE */}
          <div className="pointer-events-none absolute top-0 left-0 z-20 h-full w-24 bg-gradient-to-r from-[#f8f6ef] to-transparent" />

          {/* RIGHT FADE */}
          <div className="pointer-events-none absolute top-0 right-0 z-20 h-full w-24 bg-gradient-to-l from-[#f8f6ef] to-transparent" />

          {/* TRACK */}
          <div
            ref={sliderRef}
            className="flex w-max gap-6 px-4 will-change-transform"
          >
            {duplicatedTestimonials.map((item, index) => (
              <motion.div
                key={`${item.id}-${index}`}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                whileHover={{
                  y: -10,
                }}
                className="group relative flex h-[420px] w-[320px] flex-shrink-0 flex-col overflow-hidden rounded-[36px] border border-black/10 bg-white/70 p-6 backdrop-blur-2xl transition-all duration-500 md:w-[360px]"
              >
                {/* PREMIUM GLOW */}
                <div className="absolute top-0 left-1/2 h-52 w-52 -translate-x-1/2 rounded-full bg-yellow-400 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                {/* TOP */}
                <div className="relative z-10 flex items-start justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-4">
                    {/* AVATAR */}
                    <div className="relative flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-yellow-400/20 bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 p-0.5">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <span className="text-xl font-bold text-white uppercase">
                          {item.name.charAt(0)}
                        </span>
                      )}
                    </div>

                    {/* INFO */}
                    <div className="min-w-0">
                      <h3 className="line-clamp-1 text-lg font-semibold text-black capitalize">
                        {item.name}
                      </h3>

                      <p className="line-clamp-1 text-sm text-black/60">
                        {item.role}
                      </p>
                    </div>
                  </div>

                  <Quote className="h-9 w-9 flex-shrink-0 text-yellow-500" />
                </div>

                {/* STARS */}
                <div className="relative z-10 mt-6 flex items-center gap-1">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                {/* REVIEW AREA */}
                <div className="relative z-10 mt-5 flex-1 overflow-hidden">
                  <div className="h-full scrollbar-thin scrollbar-thumb-yellow-400/40 scrollbar-track-transparent overflow-y-auto pr-2 text-sm leading-[1.9] text-black/70 hover:scrollbar-thumb-yellow-500">
                    {item.review}
                  </div>
                </div>

                {/* FOOTER */}
                <div className="relative z-10 mt-6 flex items-center gap-2 border-t border-black/10 pt-5">
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500" />

                  <span className="text-xs font-medium text-black/60">
                    Verified Google Review
                  </span>
                </div>

                {/* BORDER LIGHT */}
                <div className="pointer-events-none absolute inset-0 rounded-[36px] border border-white/40" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
