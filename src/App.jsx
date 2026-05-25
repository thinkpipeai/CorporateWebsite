import SkipLink from './components/SkipLink.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Services from './components/Services.jsx'
import TechStack from './components/TechStack.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <div className="bg-slate-50 text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100">
      <SkipLink />
      <Header />
      <Hero />
      <About />
      <Services />
      <TechStack />
      <Contact />
      <Footer />
    </div>
  )
}
