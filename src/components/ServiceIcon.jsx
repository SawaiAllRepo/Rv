import * as icons from 'lucide-react'

export default function ServiceIcon({ name, className = 'h-5 w-5' }) {
  const Icon = icons[name] || icons.Wrench
  return <Icon className={className} />
}
