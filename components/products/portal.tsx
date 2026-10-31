"use client";

import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  Download,
  FileText,
  Loader2,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { usePortal } from "@/hooks/useCheckout";

type Invoice = {
  id: string;
  number: string;
  date: string;
  amount: number;
  status: "Paid" | "Open" | "Failed";
};

const invoices: Invoice[] = [
  {
    id: "1",
    number: "INV-001",
    date: "Sep 01, 2026",
    amount: 25,
    status: "Paid",
  },
  {
    id: "2",
    number: "INV-002",
    date: "Aug 01, 2026",
    amount: 25,
    status: "Paid",
  },
  {
    id: "3",
    number: "INV-003",
    date: "Jul 01, 2026",
    amount: 25,
    status: "Paid",
  },
];

export default function Billing() {
  const { mutate, isPending } = usePortal();

  const handleManageBilling = () => {
    mutate();
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-white px-4 py-16 text-slate-900 transition-colors dark:bg-[#050816] dark:text-white sm:px-6 lg:px-8">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-125 w-125 -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px] dark:bg-cyan-500/10" />

        <div className="absolute -left-32 top-1/3 h-72 w-72 rounded-full bg-purple-500/10 blur-[100px]" />

        <div className="absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-sm font-medium text-cyan-500">
            <CreditCard className="h-4 w-4" />
            Billing
          </div>

          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Billing & Subscription
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400 sm:text-base">
            Manage your subscription, payment method, billing cycle, and
            invoices from one place.
          </p>
        </div>

        {/* Top Cards */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Current Subscription */}
          <div className="group relative rounded-sm p-px">
            <div className="absolute -inset-1 rounded-sm bg-linear-to-r from-cyan-500/20 via-blue-500/20 to-purple-600/20 opacity-70 blur-xl" />

            <div className="relative h-full rounded-sm border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#0b1020] sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-sm bg-linear-to-br from-cyan-500/10 to-blue-500/10 ring-1 ring-cyan-500/20">
                    <ShieldCheck className="h-5 w-5 text-blue-500" />
                  </div>

                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Current plan
                    </p>

                    <h2 className="text-xl font-bold">Enterprise</h2>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Active
                </span>
              </div>

              <div className="mt-8 flex items-end gap-2">
                <span className="text-4xl font-bold tracking-tight">
                  $25
                </span>

                <span className="pb-1 text-sm text-slate-500 dark:text-slate-400">
                  / month
                </span>
              </div>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Your subscription is currently active.
              </p>

              {/* Manage Billing */}
              <div className="group/button relative mt-7 inline-flex w-full">
                <div className="absolute -inset-1 rounded-sm bg-linear-to-r from-cyan-500/20 via-blue-500/20 to-purple-600/20 opacity-0 blur-lg transition-opacity duration-300 group-hover/button:opacity-100" />

                <button
                  type="button"
                  onClick={handleManageBilling}
                  disabled={isPending}
                  className="
                    relative inline-flex w-full items-center justify-center gap-2
                    rounded-sm
                    bg-linear-to-r from-cyan-500 via-blue-600 to-purple-600
                    px-5 py-3.5
                    text-sm font-semibold text-white
                    shadow-sm shadow-blue-500/20
                    transition-all duration-300
                    hover:-translate-y-0.5
                    hover:shadow-md hover:shadow-blue-500/25
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >
                  {isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Opening Billing Portal...
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-4 w-4" />
                      Manage Billing
                      <ArrowRight className="h-4 w-4 transition-transform group-hover/button:translate-x-1" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="rounded-sm border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#0b1020] sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-sm bg-linear-to-br from-purple-500/10 to-blue-500/10 ring-1 ring-purple-500/20">
                <CreditCard className="h-5 w-5 text-purple-500" />
              </div>

              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Payment method
                </p>

                <h2 className="text-xl font-bold">Card</h2>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between rounded-sm border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-14 items-center justify-center rounded-sm bg-white text-xs font-bold shadow-sm dark:bg-white/10">
                  VISA
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    •••• •••• •••• 4242
                  </p>

                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Expires 12/28
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-5 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              Your payment information is securely handled by Stripe.
            </p>
          </div>
        </div>

        {/* Billing Overview */}
        <div className="mt-6 rounded-sm border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#0b1020]">
          <div className="border-b border-slate-200 p-6 dark:border-white/10">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-cyan-500/10">
                <CalendarDays className="h-5 w-5 text-cyan-500" />
              </div>

              <div>
                <h2 className="font-bold">Billing Overview</h2>

                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Your current billing information
                </p>
              </div>
            </div>
          </div>

          <div className="grid divide-y divide-slate-200 dark:divide-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {/* Current Period */}
            <div className="p-6">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Current period
              </p>

              <p className="mt-2 font-semibold">
                Sep 01 – Sep 30, 2026
              </p>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                $25.00
              </p>
            </div>

            {/* Next Payment */}
            <div className="p-6">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Next payment
              </p>

              <p className="mt-2 font-semibold">Oct 01, 2026</p>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                $25.00
              </p>
            </div>

            {/* Billing Cycle */}
            <div className="p-6">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Billing cycle
              </p>

              <p className="mt-2 font-semibold">Monthly</p>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Automatically renews
              </p>
            </div>
          </div>
        </div>

        {/* Invoice History */}
        <div className="mt-6 rounded-sm border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#0b1020]">
          <div className="flex flex-col gap-4 border-b border-slate-200 p-6 sm:flex-row sm:items-center sm:justify-between dark:border-white/10">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-blue-500/10">
                <FileText className="h-5 w-5 text-blue-500" />
              </div>

              <div>
                <h2 className="font-bold">Invoice History</h2>

                <p className="text-sm text-slate-500 dark:text-slate-400">
                  View and download your previous invoices
                </p>
              </div>
            </div>

            <span className="text-xs text-slate-500 dark:text-slate-400">
              {invoices.length} invoices
            </span>
          </div>

          {/* Desktop Table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left dark:border-white/10">
                  <th className="px-6 py-4 font-semibold">Invoice</th>
                  <th className="px-6 py-4 font-semibold">Date</th>
                  <th className="px-6 py-4 font-semibold">Amount</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 text-right font-semibold">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {invoices.map((invoice) => (
                  <tr
                    key={invoice.id}
                    className="border-b border-slate-100 last:border-0 dark:border-white/5"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-slate-100 dark:bg-white/5">
                          <FileText className="h-4 w-4 text-slate-500" />
                        </div>

                        <span className="font-medium">
                          {invoice.number}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-5 text-slate-600 dark:text-slate-400">
                      {invoice.date}
                    </td>

                    <td className="px-6 py-5 font-semibold">
                      ${invoice.amount.toFixed(2)}
                    </td>

                    <td className="px-6 py-5">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        {invoice.status}
                      </span>
                    </td>

                    <td className="px-6 py-5 text-right">
                      <button
                        type="button"
                        className="inline-flex cursor-pointer items-center gap-2 rounded-sm px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-blue-600 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-blue-400"
                      >
                        <Download className="h-4 w-4" />
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Invoice List */}
          <div className="divide-y divide-slate-200 md:hidden dark:divide-white/10">
            {invoices.map((invoice) => (
              <div key={invoice.id} className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold">{invoice.number}</p>

                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      {invoice.date}
                    </p>
                  </div>

                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="h-3 w-3" />
                    {invoice.status}
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="font-bold">
                    ${invoice.amount.toFixed(2)}
                  </span>

                  <button
                    type="button"
                    className="inline-flex cursor-pointer items-center gap-2 rounded-sm px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-blue-600 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-blue-400"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subscription Benefits */}
        <div className="mt-6 rounded-sm border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#0b1020]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-linear-to-br from-cyan-500/10 to-purple-500/10 ring-1 ring-cyan-500/20">
              <Sparkles className="h-5 w-5 text-cyan-500" />
            </div>

            <div>
              <h2 className="font-bold">Enterprise Benefits</h2>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                Features included in your current plan
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Unlimited team members",
              "Unlimited projects",
              "Advanced analytics",
              "Priority support",
            ].map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-2 rounded-sm border border-slate-200 p-3 text-sm dark:border-white/10"
              >
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />

                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Trust */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            Secure payments
          </div>

          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            Cancel anytime
          </div>

          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-cyan-500" />
            Powered by Stripe
          </div>
        </div>
      </div>
    </section>
  );
}