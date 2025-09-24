"use client";

import { useEffect, useState } from "react";
import Select from "react-select";
import { FaArrowRight } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import {
  submitContactForm,
  ContactFormData,
  subscribeNewsletter,
} from "@/Service/api";

const referralOptions = [
  { value: "Google", label: "Google" },
  { value: "Social Media", label: "Social Media" },
  { value: "Referral", label: "Referral" },
  { value: "Other", label: "Other" },
];

export default function ContactForm() {
  const [hydrated, setHydrated] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [referralSource, setReferralSource] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const services = [
    "Brand Strategy",
    "Visual Identity",
    "Website",
    "Digital Product",
    "E-commerce",
    "Content Design",
  ];

  useEffect(() => {
    setHydrated(true);
  }, []);

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const name = (
      form.elements.namedItem("name") as HTMLInputElement
    ).value.trim();
    const business = (
      form.elements.namedItem("business") as HTMLInputElement
    ).value.trim();
    const email = (
      form.elements.namedItem("email") as HTMLInputElement
    ).value.trim();
    const contact = (
      form.elements.namedItem("contact") as HTMLInputElement
    ).value.trim();
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement)
      .value;
    const newsletter = (
      form.elements.namedItem("newsletter") as HTMLInputElement
    ).checked;

    const newErrors: Record<string, string> = {};

    if (selectedServices.length === 0)
      newErrors.services = "Please select at least one service.";
    if (!name) newErrors.name = "Name is required.";
    if (!business) newErrors.business = "Business is required.";
    if (!email) newErrors.email = "Email is required.";
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email))
      newErrors.email = "Enter a valid email address.";
    if (!contact) newErrors.contact = "Contact number is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const formData: ContactFormData = {
      services: selectedServices,
      name,
      business,
      email,
      referral: referralSource,
      contact,
      message,
      newsletter,
    };

    try {
      const res = await submitContactForm(formData);
      if (res.success) {
        toast.success(res.message || "Form submitted successfully.");
        setSubmitted(true);
      } else {
        toast.error(res.message || "Failed to submit form.");
      }
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to submit form.";
      toast.error(message);
      console.error("Contact form submission error:", error);
    }
  };

  const handleNewsletterChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = e.target.checked;
    const emailInput = (
      document.querySelector<HTMLInputElement>('input[name="email"]')?.value ||
      ""
    ).trim();

    if (!checked) return;

    if (!emailInput) {
      toast.error("Please enter your email to subscribe.");
      e.target.checked = false;
      return;
    }

    try {
      const data = await subscribeNewsletter(emailInput);
      if (data.success) {
        toast.success(data.message || "Subscribed successfully!");
      } else {
        toast.error(data.message || "Subscription failed.");
        e.target.checked = false;
      }
    } catch (err) {
      console.error("Subscribe error:", err);
      toast.error("Something went wrong. Please try again.");
      e.target.checked = false;
    }
  };

  if (!hydrated) return null;

  return (
    <div className="max-w-8xl mx-auto">
      <p className="text-lg text-[#dad9d6] mb-8 pt-2">
        “<span className="text-red">*</span>” indicates required fields
      </p>

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="thanks"
            className="p-6 rounded-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mb-2">Thank you!</h2>
            <p>We’ve received your message.</p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            method="POST"
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="pb-10">
              <p className="text-[#81837e] mb-2">
                Select the services you’re interested in:
                <span className="text-lg">*</span>
                {errors.services && (
                  <p className="text-[#dad9d6] text-sm mt-2">
                    {errors.services}
                  </p>
                )}
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {services.map((service, i) => {
                  const isSelected = selectedServices.includes(service);
                  return (
                    <motion.button
                      key={service}
                      type="button"
                      onClick={() => toggleService(service)}
                      whileTap={{ scale: 0.97 }}
                      whileHover={{ scale: 1.02 }}
                      transition={{ delay: i * 0.05 }}
                      className={`w-full text-left border-b py-4 px-6 flex items-center gap-4 transition-all duration-200 ${
                        isSelected
                          ? "text-[#dad9d6] border-[#dad9d6]"
                          : "text-[#81837e] border-[#81837e] hover:border-[#a0a3a0]"
                      }`}
                    >
                      <span
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          isSelected ? "border-white" : "border-[#81837e]"
                        }`}
                      >
                        {isSelected && (
                          <span className="w-2 h-2 bg-[#dad9d6] rounded-full"></span>
                        )}
                      </span>
                      {service}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Name *"
                  className={`bg-transparent border-b w-full pb-3 pl-3 placeholder:text-[#81837e] focus:outline-none hover:border-b-[#a0a3a0] ${
                    errors.name ? "border-[#a0a3a0]" : "border-[#81837e]"
                  }`}
                />
                {errors.name && (
                  <p className="text-[#dad9d6] text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  name="business"
                  placeholder="Business *"
                  className={`bg-transparent border-b w-full pb-3 pl-3 placeholder:text-[#81837e] focus:outline-none hover:border-b-[#a0a3a0] ${
                    errors.business ? "border-[#a0a3a0]" : "border-[#81837e]"
                  }`}
                />
                {errors.business && (
                  <p className="text-[#dad9d6] text-sm mt-1">
                    {errors.business}
                  </p>
                )}
              </div>
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Email *"
                className="bg-transparent border-b border-[#81837e] w-full placeholder:text-[#81837e] focus:outline-none pb-3 pl-3 hover:border-b-[#a0a3a0]"
              />
              {errors.email && (
                <p className="text-[#dad9d6] text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <Select
                options={referralOptions}
                placeholder="How did you hear about us?"
                onChange={(selected) =>
                  setReferralSource(selected?.value || "")
                }
                styles={{
                  control: (base) => ({
                    ...base,
                    backgroundColor: "transparent",
                    border: "none",
                    borderBottom: "1px solid #81837e",
                    borderRadius: 0,
                    boxShadow: "none",
                    paddingBottom: 6,
                    ":hover": { borderBottom: "1px solid #a0a3a0" },
                    ":focus-within": {
                      borderBottom: "1px solid #dad9d6",
                      boxShadow: "none",
                    },
                  }),
                  menu: (base) => ({
                    ...base,
                    backgroundColor: "#5a5d59",
                    color: "#dad9d6",
                    boxShadow: "none",
                  }),
                  singleValue: (base) => ({ ...base, color: "#81837e" }),
                  placeholder: (base) => ({ ...base, color: "#81837e" }),
                  input: (base) => ({ ...base, color: "#dad9d6" }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: "transparent",
                    color: "#dad9d6",
                    cursor: "pointer",
                    borderBottom: state.isFocused
                      ? "1px solid #dad9d6"
                      : "1px solid transparent",
                    padding: "10px 12px",
                    ":active": { backgroundColor: "transparent" },
                    ":focus": { backgroundColor: "transparent" },
                  }),
                }}
              />
            </div>

            <div>
              <input
                type="text"
                name="contact"
                placeholder="Contact Number *"
                className="bg-transparent border-b border-[#81837e] w-full placeholder:text-[#81837e] focus:outline-none pb-3 pl-3 hover:border-b-[#a0a3a0]"
              />
              {errors.contact && (
                <p className="text-[#dad9d6] text-sm mt-1">{errors.contact}</p>
              )}
            </div>

            <textarea
              name="message"
              rows={4}
              placeholder="Message"
              className="bg-transparent border-b border-[#81837e] w-full placeholder:text-[#81837e] focus:outline-none resize-none pb-3 pl-3 hover:border-b-[#a0a3a0]"
            ></textarea>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="newsletter"
                className="form-checkbox text-[#81837e] border-[#81837e]"
                onChange={handleNewsletterChange}
              />
              <label htmlFor="newsletter" className="text-sm text-[#81837e]">
                Subscribe to our newsletter
              </label>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-[#dad9d6] font-semibold text-lg flex items-center gap-2 group"
            >
              Submit{" "}
              <motion.span
                className="transform text-sm"
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FaArrowRight />
              </motion.span>
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
