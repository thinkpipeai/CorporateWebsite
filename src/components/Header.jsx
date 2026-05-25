const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#tech', label: 'Tech Stack' },
  { href: '#contact', label: 'Contact' },
]

function toggleDarkMode() {
  document.documentElement.classList.toggle('dark')
}

export default function Header() {
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
          {navLinks.map((link) => (
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
            Dark mode
          </button>
          <a href="#contact" className="btn-brand hidden sm:inline-block">
            Get in touch
          </a>
          <button
            type="button"
            className="rounded-md p-2 text-slate-600 md:hidden dark:text-slate-300"
            aria-label="Open menu"
          >
            <span className="sr-only">Open menu</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  )
}
