import { useCountUp } from '../hooks/useCountUp'

export default function StatCounter({ value, suffix = '', label }) {
  const { ref, value: v } = useCountUp(value)
  return (
    <div ref={ref} className="text-center" data-testid={`stat-${label.toLowerCase().replace(/\s+/g, '-')}`}>
      <p className="font-display text-4xl font-bold text-white sm:text-5xl">
        {v.toLocaleString('en-IN')}
        <span className="text-brand-400">{suffix}</span>
      </p>
      <p className="mt-2 text-sm font-medium text-slate-300">{label}</p>
    </div>
  )
}
