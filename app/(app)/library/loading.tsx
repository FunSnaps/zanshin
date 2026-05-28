const Bone = ({ className, style }: { className: string; style?: React.CSSProperties }) => (
  <div className={`animate-pulse rounded bg-border-subtle ${className}`} style={style} />
)

export default function Loading() {
  return (
    <div>
      {/* Discipline toggle */}
      <div className="mb-3 flex gap-2">
        <Bone className="h-8 w-28 rounded-full" />
        <Bone className="h-8 w-24 rounded-full" />
      </div>

      {/* Sub-discipline pills */}
      <div className="mb-3 flex gap-2">
        <Bone className="h-7 w-12 rounded-full" />
        <Bone className="h-7 w-24 rounded-full" />
        <Bone className="h-7 w-16 rounded-full" />
      </div>

      {/* Belt / level pills */}
      <div className="mb-5 flex gap-2">
        <Bone className="h-6 w-16 rounded-full" />
        <Bone className="h-6 w-14 rounded-full" />
        <Bone className="h-6 w-20 rounded-full" />
        <Bone className="h-6 w-16 rounded-full" />
        <Bone className="h-6 w-14 rounded-full" />
      </div>

      {/* Technique cards */}
      <div className="flex flex-col gap-2">
        {[75, 55, 85, 60, 70, 50, 80, 65, 55].map((w, i) => (
          <div key={i} className="flex items-center gap-3 rounded-xl border border-border-faint bg-bg-primary px-4 py-3">
            <Bone className="h-4 rounded" style={{ width: `${w}%` } as React.CSSProperties} />
          </div>
        ))}
      </div>
    </div>
  )
}
