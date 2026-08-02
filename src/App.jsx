import { useEffect, useState } from 'react'
import SkipLink from './components/SkipLink.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Services from './components/Services.jsx'
import TechStack from './components/TechStack.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

const translations = {
  en: {
    langCode: 'en',
    languageLabel: 'Language',
    darkMode: 'Dark mode',
    getInTouch: 'Get in touch',
    clientPortals: 'Client Portals',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    skipToMain: 'Skip to main content',
    navLinks: [
      { href: '#about', label: 'About' },
      { href: '#services', label: 'Services' },
      { href: '#tech', label: 'Tech Stack' },
      { href: '#contact', label: 'Contact' },
    ],
    hero: {
      badge: 'Thinkpipe AI',
      titleLine1: 'Connect your business future',
      titleLine2: 'with AI and scalable backends',
      description:
        'Intelligent data pipelines, custom enterprise APIs, and AI-driven automation—a reliable foundation for high-growth teams.',
      exploreServices: 'Explore services',
      contactUs: 'Contact us',
    },
    about: {
      title: 'About Thinkpipe',
      description:
        'Our mission is to bridge artificial intelligence and backend scalability, helping enterprises adopt intelligent workflows with lower cost and higher reliability.',
    },
    services: {
      title: 'Core services',
      description: 'End-to-end solutions for data, APIs, and intelligent automation.',
      learnMore: 'Learn more',
      list: [
        {
          title: 'Intelligent data pipelines',
          description:
            'End-to-end ingestion, cleansing, and orchestration so your analytics team focuses on insights—not glue code.',
          icon: 'database',
        },
        {
          title: 'Custom enterprise APIs',
          description:
            'Secure, observable REST and GraphQL designs that integrate with your systems and third-party services.',
          icon: 'code',
        },
        {
          title: 'AI-driven automation',
          description:
            'Combine LLMs with workflow engines to automate approvals, support, and repetitive operations tasks.',
          icon: 'bolt',
        },
      ],
    },
    tech: {
      title: 'Technology stack',
      description: 'Tools we use to build reliable, scalable products.',
      list: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Python', 'OpenAI API', 'AWS'],
    },
    contact: {
      title: 'Contact us',
      description: 'Tell us about your project—we will get back to you shortly.',
      thanks: 'Thank you! Your inquiry has been received (demo only—no backend yet).',
      name: 'Name',
      namePlaceholder: 'Your name',
      email: 'Email',
      service: 'Service of interest',
      message: 'Message',
      messagePlaceholder: 'Briefly describe your needs…',
      submit: 'Send inquiry',
    },
    footer: {
      about: 'Corporate website built with React, Vite, and Tailwind CSS.',
      linksTitle: 'Links',
      contactTitle: 'Contact',
      rights: 'All rights reserved.',
    },
  },
  zh: {
    langCode: 'zh',
    languageLabel: '语言',
    darkMode: '深色模式',
    getInTouch: '联系我们',
    clientPortals: '客户门户',
    openMenu: '打开菜单',
    closeMenu: '关闭菜单',
    skipToMain: '跳到主要内容',
    navLinks: [
      { href: '#about', label: '关于' },
      { href: '#services', label: '服务' },
      { href: '#tech', label: '技术栈' },
      { href: '#contact', label: '联系' },
    ],
    hero: {
      badge: 'Thinkpipe AI',
      titleLine1: '用 AI 与可扩展后端',
      titleLine2: '连接你的业务未来',
      description: '智能数据管道、企业 API 定制与 AI 自动化，为高增长团队打造可靠技术底座。',
      exploreServices: '查看服务',
      contactUs: '联系我们',
    },
    about: {
      title: '关于 Thinkpipe',
      description: '我们的使命是连接人工智能与后端可扩展性，帮助企业以更低成本、更高可靠性落地智能工作流。',
    },
    services: {
      title: '核心服务',
      description: '覆盖数据、API 与智能自动化的一站式解决方案。',
      learnMore: '了解更多',
      list: [
        {
          title: '智能数据管道',
          description: '提供端到端采集、清洗和编排，让分析团队专注洞察而非胶水代码。',
          icon: 'database',
        },
        {
          title: '企业 API 定制',
          description: '构建安全且可观测的 REST/GraphQL 接口，打通内部系统和第三方服务。',
          icon: 'code',
        },
        {
          title: 'AI 驱动自动化',
          description: '结合大模型与工作流引擎，自动化审批、客服和重复性运营任务。',
          icon: 'bolt',
        },
      ],
    },
    tech: {
      title: '技术栈',
      description: '我们用于构建可靠、可扩展产品的核心工具。',
      list: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Python', 'OpenAI API', 'AWS'],
    },
    contact: {
      title: '联系我们',
      description: '告诉我们你的项目需求，我们会尽快回复。',
      thanks: '感谢提交！我们已收到你的咨询（演示版，暂未接后端）。',
      name: '姓名',
      namePlaceholder: '请输入姓名',
      email: '邮箱',
      service: '感兴趣的服务',
      message: '留言',
      messagePlaceholder: '请简要描述你的需求…',
      submit: '提交咨询',
    },
    footer: {
      about: '基于 React、Vite 与 Tailwind CSS 构建的企业官网。',
      linksTitle: '链接',
      contactTitle: '联系',
      rights: '保留所有权利。',
    },
  },
}

export default function App() {
  const [language, setLanguage] = useState('en')
  const t = translations[language]

  useEffect(() => {
    document.documentElement.lang = t.langCode
  }, [t.langCode])

  return (
    <div className="bg-slate-50 text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100">
      <SkipLink text={t.skipToMain} />
      <Header language={language} onLanguageChange={setLanguage} t={t} />
      <Hero t={t} />
      <About t={t} />
      <Services t={t} />
      <TechStack t={t} />
      <Contact t={t} />
      <Footer t={t} />
    </div>
  )
}
