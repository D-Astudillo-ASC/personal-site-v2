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
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => void;
    onBlur?: (
      e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => void;
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
          <label htmlFor={id} className="block text-sm font-medium text-muted">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
          {maxLength && (
            <span className="text-xs text-muted/70">
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
          className={`w-full rounded-lg border bg-background px-4 py-3 text-text placeholder:text-muted/50 transition-fast focus:outline-none focus:ring-2 focus:ring-accent/30 disabled:cursor-not-allowed disabled:opacity-50 ${
            error
              ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
              : "border-border focus:border-accent/50"
          } ${isTextarea ? "resize-none" : ""}`}
          {...inputProps}
        />
        {error && (
          <p
            id={`${id}-error`}
            role="alert"
            className="mt-1 flex items-center gap-1 text-sm text-red-600 dark:text-red-400"
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
          if (value.trim().length < 2)
            return "Name must be at least 2 characters";
          if (value.length > 100) return "Name is too long";
          return undefined;
        case "email":
          if (!value.trim()) return "Email is required";
          if (!EMAIL_REGEX.test(value.trim()))
            return "Please enter a valid email address";
          return undefined;
        case "subject":
          if (!value.trim()) return "Subject is required";
          if (value.trim().length < 3)
            return "Subject must be at least 3 characters";
          if (value.length > 200)
            return "Subject is too long (max 200 characters)";
          return undefined;
        case "message":
          if (!value.trim()) return "Message is required";
          if (value.trim().length < 10)
            return "Message must be at least 10 characters";
          if (value.length > 2000)
            return "Message is too long (max 2000 characters)";
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
            message: result.message || "Got it — I'll reply soon.",
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
            message:
              result.error || "Failed to send message. Please try again.",
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
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
      {/* Contact Information */}
      <section className="space-y-8">
        <h2 className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-muted">
          Contact information
        </h2>

        {/* Email */}
        <div className="flex items-start gap-4 rounded-lg border border-border bg-surface p-6 transition-fast hover:border-text/15">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-text/5">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="h-4 w-4 text-accent"
            />
          </div>
          <div>
            <h3 className="mb-1 text-base font-medium text-text">Email</h3>
            <ObfuscatedContent
              content="daniel.astudillo404@gmail.com"
              type="email"
              fakeContent="contact@danielastudillo.io"
              className="mb-2 text-sm text-muted transition-fast hover:text-accent"
            >
              daniel.astudillo404@gmail.com
            </ObfuscatedContent>
            <p className="text-sm text-muted/80">
              Usually a reply within a couple of hours.
            </p>
          </div>
        </div>

        {/* LinkedIn */}
        <div className="flex items-start gap-4 rounded-lg border border-border bg-surface p-6 transition-fast hover:border-text/15">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-text/5">
            <FontAwesomeIcon
              icon={faLinkedinBrand}
              className="h-4 w-4 text-accent"
            />
          </div>
          <div>
            <h3 className="mb-1 text-base font-medium text-text">LinkedIn</h3>
            <a
              href="https://linkedin.com/in/daniel-m-astudillo"
              target="_blank"
              rel="noopener noreferrer"
              className="mb-2 block text-sm text-muted transition-fast hover:text-accent"
            >
              linkedin.com/in/daniel-m-astudillo
            </a>
            <p className="text-sm text-muted/80">
              Connect or send a direct message.
            </p>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-start gap-4 rounded-lg border border-border bg-surface p-6 transition-fast hover:border-text/15">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-text/5">
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              className="h-4 w-4 text-accent"
            />
          </div>
          <div>
            <h3 className="mb-1 text-base font-medium text-text">Location</h3>
            <p className="mb-2 text-sm text-muted">NYC Metropolitan Area</p>
            {isOpenToWork ? (
              <p className="text-sm text-muted/80">
                Open to onsite, hybrid, and remote opportunities.
              </p>
            ) : null}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="space-y-8">
        <h2 className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-muted">
          Send a message
        </h2>

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
            <p className="text-green-800 dark:text-green-200">
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
            <p className="text-red-800 dark:text-red-200">
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
            placeholder="Tell me what you're building, or just say hello."
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
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-8 py-3.5 text-sm font-medium text-stone-900 transition-fast hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status.type === "loading" ? (
                <span className="flex items-center gap-2">
                  <span className="inline-block w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
                  Sending...
                </span>
              ) : (
                "Send message"
              )}
            </button>
            <p className="text-xs text-muted/70">
              Press{" "}
              <kbd className="rounded border border-border bg-surface px-1.5 py-0.5 font-mono text-[10px]">
                ⌘
              </kbd>{" "}
              +{" "}
              <kbd className="rounded border border-border bg-surface px-1.5 py-0.5 font-mono text-[10px]">
                Enter
              </kbd>{" "}
              to send
            </p>
          </div>
        </form>
      </section>
    </div>
  );
}
