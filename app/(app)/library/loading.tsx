const P = ({ className }: { className: string }) => (
  <div className={`animate-pulse rounded bg-bg-secondary ${className}`} />
)

export default function Loading() {
  return (
    <div>
      {/* Discipline pills */}
      <div className="mb-3 flex gap-2">
        <P className="h-8 w-24 rounded-full" />
        <P className="h-8 w-20 rounded-full" />
      </div>

      {/* Sub-discipline pills */}
      <div className="mb-1 flex gap-2">
        <P className="h-7 w-12 rounded-full" />
        <P className="h-7 w-20 rounded-full" />
        <P className="h-7 w-14 rounded-full" />
      </div>

      {/* Belt / level pills */}
      <div className="mb-5 mt-3 flex gap-2">
        {[14, 12, 16, 14, 12].map((w, i) => (
          <P key={i} className={`h-6 rounded-full`} style={{ width: `${w * 5}px` } as React.CSSProperties} />
        ))}
      </div>

      {/* Technique cards */}
      <div className="flex flex-col gap-2">
        {Array.from({ length: 9 }).map((_, i) => (
          <P key={i} className="h-14 rounded-xl" />
        ))}
      </div>
    </div>
  )
}
