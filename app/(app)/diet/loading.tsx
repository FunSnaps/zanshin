const P = ({ className }: { className: string }) => (
  <div className={`animate-pulse rounded bg-bg-secondary ${className}`} />
)

export default function Loading() {
  return (
    <div>
      {/* Tab toggle */}
      <div className="mb-4 flex gap-1 rounded-lg bg-bg-secondary p-1">
        <P className="h-7 flex-1 rounded-md" />
        <P className="h-7 flex-1 rounded-md" />
      </div>

      {/* Week navigation */}
      <div className="mb-4 flex items-center gap-2">
        <P className="h-8 w-9 rounded-lg" />
        <P className="h-4 flex-1 rounded" />
        <P className="h-8 w-9 rounded-lg" />
        <P className="h-8 w-9 rounded-lg" />
      </div>

      {/* Day cards */}
      <div className="flex flex-col gap-3">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-border-faint bg-bg-primary px-4 py-3">
            {/* Day label + progress bars */}
            <div className="mb-3 flex items-center justify-between">
              <P className="h-4 w-24 rounded" />
              <P className="h-3 w-20 rounded" />
            </div>
            <div className="mb-3 flex flex-col gap-1.5">
              <P className="h-1.5 w-full rounded-full" />
              <P className="h-1.5 w-full rounded-full" />
            </div>
            {/* Meal slots */}
            <div className="flex flex-col gap-2">
              {[1, 2, 3].map(j => (
                <P key={j} className="h-10 rounded-lg" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
