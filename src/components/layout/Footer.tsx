// components/layout/Footer.tsx

"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Mail, MapPin, Phone, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import TextReveal from "../motion/TextReveal";

type NavLink =
  | { label: string; type: "scroll"; target: string }
  | { label: string; type: "link"; href: string };

type NavSection = {
  title: string;
  links: NavLink[];
};

const navLinks: NavSection[] = [
  {
    title: "Services",
    links: [
      {
        label: "Motion Graphic",
        type: "scroll",
        target: "motion-graphic",
      },
      {
        label: "Graphic Design",
        type: "scroll",
        target: "graphic-design",
      },
      {
        label: "Branding",
        type: "scroll",
        target: "branding",
      },
      {
        label: "Social Media",
        type: "scroll",
        target: "social-media",
      },
    ],
  },
  {
    title: "Company",
    links: [
      {
        label: "Privacy Policy",
        type: "link",
        href: "/privacy-policy",
      },
      {
        label: "Terms & Conditions",
        type: "link",
        href: "/terms-and-conditions",
      },
    ],
  },
];

const socials = [
  {
    icon: "/assets/FaceBook.jpg",
    alt: "Facebook",
    href: "https://www.facebook.com/outrightcreators/",
  },
  // {
  //   icon: "/assets/insta.jpg",
  //   alt: "Instagram",
  //   href: "https://www.instagram.com/outrightcreators/",
  // },
  {
    icon: "/assets/LinkedIn.jpg",
    alt: "LinkedIn",
    href: "https://www.linkedin.com/company/outright-creators",
  },
  {
    icon: "/assets/insta.jpg",
    alt: "Instagram",
    href: "https://www.instagram.com/outrightcreators/",
  },
  {
    icon: "/assets/youtube.jpg",
    alt: "YouTube",
    href: "https://www.youtube.com/@outrightcreators",
  },
];

export default function Footer() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [submitError, setSubmitError] = useState("");

  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setFieldErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };
  const validateForm = () => {
    const errors = {
      name: "",
      email: "",
      mobile: "",
      message: "",
    };

    let isValid = true;

    // NAME
    if (!formData.name.trim()) {
      errors.name = "Full name is required";
      isValid = false;
    }

    // EMAIL
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      errors.email = "Email address is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Enter a valid email address";
      isValid = false;
    }

    // MOBILE
    const mobileRegex = /^[6-9]\d{9}$/;

    if (!formData.mobile.trim()) {
      errors.mobile = "Mobile number is required";
      isValid = false;
    } else if (!mobileRegex.test(formData.mobile)) {
      errors.mobile = "Enter a valid 10-digit mobile number";
      isValid = false;
    }

    // MESSAGE
    if (!formData.message.trim()) {
      errors.message = "Message is required";
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      errors.message = "Message should be at least 10 characters";
      isValid = false;
    }

    setFieldErrors(errors);

    return isValid;
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setSuccess("");
    setSubmitError("");
    const isValid = validateForm();

    if (!isValid) {
      setLoading(false);
      return;
    }
    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbxBFjT-CHS2e1hpBqn_KxiA0AXB8co0aLhb8yuLqNBH9nH885y8sCDALOBBtFw36H7m5w/exec",
        {
          method: "POST",
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();

      if (data.success) {
        setSuccess("Thank you for reaching out! We will get back to you soon.");

        setFormData({
          name: "",
          email: "",
          mobile: "",
          message: "",
        });
      } else {
        setSubmitError("Something went wrong");
      }
    } catch (err) {
      setSubmitError("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: "#f5f3ef" }}
    >
      {/* BACKGROUND */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, #000 0px, #000 1px, transparent 1px, transparent 72px),
            repeating-linear-gradient(90deg, #000 0px, #000 1px, transparent 1px, transparent 72px)`,
        }}
      />

      <div className="max-w400 relative mx-auto px-5 pt-10 pb-8 sm:px-8 lg:px-12">
        {/* TOP SECTION */}
        <div
          id="contact-form"
          className="grid grid-cols-1 gap-12 border-b border-white/10 pb-12 lg:grid-cols-[1fr_0.9fr] lg:gap-20 lg:pb-14"
        >
          {/* LEFT */}
          <div className="flex flex-col justify-center px-2 sm:px-0">
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-yellow-400/20 bg-yellow-400/10 px-3 py-1.5 text-xs text-black backdrop-blur-xl sm:px-4 sm:py-2 sm:text-sm">
              <Sparkles size={14} />
              Let’s Build Something Extraordinary
            </div>

            <TextReveal
              lines={["Let`s", "Connect"]}
              className="text-5xl leading-[1.05] font-bold sm:text-6xl md:text-7xl xl:text-8xl"
            />

            <p className="mt-6 max-w-155 text-sm leading-relaxed text-black sm:mt-8 sm:text-base sm:leading-loose">
              We craft cinematic digital experiences blending strategy,
              branding, development and immersive visuals for ambitious brands.
            </p>
          </div>

          {/* RIGHT FORM */}
          <div className="relative overflow-hidden rounded-[2rem] border border-black/10 bg-white p-6 shadow-[0_20px_80px_rgba(0,0,0,0.08)] sm:rounded-[36px] sm:p-8">
            <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-neutral-200 blur-3xl sm:h-40 sm:w-40" />

            <div className="relative">
              <div className="mb-6 flex items-start justify-between sm:mb-8 sm:items-center">
                <div>
                  <p className="mb-1.5 text-xs tracking-[0.25em] text-black/40 uppercase sm:mb-2 sm:text-sm">
                    Contact Form
                  </p>
                  <h3 className="text-2xl font-semibold text-black sm:text-3xl">
                    Start Your Project
                  </h3>
                </div>

                <div className="hidden h-12 w-12 items-center justify-center rounded-2xl bg-black text-white shadow-lg sm:flex sm:h-14 sm:w-14">
                  <ArrowUpRight size={22} />
                </div>
              </div>

              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 sm:gap-5"
              >
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
                  {/* NAME */}
                  <div>
                    <label className="mb-2 block text-xs font-medium text-black/70 sm:mb-3 sm:text-sm">
                      Full Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className={`h-12 w-full rounded-xl border bg-[#f8f8f8] px-4 text-sm text-black transition-all duration-300 outline-none placeholder:text-black/30 focus:border-black sm:h-14 sm:rounded-2xl sm:px-5 ${
                        fieldErrors.name ? "border-red-500" : "border-black/10"
                      }`}
                    />

                    {fieldErrors.name && (
                      <p className="mt-1.5 text-xs text-red-500 sm:mt-2 sm:text-sm">
                        {fieldErrors.name}
                      </p>
                    )}
                  </div>

                  {/* MOBILE */}
                  <div>
                    <label className="mb-2 block text-xs font-medium text-black/70 sm:mb-3 sm:text-sm">
                      Mobile Number
                    </label>

                    <input
                      type="text"
                      name="mobile"
                      value={formData.mobile}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");

                        if (value.length <= 10) {
                          setFormData((prev) => ({
                            ...prev,
                            mobile: value,
                          }));

                          setFieldErrors((prev) => ({
                            ...prev,
                            mobile: "",
                          }));
                        }
                      }}
                      inputMode="numeric"
                      placeholder="9876543210"
                      className={`h-12 w-full rounded-xl border bg-[#f8f8f8] px-4 text-sm text-black transition-all duration-300 outline-none placeholder:text-black/30 focus:border-black sm:h-14 sm:rounded-2xl sm:px-5 ${
                        fieldErrors.mobile
                          ? "border-red-500"
                          : "border-black/10"
                      }`}
                    />

                    {fieldErrors.mobile && (
                      <p className="mt-1.5 text-xs text-red-500 sm:mt-2 sm:text-sm">
                        {fieldErrors.mobile}
                      </p>
                    )}
                  </div>
                </div>

                {/* EMAIL */}
                <div>
                  <label className="mb-2 block text-xs font-medium text-black/70 sm:mb-3 sm:text-sm">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={`h-12 w-full rounded-xl border bg-[#f8f8f8] px-4 text-sm text-black transition-all duration-300 outline-none placeholder:text-black/30 focus:border-black sm:h-14 sm:rounded-2xl sm:px-5 ${
                      fieldErrors.email ? "border-red-500" : "border-black/10"
                    }`}
                  />

                  {fieldErrors.email && (
                    <p className="mt-1.5 text-xs text-red-500 sm:mt-2 sm:text-sm">
                      {fieldErrors.email}
                    </p>
                  )}
                </div>

                {/* MESSAGE */}
                <div>
                  <label className="mb-2 block text-xs font-medium text-black/70 sm:mb-3 sm:text-sm">
                    Message
                  </label>

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    rows={4}
                    className={`w-full resize-none rounded-xl border bg-[#f8f8f8] px-4 py-3 text-sm text-black transition-all duration-300 outline-none placeholder:text-black/30 focus:border-black sm:rounded-2xl sm:px-5 sm:py-4 ${
                      fieldErrors.message ? "border-red-500" : "border-black/10"
                    }`}
                  />

                  {fieldErrors.message && (
                    <p className="mt-1.5 text-xs text-red-500 sm:mt-2 sm:text-sm">
                      {fieldErrors.message}
                    </p>
                  )}
                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group mt-2 flex h-12 w-full items-center justify-between rounded-xl bg-black px-5 text-white shadow-lg transition-all duration-500 hover:scale-[1.02] hover:bg-neutral-900 disabled:cursor-not-allowed disabled:opacity-70 sm:h-14 sm:w-auto sm:rounded-2xl sm:px-6"
                >
                  <span className="text-xs font-semibold tracking-[0.2em] uppercase sm:text-sm">
                    {loading ? "Sending..." : "Send Message"}
                  </span>

                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-500 group-hover:rotate-45 sm:h-10 sm:w-10 sm:bg-black">
                    <ArrowUpRight size={18} className="scale-75 sm:scale-100" />
                  </div>
                </button>

                {success && (
                  <p className="mt-2 text-sm font-medium text-green-600">
                    {success}
                  </p>
                )}

                {submitError && (
                  <p className="mt-2 text-sm font-medium text-red-500">
                    {submitError}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
        {/* MAIN GRID WRAPPER */}
        <div className="relative right-1/2 left-1/2 mr-[-50vw] ml-[-50vw] w-screen border-t border-black/5">
          <div className="mx-auto grid max-w-400 gap-14 px-5 py-16 sm:px-8 lg:grid-cols-[1.2fr_0.7fr_0.7fr_1fr] lg:gap-20 lg:px-12">
            {/* BRAND */}
            <div>
              <Link href="/" className="relative mb-8 block h-14.5 w-47.5">
                <Image
                  src="/logo.webp"
                  alt="Outright Creators"
                  fill
                  className="object-contain"
                  loading="eager"
                  sizes=""
                />
              </Link>

              <p className="max-w-105 text-[15px] leading-loose text-black/70">
                Building modern experiences through strategic branding,
                immersive websites, high-converting visuals and futuristic
                creative systems.
              </p>

              {/* SOCIALS */}
              <div className="mt-5 flex items-center gap-4">
                {socials.map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Link
                      href={item.href}
                      target="_blank"
                      className="group flex h-14 w-14 items-center justify-center rounded-full border border-black/10 bg-black/3 backdrop-blur-xl transition-all duration-500 hover:border-black"
                    >
                      <Image
                        src={item.icon}
                        alt={item.alt}
                        width={18}
                        height={18}
                        className="h-10 w-10 rounded-full transition-all duration-500 group-hover:scale-110"
                      />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* NAVIGATION */}
            {navLinks.map((section) => (
              <div key={section.title}>
                <h3 className="mb-7 text-sm font-semibold tracking-[0.25em] text-black uppercase">
                  {section.title}
                </h3>

                <div className="flex flex-col gap-5">
                  {section.links.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => {
                        if (item.type === "scroll") {
                          const element = document.getElementById(item.target);

                          if (element) {
                            element.scrollIntoView({
                              behavior: "smooth",
                              block: "start",
                            });
                          }
                        }

                        if (item.type === "link") {
                          window.location.href = item.href;
                        }
                      }}
                      className="group flex w-fit items-center gap-2 text-left text-[15px] text-black/50 transition-all duration-300 hover:text-black"
                    >
                      <span>{item.label}</span>

                      <ArrowUpRight
                        size={15}
                        className="opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100"
                      />
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* CONTACT */}
            <div>
              <h3 className="mb-7 text-sm font-semibold tracking-[0.25em] text-black uppercase">
                Contact
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-black/10 bg-black/3 text-black backdrop-blur-xl">
                    <Phone size={18} />
                  </div>

                  <div>
                    <p className="mb-1 text-xs tracking-[0.2em] text-black/35 uppercase">
                      Phone
                    </p>

                    <p className="text-[15px] text-black/75">+91 9014844173</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-black/10 bg-black/3 text-black backdrop-blur-xl">
                    <Mail size={18} />
                  </div>

                  <div>
                    <p className="mb-1 text-xs tracking-[0.2em] text-black/35 uppercase">
                      Email
                    </p>

                    <p className="text-[15px] break-all text-black/75">
                      info@outrightcreators.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-black/10 bg-black/3 text-black backdrop-blur-xl">
                    <MapPin size={18} />
                  </div>

                  <div>
                    <p className="mb-1 text-xs tracking-[0.2em] text-black/35 uppercase">
                      Location
                    </p>

                    <p className="text-[15px] leading-relaxed text-black/75">
                      4th Floor, Sairaj Towers, Plot No: 49B, above Kotak
                      Mahindra Bank, beside Mercedes Benz Showroom, CBI Colony,
                      Madhapur, Hyderabad, Telangana 500033
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="flex flex-col gap-5 border-t border-black/10 pt-8 text-center">
          <p className="text-sm text-black/45">
            © 2026 Outright Creators. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
