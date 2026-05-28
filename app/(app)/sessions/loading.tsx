const P = ({ className }: { className: string }) => (
  <div className={`animate-pulse rounded bg-bg-secondary ${className}`} />
)

export default function Loading() {
  return (
    <div>
      {/* Log session button placeholder */}
      <P className="mb-5 h-9 w-32 rounded-lg" />

      {/* Session cards */}
      <div className="flex flex-col gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-border-faint bg-bg-primary px-4 py-3">
            <div className="mb-2 flex items-center gap-3">
              <P className="h-5 w-20 rounded-full" />
              <P className="h-4 w-24 rounded" />
            </div>
            <P className="h-3.5 w-3/4 rounded" />
          </div>
        ))}
      </div>
    </div>
  )
}
