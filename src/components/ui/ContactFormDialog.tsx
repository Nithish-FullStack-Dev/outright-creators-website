"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

type FormData = {
  name: string;
  mobile: string;
  email: string;
  message: string;
};

type FieldErrors = {
  name?: string;
  mobile?: string;
  email?: string;
  message?: string;
};

interface ContactFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ContactFormDialog({
  open,
  onOpenChange,
}: ContactFormDialogProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    mobile: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [submitError, setSubmitError] = useState("");

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setSubmitError("");

    if (!validateForm()) {
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
        setFormData({ name: "", email: "", mobile: "", message: "" });
      } else {
        setSubmitError("Something went wrong");
      }
    } catch (err) {
      setSubmitError("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const errors: FieldErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      errors.name = "Full name is required";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = "Email address is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Enter a valid email address";
      isValid = false;
    }

    const mobileRegex = /^[6-9]\d{9}$/;
    if (!formData.mobile.trim()) {
      errors.mobile = "Mobile number is required";
      isValid = false;
    } else if (!mobileRegex.test(formData.mobile)) {
      errors.mobile = "Enter a valid 10-digit mobile number";
      isValid = false;
    }

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-3xl p-6 sm:max-w-162.5">
        <DialogHeader>
          <DialogTitle className="text-2xl">Let&apos;s Talk</DialogTitle>

          <DialogDescription>Tell us about your project</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
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
                className={`h-12 w-full rounded-xl border bg-[#f8f8f8] px-4 text-sm text-black transition-colors duration-300 outline-none placeholder:text-black/30 focus:border-black focus:bg-white sm:h-14 sm:rounded-2xl sm:px-5 ${
                  fieldErrors.name ? "border-red-500" : "border-black/10"
                }`}
              />
              {fieldErrors.name && (
                <p className="mt-1.5 text-xs text-red-500 sm:mt-2 sm:text-sm">
                  {fieldErrors.name}
                </p>
              )}
            </div>

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
                    setFormData((prev) => ({ ...prev, mobile: value }));
                    setFieldErrors((prev) => ({ ...prev, mobile: "" }));
                  }
                }}
                inputMode="numeric"
                placeholder="9876543210"
                className={`h-12 w-full rounded-xl border bg-[#f8f8f8] px-4 text-sm text-black transition-colors duration-300 outline-none placeholder:text-black/30 focus:border-black focus:bg-white sm:h-14 sm:rounded-2xl sm:px-5 ${
                  fieldErrors.mobile ? "border-red-500" : "border-black/10"
                }`}
              />
              {fieldErrors.mobile && (
                <p className="mt-1.5 text-xs text-red-500 sm:mt-2 sm:text-sm">
                  {fieldErrors.mobile}
                </p>
              )}
            </div>
          </div>

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
              className={`h-12 w-full rounded-xl border bg-[#f8f8f8] px-4 text-sm text-black transition-colors duration-300 outline-none placeholder:text-black/30 focus:border-black focus:bg-white sm:h-14 sm:rounded-2xl sm:px-5 ${
                fieldErrors.email ? "border-red-500" : "border-black/10"
              }`}
            />
            {fieldErrors.email && (
              <p className="mt-1.5 text-xs text-red-500 sm:mt-2 sm:text-sm">
                {fieldErrors.email}
              </p>
            )}
          </div>

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
              className={`w-full resize-none rounded-xl border bg-[#f8f8f8] px-4 py-3 text-sm text-black transition-colors duration-300 outline-none placeholder:text-black/30 focus:border-black focus:bg-white sm:rounded-2xl sm:px-5 sm:py-4 ${
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
            className="group mt-2 flex h-12 w-full items-center justify-between rounded-xl bg-black px-5 text-white shadow-lg transition-all duration-300 hover:bg-neutral-900 disabled:cursor-not-allowed disabled:opacity-70 sm:h-14 sm:rounded-2xl sm:px-6"
          >
            <span className="text-xs font-semibold tracking-[0.2em] uppercase sm:text-sm">
              {loading ? "Sending..." : "Send Message"}
            </span>

            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 group-hover:rotate-45 sm:h-10 sm:w-10">
              <ArrowUpRight size={18} className="scale-75 sm:scale-100" />
            </div>
          </button>

          {success && (
            <p className="mt-2 text-sm font-medium text-green-600">{success}</p>
          )}

          {submitError && (
            <p className="mt-2 text-sm font-medium text-red-500">
              {submitError}
            </p>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
