import ServiceIcon from './ServiceIcon.jsx'

export default function ServiceCard({ title, description, icon, learnMoreLabel }) {
  return (
    <article className="group rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800/50">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-light text-brand">
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <ServiceIcon name={icon} />
        </svg>
      </div>
      <h3 className="mt-4 text-xl font-semibold group-hover:text-brand">{title}</h3>
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{description}</p>
      <a href="#contact" className="mt-4 inline-flex items-center text-sm font-medium text-brand group-hover:underline">
        {learnMoreLabel} →
      </a>
    </article>
  )
}
