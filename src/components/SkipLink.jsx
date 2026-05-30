export default function SkipLink({ text }) {
  return (
    <a
      href="#hero"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-brand focus:px-4 focus:py-2 focus:text-white"
    >
      {text}
    </a>
  )
}
