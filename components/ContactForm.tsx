"use client";

import type React from "react";
import { useState, useCallback, useMemo, useRef, memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faMapMarkerAlt,
  faCheck,
  faExclamationTriangle,
  faLinkedin as faLinkedinBrand,
} from "@/lib/fontawesome-icons";
import ObfuscatedContent from "./ObfuscatedContent";

interface ContactFormProps {
  isOpenToWork?: boolean;
}

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string; // Honeypot field
}

interface FieldErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

interface FormStatus {
  type: "idle" | "loading" | "success" | "error";
  message?: string;
}

// Memoized input field component for optimal performance
const FormInput = memo(
  ({
    id,
    name,
    label,
    type = "text",
    value,
    onChange,
    onBlur,
    error,
    placeholder,
    required,
    disabled,
    autoComplete,
    rows,
    maxLength,
  }: {
    id: string;
    name: string;
    label: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    error?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    autoComplete?: string;
    rows?: number;
    maxLength?: number;
  }) => {
    const isTextarea = rows !== undefined;
    const InputComponent = isTextarea ? "textarea" : "input";
    const inputProps = isTextarea
      ? { rows, maxLength }
      : { type, maxLength, autoComplete };

    return (
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <label
            htmlFor={id}
            className="block text-sm font-light text-text/70"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
          {maxLength && (
            <span className="text-xs font-thin text-text/40">
              {value.length}/{maxLength}
            </span>
          )}
        </div>
        <InputComponent
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
          disabled={disabled}
          placeholder={placeholder}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`w-full px-4 py-3 bg-background/50 border rounded-lg text-text font-thin placeholder:text-text/30 focus:outline-none focus:ring-2 focus:ring-text/20 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed ${error
              ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
              : "border-border/30 focus:border-text/50 focus:bg-background/80"
            } ${isTextarea ? "resize-none" : ""}`}
          {...inputProps}
        />
        {error && (
          <p
            id={`${id}-error`}
            role="alert"
            className="text-sm font-thin text-red-600 dark:text-red-400 flex items-center gap-1 mt-1"
          >
            <FontAwesomeIcon icon={faExclamationTriangle} className="h-3 w-3" />
            {error}
          </p>
        )}
      </div>
    );
  },
);

FormInput.displayName = "FormInput";

// Email validation regex (RFC 5322 compliant subset)
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export default function ContactForm({ isOpenToWork }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "", // Honeypot field
  });

  const [status, setStatus] = useState<FormStatus>({ type: "idle" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Set<string>>(new Set());
  const formRef = useRef<HTMLFormElement>(null);

  // Validate individual field
  const validateField = useCallback(
    (name: string, value: string): string | undefined => {
      switch (name) {
        case "name":
          if (!value.trim()) return "Name is required";
          if (value.trim().length < 2) return "Name must be at least 2 characters";
          if (value.length > 100) return "Name is too long";
          return undefined;
        case "email":
          if (!value.trim()) return "Email is required";
          if (!EMAIL_REGEX.test(value.trim())) return "Please enter a valid email address";
          return undefined;
        case "subject":
          if (!value.trim()) return "Subject is required";
          if (value.trim().length < 3) return "Subject must be at least 3 characters";
          if (value.length > 200) return "Subject is too long (max 200 characters)";
          return undefined;
        case "message":
          if (!value.trim()) return "Message is required";
          if (value.trim().length < 10) return "Message must be at least 10 characters";
          if (value.length > 2000) return "Message is too long (max 2000 characters)";
          return undefined;
        default:
          return undefined;
      }
    },
    [],
  );

  // Handle input change with immediate validation
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;

      // Update form data immediately (no debounce for responsiveness)
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));

      // Validate field if it's been touched
      if (touched.has(name)) {
        const error = validateField(name, value);
        setErrors((prev) => ({
          ...prev,
          [name]: error,
        }));
      }

      // Clear global error when user starts typing
      if (status.type === "error") {
        setStatus({ type: "idle" });
      }
    },
    [touched, validateField, status.type],
  );

  // Handle blur for validation
  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setTouched((prev) => new Set(prev).add(name));

      const error = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    },
    [validateField],
  );


  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      // Mark all fields as touched
      setTouched(new Set(["name", "email", "subject", "message"]));

      // Validate form and get errors
      const newErrors: FieldErrors = {};
      let isValid = true;

      (["name", "email", "subject", "message"] as const).forEach((field) => {
        const error = validateField(field, formData[field]);
        if (error) {
          newErrors[field] = error;
          isValid = false;
        }
      });

      setErrors(newErrors);

      if (!isValid) {
        // Focus first error field
        const firstErrorField = Object.keys(newErrors)[0] || "name";
        setTimeout(() => {
          const errorElement = formRef.current?.querySelector(
            `[name="${firstErrorField}"]`,
          ) as HTMLElement;
          errorElement?.focus();
        }, 0);
        return;
      }

      setStatus({ type: "loading" });

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (response.ok) {
          setStatus({
            type: "success",
            message: result.message || "Message sent successfully!",
          });
          // Reset form on success
          setFormData({
            name: "",
            email: "",
            subject: "",
            message: "",
            website: "",
          });
          setErrors({});
          setTouched(new Set());
          // Focus name field after success
          setTimeout(() => {
            const nameInput = formRef.current?.querySelector(
              '[name="name"]',
            ) as HTMLInputElement;
            nameInput?.focus();
          }, 100);
        } else {
          setStatus({
            type: "error",
            message: result.error || "Failed to send message. Please try again.",
          });
        }
      } catch (error) {
        console.error("Contact form error:", error);
        setStatus({
          type: "error",
          message: "Network error. Please check your connection and try again.",
        });
      }
    },
    [formData, validateField],
  );

  const isFormValid = useMemo(
    () =>
      formData.name.trim() &&
      formData.email.trim() &&
      formData.subject.trim() &&
      formData.message.trim() &&
      !errors.name &&
      !errors.email &&
      !errors.subject &&
      !errors.message,
    [
      formData.name,
      formData.email,
      formData.subject,
      formData.message,
      errors.name,
      errors.email,
      errors.subject,
      errors.message,
    ],
  );

  // Keyboard shortcut: Cmd/Ctrl+Enter to submit
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLFormElement>) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        if (isFormValid && status.type !== "loading") {
          handleSubmit(e as unknown as React.FormEvent);
        }
      }
    },
    [handleSubmit, isFormValid, status.type],
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
      {/* Contact Information */}
      <section className="space-y-8">
        <h2 className="text-3xl font-extralight mb-8">Contact Information</h2>

        {/* Email */}
        <div className="flex items-start gap-4 p-6 rounded-lg border border-border/30 bg-background/50 hover:bg-background/80 transition-slow hover-lift">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-text/10 flex items-center justify-center">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="h-5 w-5 text-text/70"
            />
          </div>
          <div>
            <h3 className="text-xl font-light mb-1">Email</h3>
            <ObfuscatedContent
              content="daniel.astudillo404@gmail.com"
              type="email"
              fakeContent="contact@danielastudillo.io"
              className="text-lg font-thin text-text/70 mb-2 hover:text-text transition-standard"
            >
              daniel.astudillo404@gmail.com
            </ObfuscatedContent>
            <p className="text-sm font-thin text-text/50">
              I typically respond in ≤ 2 hours
            </p>
          </div>
        </div>

        {/* LinkedIn */}
        <div className="flex items-start gap-4 p-6 rounded-lg border border-border/30 bg-background/50 hover:bg-background/80 transition-slow hover-lift">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-text/10 flex items-center justify-center">
            <FontAwesomeIcon
              icon={faLinkedinBrand}
              className="h-5 w-5 text-text/70"
            />
          </div>
          <div>
            <h3 className="text-xl font-light mb-1">LinkedIn</h3>
            <a
              href="https://linkedin.com/in/daniel-m-astudillo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-thin text-text/70 hover:text-text transition-standard"
            >
              linkedin.com/in/daniel-m-astudillo
            </a>
            <p className="text-sm font-thin text-text/50">
              Connect for professional opportunities
            </p>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-start gap-4 p-6 rounded-lg border border-border/30 bg-background/50 hover:bg-background/80 transition-slow hover-lift">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-text/10 flex items-center justify-center">
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              className="h-5 w-5 text-text/70"
            />
          </div>
          <div>
            <h3 className="text-xl font-light mb-1">Location</h3>
            <p className="text-lg font-thin text-text/70 mb-2">
              NYC Metropolitan Area
            </p>
            {isOpenToWork && (
              <p className="text-sm font-thin text-text/50">
                Open to onsite, hybrid, and remote opportunities.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="space-y-8">
        <h2 className="text-3xl font-extralight mb-8">Send a Message</h2>

        {/* Status Messages */}
        {status.type === "success" && (
          <div
            role="alert"
            className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg animate-fade-in"
          >
            <FontAwesomeIcon
              icon={faCheck}
              className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0"
            />
            <p className="text-green-800 dark:text-green-200 font-thin">
              {status.message}
            </p>
          </div>
        )}

        {status.type === "error" && (
          <div
            role="alert"
            className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg animate-fade-in"
          >
            <FontAwesomeIcon
              icon={faExclamationTriangle}
              className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0"
            />
            <p className="text-red-800 dark:text-red-200 font-thin">
              {status.message}
            </p>
          </div>
        )}

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          onKeyDown={handleKeyDown}
          className="space-y-6"
          noValidate
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              id="name"
              name="name"
              label="Name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.name}
              placeholder="Your name"
              required
              disabled={status.type === "loading"}
              autoComplete="name"
              maxLength={100}
            />

            <FormInput
              id="email"
              name="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email}
              placeholder="your.email@example.com"
              required
              disabled={status.type === "loading"}
              autoComplete="email"
            />
          </div>

          <FormInput
            id="subject"
            name="subject"
            label="Subject"
            type="text"
            value={formData.subject}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.subject}
            placeholder="What's this about?"
            required
            disabled={status.type === "loading"}
            autoComplete="off"
            maxLength={200}
          />

          <FormInput
            id="message"
            name="message"
            label="Message"
            value={formData.message}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.message}
            placeholder="Tell me about your project, opportunity, or just say hello!"
            required
            disabled={status.type === "loading"}
            rows={6}
            maxLength={2000}
          />

          {/* Honeypot field - hidden from users but visible to bots */}
          <div className="absolute left-[-9999px] opacity-0 pointer-events-none">
            <label htmlFor="website" className="sr-only">
              Website
            </label>
            <input
              type="text"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />
          </div>

          <div className="flex flex-col items-center gap-2">
            <button
              type="submit"
              disabled={!isFormValid || status.type === "loading"}
              className="px-8 py-4 bg-text text-background text-lg font-thin rounded-lg border border-border/50 hover:bg-text/90 transition-all duration-200 hover-scale focus:outline-none focus:ring-2 focus:ring-text/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-text disabled:hover:scale-100"
            >
              {status.type === "loading" ? (
                <span className="flex items-center gap-2">
                  <span className="inline-block w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
                  Sending...
                </span>
              ) : (
                "Send Message"
              )}
            </button>
            <p className="text-xs font-thin text-text/40">
              Press <kbd className="px-1.5 py-0.5 bg-background/50 border border-border/30 rounded text-[10px]">⌘</kbd> + <kbd className="px-1.5 py-0.5 bg-background/50 border border-border/30 rounded text-[10px]">Enter</kbd> to send
            </p>
          </div>
        </form>
      </section>
    </div>
  );
}
