import { Link } from 'react-router-dom'
import { Compass } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="container-x flex min-h-[70vh] flex-col items-center justify-center pt-24 text-center" data-testid="not-found-page">
      <p className="font-display text-7xl font-bold text-brand-500/30">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold sm:text-3xl">This page seems to have wandered off</h1>
      <p className="mt-2 max-w-md text-sm text-slate-500">The page you're looking for doesn't exist — but the right professional for your need is just a click away.</p>
      <Link to="/" data-testid="not-found-home-btn" className="btn-primary mt-7"><Compass className="h-4 w-4" /> Back to Home</Link>
    </div>
  )
}
