import { CheckCircle2, Info, AlertCircle } from 'lucide-react'
import { useApp } from '../context/AppContext'

const icons = { success: CheckCircle2, info: Info, error: AlertCircle }
const colors = {
  success: 'border-green-200 bg-white text-green-700',
  info: 'border-brand-200 bg-white text-brand-700',
  error: 'border-red-200 bg-white text-red-600',
}

export default function Toaster() {
  const { toasts } = useApp()
  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-[60] flex w-[calc(100%-2.5rem)] max-w-sm flex-col gap-2" data-testid="toaster">
      {toasts.map((t) => {
        const Icon = icons[t.type] || Info
        return (
          <div key={t.id} data-testid={`toast-${t.type}`} className={`pointer-events-auto flex items-start gap-3 rounded-2xl border px-4 py-3 shadow-lift ${colors[t.type] || colors.info}`}>
            <Icon className="mt-0.5 h-5 w-5 shrink-0" />
            <p className="text-sm font-medium text-navy-900">{t.message}</p>
          </div>
        )
      })}
    </div>
  )
}
