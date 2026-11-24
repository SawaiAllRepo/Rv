import { Star } from 'lucide-react'

export default function RatingStars({ rating, size = 'h-4 w-4', showValue = true }) {
  return (
    <span className="inline-flex items-center gap-1" data-testid="rating-stars">
      <span className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={`${size} ${i <= Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'}`}
          />
        ))}
      </span>
      {showValue && <span className="text-sm font-semibold text-navy-900">{rating}</span>}
    </span>
  )
}
