import { useState } from 'react'

const inputClassName =
  'mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500'

export default function Contact({ t }) {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contact" className="bg-brand-light/50 py-16 md:py-24 dark:bg-slate-900/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl">
          <h2 className="text-center text-3xl font-bold text-slate-900 dark:text-white">{t.contact.title}</h2>
          <p className="mt-3 text-center text-slate-600 dark:text-slate-400">
            {t.contact.description}
          </p>

          {submitted ? (
            <p className="mt-10 rounded-2xl bg-white p-6 text-center text-slate-700 shadow-lg ring-1 ring-slate-900/5 dark:bg-slate-900 dark:text-slate-300 dark:ring-slate-700">
              {t.contact.thanks}
            </p>
          ) : (
            <form
              className="mt-10 space-y-6 rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 sm:p-8 dark:bg-slate-900 dark:ring-slate-700"
              onSubmit={handleSubmit}
            >
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  {t.contact.name}
                </label>
                <input id="name" name="name" type="text" required placeholder={t.contact.namePlaceholder} className={inputClassName} />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  {t.contact.email}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@company.com"
                  className={inputClassName}
                />
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  {t.contact.service}
                </label>
                <select id="service" name="service" defaultValue={t.services.list[0].title} className={inputClassName}>
                  {t.services.list.map((option) => (
                    <option key={option.title} value={option.title}>
                      {option.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  {t.contact.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder={t.contact.messagePlaceholder}
                  className={`${inputClassName} resize-y`}
                />
              </div>

              <div>
                <button type="submit" className="btn-brand w-full sm:w-auto">
                  {t.contact.submit}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
