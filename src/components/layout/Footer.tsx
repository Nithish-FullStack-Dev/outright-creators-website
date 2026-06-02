// components/layout/Footer.tsx

"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Mail, MapPin, Phone, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import TextReveal from "../motion/TextReveal";
import { usePageTransition } from "../transitions/TransitionProvider";

const navLinks = [
  {
    title: "Navigation",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Collections", href: "/collections" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms-and-conditions" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

const socials = [
  {
    icon: "/assets/FaceBook.jpg",
    alt: "Facebook",
    href: "https://www.facebook.com/outrightcreators/",
  },
  {
    icon: "/assets/insta.jpg",
    alt: "Instagram",
    href: "https://www.instagram.com/outrightcreators/",
  },
  {
    icon: "/assets/LinkedIn.jpg",
    alt: "LinkedIn",
    href: "https://www.linkedin.com/company/outright-creators",
  },
];

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  const { navigate } = usePageTransition();
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

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 22,
    mass: 0.5,
  });

  const titleY = useTransform(smoothProgress, [0, 1], [180, 0]);
  const titleOpacity = useTransform(smoothProgress, [0, 0.4], [0, 1]);

  const rightY = useTransform(smoothProgress, [0, 1], [120, 0]);
  const gridY = useTransform(smoothProgress, [0, 1], [100, 0]);
  const gridOpacity = useTransform(smoothProgress, [0, 0.4], [0, 1]);

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
      ref={footerRef}
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

      <div className="relative mx-auto max-w-[1600px] px-5 pt-10 pb-8 sm:px-8 lg:px-12">
        {/* TOP SECTION */}
        <div className="grid gap-10 border-b border-white/10 pb-14 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
          {/* LEFT */}
          <motion.div
            style={{
              y: titleY,
              opacity: titleOpacity,
            }}
            className="flex flex-col justify-center"
          >
            <div className="mb-7 inline-flex w-fit items-center gap-2 rounded-full border border-yellow-400/20 bg-yellow-400/10 px-4 py-2 text-sm text-black backdrop-blur-xl">
              <Sparkles size={14} />
              Let’s Build Something Extraordinary
            </div>

            <TextReveal
              lines={["Let`s", "Connect"]}
              className="text-4xl leading-[1.05] font-bold sm:text-6xl md:text-7xl xl:text-8xl"
            />

            <p className="mt-8 max-w-[620px] text-[15px] leading-[2] text-black sm:text-[16px]">
              We craft cinematic digital experiences blending strategy,
              branding, development and immersive visuals for ambitious brands.
            </p>
          </motion.div>

          {/* RIGHT FORM */}
          <motion.div
            style={{
              y: rightY,
              opacity: titleOpacity,
            }}
            className="relative overflow-hidden rounded-[36px] border border-black/10 bg-white p-7 shadow-[0_20px_80px_rgba(0,0,0,0.08)]"
          >
            <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-neutral-200 blur-3xl" />

            <div className="relative">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <p className="mb-2 text-sm tracking-[0.25em] text-black/40 uppercase">
                    Contact Form
                  </p>

                  <h3 className="text-3xl font-semibold text-black">
                    Start Your Project
                  </h3>
                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-white shadow-lg">
                  <ArrowUpRight size={22} />
                </div>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid gap-5 md:grid-cols-2">
                  {/* NAME */}
                  <div>
                    <label className="mb-3 block text-sm font-medium text-black/70">
                      Full Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className={`h-14 w-full rounded-2xl border bg-[#f8f8f8] px-5 text-sm text-black transition-all duration-300 outline-none placeholder:text-black/30 focus:border-black ${
                        fieldErrors.name ? "border-red-500" : "border-black/10"
                      }`}
                    />

                    {fieldErrors.name && (
                      <p className="mt-2 text-sm text-red-500">
                        {fieldErrors.name}
                      </p>
                    )}
                  </div>

                  {/* MOBILE */}
                  <div>
                    <label className="mb-3 block text-sm font-medium text-black/70">
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
                      className={`h-14 w-full rounded-2xl border bg-[#f8f8f8] px-5 text-sm text-black transition-all duration-300 outline-none placeholder:text-black/30 focus:border-black ${
                        fieldErrors.mobile
                          ? "border-red-500"
                          : "border-black/10"
                      }`}
                    />

                    {fieldErrors.mobile && (
                      <p className="mt-2 text-sm text-red-500">
                        {fieldErrors.mobile}
                      </p>
                    )}
                  </div>
                </div>

                {/* EMAIL */}
                <div>
                  <label className="mb-3 block text-sm font-medium text-black/70">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={`h-14 w-full rounded-2xl border bg-[#f8f8f8] px-5 text-sm text-black transition-all duration-300 outline-none placeholder:text-black/30 focus:border-black ${
                      fieldErrors.email ? "border-red-500" : "border-black/10"
                    }`}
                  />

                  {fieldErrors.email && (
                    <p className="mt-2 text-sm text-red-500">
                      {fieldErrors.email}
                    </p>
                  )}
                </div>

                {/* MESSAGE */}
                <div>
                  <label className="mb-3 block text-sm font-medium text-black/70">
                    Message
                  </label>

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    rows={5}
                    className={`w-full resize-none rounded-2xl border bg-[#f8f8f8] px-5 py-4 text-sm text-black transition-all duration-300 outline-none placeholder:text-black/30 focus:border-black ${
                      fieldErrors.message ? "border-red-500" : "border-black/10"
                    }`}
                  />

                  {fieldErrors.message && (
                    <p className="mt-2 text-sm text-red-500">
                      {fieldErrors.message}
                    </p>
                  )}
                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group mt-2 flex h-14 items-center justify-between rounded-2xl bg-black px-6 text-white shadow-lg transition-all duration-500 hover:scale-[1.02] hover:bg-neutral-900 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <span className="text-sm font-semibold tracking-[0.2em] uppercase">
                    {loading ? "Sending..." : "Send Message"}
                  </span>

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white transition-all duration-500 group-hover:rotate-45">
                    <ArrowUpRight size={18} />
                  </div>
                </button>

                {success && (
                  <p className="mt-3 text-sm font-medium text-green-600">
                    {success}
                  </p>
                )}

                {submitError && (
                  <p className="mt-3 text-sm font-medium text-red-500">
                    {submitError}
                  </p>
                )}
              </form>
            </div>
          </motion.div>
        </div>
        {/* MAIN GRID WRAPPER */}
        <div className="relative right-1/2 left-1/2 mr-[-50vw] ml-[-50vw] w-screen border-t border-black/5">
          <motion.div
            style={{
              y: gridY,
              opacity: gridOpacity,
            }}
            className="mx-auto grid max-w-[1600px] gap-14 px-5 py-16 sm:px-8 lg:grid-cols-[1.2fr_0.7fr_0.7fr_1fr] lg:gap-20 lg:px-12"
          >
            {/* BRAND */}
            <div>
              <Link href="/" className="relative mb-8 block h-[58px] w-[190px]">
                <Image
                  src="/logo.webp"
                  alt="Outright Creators"
                  fill
                  className="object-contain"
                  loading="eager"
                />
              </Link>

              <p className="max-w-[420px] text-[15px] leading-[2] text-black/70">
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
                      className="group flex h-14 w-14 items-center justify-center rounded-full border border-black/10 bg-black/[0.03] backdrop-blur-xl transition-all duration-500 hover:border-black"
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
                      onClick={() => navigate(item.href)}
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
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-black/10 bg-black/[0.03] text-black backdrop-blur-xl">
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
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-black/10 bg-black/[0.03] text-black backdrop-blur-xl">
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
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-black/10 bg-black/[0.03] text-black backdrop-blur-xl">
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
          </motion.div>
        </div>

        {/* BOTTOM */}
        <motion.div
          style={{
            opacity: gridOpacity,
            y: useTransform(smoothProgress, [0, 1], [60, 0]),
          }}
          className="flex flex-col gap-5 border-t border-black/10 pt-8 text-center md:flex-row md:items-center md:justify-between md:text-left"
        >
          <p className="text-sm text-black/45">
            © 2026 Outright Creators. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-black/45 md:justify-end">
            <button
              onClick={() => navigate("/privacy-policy")}
              className="transition-colors duration-300 hover:text-black"
            >
              Privacy Policy
            </button>

            <button
              onClick={() => navigate("/terms-and-conditions")}
              className="transition-colors duration-300 hover:text-yellow-300"
            >
              Terms & Conditions
            </button>

            <button
              onClick={() => navigate("/cookies")}
              className="transition-colors duration-300 hover:text-yellow-300"
            >
              Cookies
            </button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
