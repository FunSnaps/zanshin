const P = ({ className }: { className: string }) => (
  <div className={`animate-pulse rounded bg-bg-secondary ${className}`} />
)

export default function Loading() {
  return (
    <div>
      {/* Banner */}
      <P className="mb-5 h-14 rounded-xl" />

      {/* 3 stat cards */}
      <div className="mb-6 grid grid-cols-3 gap-2.5">
        {[1, 2, 3].map(i => (
          <div key={i} className="flex flex-col items-center gap-1.5 rounded-xl bg-bg-secondary p-3">
            <P className="h-7 w-8 rounded" />
            <P className="h-3 w-14 rounded" />
          </div>
        ))}
      </div>

      {/* Sessions stat card */}
      <div className="mb-6 flex flex-col items-center gap-1.5 rounded-xl bg-bg-secondary p-3">
        <P className="h-7 w-8 rounded" />
        <P className="h-3 w-24 rounded" />
      </div>

      {/* Grappling section */}
      <P className="mb-2 h-3 w-20 rounded" />
      <div className="mb-6 grid grid-cols-2 gap-2">
        {[1, 2, 3, 4].map(i => (
          <P key={i} className="h-14 rounded-xl" />
        ))}
      </div>

      {/* Striking section */}
      <P className="mb-2 h-3 w-16 rounded" />
      <div className="grid grid-cols-2 gap-2">
        {[1, 2, 3, 4].map(i => (
          <P key={i} className="h-14 rounded-xl" />
        ))}
      </div>
    </div>
  )
}
