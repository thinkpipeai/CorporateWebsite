import ServiceCard from './ServiceCard.jsx'

export default function Services({ t }) {
  return (
    <section id="services" className="bg-white py-16 md:py-24 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold text-slate-900 dark:text-white">{t.services.title}</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600 dark:text-slate-400">
          {t.services.description}
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {t.services.list.map((service) => (
            <ServiceCard key={service.title} {...service} learnMoreLabel={t.services.learnMore} />
          ))}
        </div>
      </div>
    </section>
  )
}
