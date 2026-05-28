const Bone = ({ className, style }: { className: string; style?: React.CSSProperties }) => (
  <div className={`animate-pulse rounded bg-border-subtle ${className}`} style={style} />
)

const chipWidths = [80, 96, 88, 72, 80, 92]
const noteWidths = ['60%', '80%', '45%', '70%', '55%', '75%']

export default function Loading() {
  return (
    <div>
      {/* Log session button */}
      <Bone className="mb-5 h-9 w-32 rounded-lg" />

      {/* Session cards */}
      <div className="flex flex-col gap-3">
        {chipWidths.map((chip, i) => (
          <div key={i} className="rounded-xl border border-border-faint bg-bg-primary px-4 py-3">
            <div className="mb-2.5 flex items-center gap-3">
              <Bone className="h-5 rounded-full" style={{ width: chip }} />
              <Bone className="h-3.5 w-24 rounded" />
            </div>
            <Bone className="h-3 rounded" style={{ width: noteWidths[i] }} />
          </div>
        ))}
      </div>
    </div>
  )
}
