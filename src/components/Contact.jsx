import { useState } from 'react'
import { serviceOptions } from '../data/services.js'

const inputClassName =
  'mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contact" className="bg-brand-light/50 py-16 md:py-24 dark:bg-slate-900/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl">
          <h2 className="text-center text-3xl font-bold text-slate-900 dark:text-white">Contact us</h2>
          <p className="mt-3 text-center text-slate-600 dark:text-slate-400">
            Tell us about your project—we will get back to you shortly.
          </p>

          {submitted ? (
            <p className="mt-10 rounded-2xl bg-white p-6 text-center text-slate-700 shadow-lg ring-1 ring-slate-900/5 dark:bg-slate-900 dark:text-slate-300 dark:ring-slate-700">
              Thank you! Your inquiry has been received (demo only—no backend yet).
            </p>
          ) : (
            <form
              className="mt-10 space-y-6 rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-900/5 sm:p-8 dark:bg-slate-900 dark:ring-slate-700"
              onSubmit={handleSubmit}
            >
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Name
                </label>
                <input id="name" name="name" type="text" required placeholder="Your name" className={inputClassName} />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Email
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
                  Service of interest
                </label>
                <select id="service" name="service" defaultValue={serviceOptions[0]} className={inputClassName}>
                  {serviceOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Briefly describe your needs…"
                  className={`${inputClassName} resize-y`}
                />
              </div>

              <div>
                <button type="submit" className="btn-brand w-full sm:w-auto">
                  Send inquiry
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
