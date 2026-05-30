export default function TechStack({ t }) {
  return (
    <section id="tech" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold text-slate-900 dark:text-white">{t.tech.title}</h2>
        <p className="mt-3 text-center text-slate-600 dark:text-slate-400">
          {t.tech.description}
        </p>
        <ul className="mt-10 flex flex-wrap justify-center gap-3 sm:gap-4">
          {t.tech.list.map((name) => (
            <li
              key={name}
              className="rounded-lg bg-white px-4 py-2 text-sm font-medium shadow ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
