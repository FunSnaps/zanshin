const Bone = ({ className, style }: { className: string; style?: React.CSSProperties }) => (
  <div className={`animate-pulse rounded bg-border-subtle ${className}`} style={style} />
)

const techNames = [
  ['70%', '55%', '80%', '60%'],
  ['65%', '75%', '50%', '70%'],
]

export default function Loading() {
  return (
    <div>
      {/* Banner */}
      <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3.5">
        <Bone className="h-3.5 w-4/5 rounded" />
      </div>

      {/* 3 stat cards */}
      <div className="mb-6 grid grid-cols-3 gap-2.5">
        {['Total logged', 'Grappling', 'Striking'].map(label => (
          <div key={label} className="rounded-xl bg-bg-secondary p-3 text-center">
            <Bone className="mx-auto mb-1.5 h-7 w-8 rounded" />
            <Bone className="mx-auto h-2.5 w-14 rounded" />
          </div>
        ))}
      </div>

      {/* Sessions stat card */}
      <div className="mb-6 rounded-xl bg-bg-secondary p-3 text-center">
        <Bone className="mx-auto mb-1.5 h-7 w-8 rounded" />
        <Bone className="mx-auto h-2.5 w-28 rounded" />
      </div>

      {/* Grappling section */}
      <Bone className="mb-2 h-2.5 w-20 rounded" />
      <div className="mb-6 grid grid-cols-2 gap-2">
        {techNames[0].map((w, i) => (
          <div key={i} className="rounded-xl border border-border-faint bg-bg-primary px-3 py-3">
            <Bone className="mb-1.5 h-3 rounded" style={{ width: w }} />
            <Bone className="h-2.5 w-1/2 rounded" />
          </div>
        ))}
      </div>

      {/* Striking section */}
      <Bone className="mb-2 h-2.5 w-16 rounded" />
      <div className="grid grid-cols-2 gap-2">
        {techNames[1].map((w, i) => (
          <div key={i} className="rounded-xl border border-border-faint bg-bg-primary px-3 py-3">
            <Bone className="mb-1.5 h-3 rounded" style={{ width: w }} />
            <Bone className="h-2.5 w-1/2 rounded" />
          </div>
        ))}
      </div>
    </div>
  )
}
