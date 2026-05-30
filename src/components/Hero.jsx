export default function Hero({ t }) {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-gradient-to-br from-brand-light via-white to-slate-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900"
    >
      <div className="mx-auto flex min-h-[70vh] max-w-7xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:min-h-screen lg:px-8">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand">{t.hero.badge}</p>
        <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl md:text-6xl dark:text-white">
          {t.hero.titleLine1}
          <br className="hidden sm:block" />
          {' '}
          {t.hero.titleLine2}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">
          {t.hero.description}
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <a href="#services" className="btn-brand">
            {t.hero.exploreServices}
          </a>
          <a
            href="#contact"
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 font-medium text-slate-700 transition hover:bg-slate-50 focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:outline-none dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            {t.hero.contactUs}
          </a>
        </div>
      </div>
    </section>
  )
}
