export default function SectionHeading({ eyebrow, title, subtitle, center = true, light = false }) {
  return (
    <div className={`${center ? 'mx-auto text-center' : ''} max-w-2xl`} data-testid={`section-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>
      {eyebrow && (
        <p className={`text-xs font-bold uppercase tracking-[0.2em] ${light ? 'text-brand-300' : 'text-brand-600'}`}>{eyebrow}</p>
      )}
      <h2 className={`mt-2 font-display text-3xl font-bold sm:text-4xl ${light ? 'text-white' : 'text-navy-900'}`}>{title}</h2>
      {subtitle && <p className={`mt-3 text-base md:text-lg ${light ? 'text-slate-300' : 'text-slate-500'}`}>{subtitle}</p>}
    </div>
  )
}
