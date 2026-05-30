import { useState } from 'react'

function toggleDarkMode() {
  document.documentElement.classList.toggle('dark')
}

export default function Header({ language, onLanguageChange, t }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  function toggleMobileMenu() {
    setIsMobileMenuOpen((prev) => !prev)
  }

  function closeMobileMenu() {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <a href="#" className="text-lg font-bold tracking-tight text-brand">
          Thinkpipe AI
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {t.navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-slate-600 transition hover:text-brand dark:text-slate-300"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleDarkMode}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            {t.darkMode}
          </button>
          <label htmlFor="language" className="sr-only">
            {t.languageLabel}
          </label>
          <select
            id="language"
            value={language}
            onChange={(event) => onLanguageChange(event.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-sm text-slate-700 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200"
          >
            <option value="en">English</option>
            <option value="zh">中文</option>
          </select>
          <a href="#contact" className="btn-brand hidden sm:inline-block">
            {t.getInTouch}
          </a>
          <button
            type="button"
            onClick={toggleMobileMenu}
            className="rounded-md p-2 text-slate-600 md:hidden dark:text-slate-300"
            aria-label={isMobileMenuOpen ? t.closeMenu : t.openMenu}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav-menu"
          >
            <span className="sr-only">{isMobileMenuOpen ? t.closeMenu : t.openMenu}</span>
            {isMobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div id="mobile-nav-menu" className="border-t border-slate-200 px-4 py-3 md:hidden dark:border-slate-800">
          <ul className="space-y-3">
            {t.navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="block text-sm font-medium text-slate-700 transition hover:text-brand dark:text-slate-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#contact" onClick={closeMobileMenu} className="btn-brand inline-block">
                {t.getInTouch}
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
