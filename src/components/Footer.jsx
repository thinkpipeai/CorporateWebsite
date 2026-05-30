export default function Footer({ t }) {
  return (
    <footer className="border-t border-slate-200 bg-white py-12 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="text-lg font-bold text-brand">Thinkpipe AI</p>
            <p className="mt-2 max-w-sm text-sm text-slate-600 dark:text-slate-400">
              {t.footer.about}
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">{t.footer.linksTitle}</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400">
              {t.navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="hover:text-brand">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">{t.footer.contactTitle}</p>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">hello@thinkpipe.ai</p>
          </div>
        </div>
        <p className="mt-10 border-t border-slate-200 pt-6 text-center text-xs text-slate-500 dark:border-slate-800 dark:text-slate-500">
          © 2026 Thinkpipe AI. {t.footer.rights}
        </p>
      </div>
    </footer>
  )
}
