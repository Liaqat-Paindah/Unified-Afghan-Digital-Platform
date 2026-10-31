import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Star,
  Users,
  Globe2,
} from "lucide-react";

const values = [
  {
    icon: Users,
    title: "Afghanistan-first",
    description:
      "A central way to discover opportunities and information relevant to people and communities across Afghanistan.",
  },
  {
    icon: ShieldCheck,
    title: "One search, many sources",
    description:
      "Bring approved public information from separate systems into a consistent, searchable experience.",
  },
  {
    icon: MessageCircle,
    title: "Clear source attribution",
    description:
      "Show where each result came from and link people back to the original source whenever possible.",
  },
  {
    icon: Star,
    title: "Responsible access",
    description:
      "Respect each provider's terms, privacy requirements and approved data access methods.",
  },
];

const steps = [
  {
    title: "Connect approved sources",
    description:
      "Set up authorized APIs or data feeds for each participating external system.",
  },
  {
    title: "Organize information",
    description:
      "Normalize key fields so different kinds of records can be searched together.",
  },
  {
    title: "Search centrally",
    description:
      "Find relevant jobs, services, products and opportunities from one interface.",
  },
  {
    title: "Return to the source",
    description:
      "Display source attribution and direct users to the original listing or information.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-white text-slate-900 dark:bg-[#050816] dark:text-white">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-125 w-125 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />
          <div className="absolute -right-40 top-1/3 h-80 w-80 rounded-full bg-purple-500/10 blur-[110px]" />
        </div>

        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-sm bg-linear-to-br from-cyan-500 to-blue-600 shadow-lg shadow-blue-500/20">
            <Globe2 className="h-7 w-7 text-white" />
          </div>

          <h1 className="mt-7 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            One platform for
            <span className="bg-linear-to-r from-cyan-500 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              {" "}
              Afghanistan.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-400 sm:text-lg">
            The Unified Afghan Digital Platform brings discovery into one
            place, helping people search across participating systems without
            having to visit each one separately.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="border-y border-slate-200 bg-slate-50/70 px-4 py-20 dark:border-white/5 dark:bg-white/2 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold text-cyan-500">Our mission</p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Information is everywhere.
              <br />
              Finding it should be easier.
            </h2>

            <p className="mt-6 text-sm leading-7 text-slate-600 dark:text-slate-400">
              Jobs, public-interest opportunities, products and services are
              spread across many websites and systems. It can be difficult to
              know where to look or compare relevant information.
            </p>

            <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
              Our goal is to make participating sources easier to search in a
              single, clear interface while preserving attribution to the
              original providers.
            </p>

            <Link
              href="/#results"
              className="mt-7 inline-flex items-center gap-2 rounded-sm bg-linear-to-r from-cyan-500 to-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              Explore search
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <div
                  key={value.title}
                  className="rounded-sm border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-[#0b1020]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-cyan-500/10">
                    <Icon className="h-5 w-5 text-cyan-500" />
                  </div>

                  <h3 className="mt-5 font-bold">{value.title}</h3>

                  <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold text-cyan-500">
              How it works
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              How central search can work
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="flex gap-5 rounded-sm border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-[#0b1020]"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-linear-to-br from-cyan-500 to-blue-600 text-sm font-bold text-white">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div>
                  <h3 className="font-bold">{step.title}</h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Afghanistan focus */}
      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-sm bg-linear-to-br from-cyan-500 via-blue-600 to-purple-600 p-8 text-white sm:p-12">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold text-blue-50">
                <MapPin className="h-4 w-4" />
                Built for local communities
              </div>

              <h2 className="mt-3 text-3xl font-bold">
                Discover more in one search.
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-blue-50">
                The preview shows the intended experience. Live results will
                be available after approved data access is configured for the
                planned source systems.
              </p>
            </div>

            <Link
              href="/#sources"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-sm bg-white px-6 py-3.5 text-sm font-bold text-blue-700 transition hover:bg-slate-50"
            >
              View planned sources
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="border-t border-slate-200 px-4 py-10 dark:border-white/5 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-x-8 gap-y-3 text-xs text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            Participating sources
          </span>

          <span className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            Source attribution
          </span>

          <span className="flex items-center gap-2">
            <Star className="h-4 w-4 text-amber-500" />
            Responsible access
          </span>
        </div>
      </section>
    </main>
  );
}