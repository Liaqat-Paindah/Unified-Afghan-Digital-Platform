"use client";

import {
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-white px-4 py-20 text-slate-900 dark:bg-[#050816] dark:text-white sm:px-6 lg:px-8">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-125 w-125 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute -right-32 top-1/3 h-80 w-80 rounded-full bg-purple-500/10 blur-[110px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-sm bg-linear-to-br from-cyan-500 to-blue-600">
            <MessageCircle className="h-6 w-6 text-white" />
          </div>

          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
            How can we help?
          </h1>

          <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-400">
            Have a question about the platform, planned data sources, or
            responsible integration? Send us a message.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {/* Contact information */}
          <div className="space-y-4">
            {[
              {
                icon: Mail,
                title: "Email",
                value: "support@example.com",
                description: "For general questions and support",
              },
              {
                icon: Phone,
                title: "Phone",
                value: "+93 XXX XXX XXX",
                description: "For direct assistance",
              },
              {
                icon: MapPin,
                title: "Location",
                value: "Afghanistan",
                description: "Serving local communities",
              },
              {
                icon: Clock3,
                title: "Support hours",
                value: "Saturday – Thursday",
                description: "During normal business hours",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-sm border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#0b1020]"
                >
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-cyan-500/10">
                      <Icon className="h-5 w-5 text-cyan-500" />
                    </div>

                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {item.title}
                      </p>

                      <p className="mt-1 text-sm font-semibold">
                        {item.value}
                      </p>

                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="rounded-sm border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#0b1020] sm:p-8"
            >
              {submitted ? (
                <div className="flex min-h-100 flex-col items-center justify-center text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10">
                    <ShieldCheck className="h-7 w-7 text-emerald-500" />
                  </div>

                  <h2 className="mt-5 text-2xl font-bold">
                    Message received
                  </h2>

                  <p className="mt-3 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
                    Thank you for contacting us. Our team will review your
                    message and get back to you.
                  </p>

                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-6 rounded-sm border border-slate-200 px-5 py-2.5 text-sm font-semibold transition hover:bg-slate-50 dark:border-white/10 dark:hover:bg-white/5"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="text-sm font-semibold"
                      >
                        Your name
                      </label>

                      <input
                        id="name"
                        name="name"
                        required
                        placeholder="Enter your name"
                        className="mt-2 w-full rounded-sm border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 dark:border-white/10 dark:bg-white/5"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="text-sm font-semibold"
                      >
                        Email address
                      </label>

                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="you@example.com"
                        className="mt-2 w-full rounded-sm border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 dark:border-white/10 dark:bg-white/5"
                      />
                    </div>
                  </div>

                  <div className="mt-5">
                    <label
                      htmlFor="subject"
                      className="text-sm font-semibold"
                    >
                      Subject
                    </label>

                    <input
                      id="subject"
                      name="subject"
                      required
                      placeholder="How can we help?"
                      className="mt-2 w-full rounded-sm border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 dark:border-white/10 dark:bg-white/5"
                    />
                  </div>

                  <div className="mt-5">
                    <label
                      htmlFor="message"
                      className="text-sm font-semibold"
                    >
                      Message
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      placeholder="Tell us how we can help..."
                      className="mt-2 w-full resize-none rounded-sm border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 dark:border-white/10 dark:bg-white/5"
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-linear-to-r from-cyan-500 via-blue-600 to-purple-600 px-5 py-3.5 text-sm font-semibold text-white shadow-sm shadow-blue-500/20 transition hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <Send className="h-4 w-4" />
                    Send message
                  </button>

                  <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-slate-500 dark:text-slate-400">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                    Your information is kept private.
                  </p>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}