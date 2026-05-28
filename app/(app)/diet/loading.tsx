const Bone = ({ className, style }: { className: string; style?: React.CSSProperties }) => (
  <div className={`animate-pulse rounded bg-border-subtle ${className}`} style={style} />
)

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const SLOTS = ['Meal 1', 'Meal 2', 'Snack']
// rough calorie bar widths per day to make it look lived-in
const calPcts = [78, 55, 90, 42, 67, 30, 85]
const proPcts = [65, 48, 80, 35, 72, 25, 70]

export default function Loading() {
  return (
    <div>
      {/* Tab toggle */}
      <div className="mb-4 flex gap-1 rounded-lg bg-bg-secondary p-1">
        <div className="flex-1 rounded-md border border-border-subtle bg-bg-primary py-1.5 text-center text-xs font-medium text-text-secondary">
          Planner
        </div>
        <div className="flex-1 rounded-md py-1.5 text-center text-xs font-medium text-text-secondary">
          Prep &amp; Shop
        </div>
      </div>

      {/* Week navigation */}
      <div className="mb-4 flex items-center gap-2">
        <div className="rounded-lg border border-border-subtle px-2.5 py-1.5 text-sm text-text-secondary">‹</div>
        <Bone className="h-4 flex-1 rounded" />
        <div className="rounded-lg border border-border-subtle px-2.5 py-1.5 text-sm text-text-secondary">›</div>
        <div className="rounded-lg border border-border-subtle px-2.5 py-1.5 text-sm text-text-secondary">⚙</div>
      </div>

      {/* Day cards */}
      <div className="flex flex-col gap-3">
        {DAYS.map((day, i) => (
          <div key={day} className="rounded-xl border border-border-faint bg-bg-primary px-4 py-3">
            {/* Day label row */}
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-text-secondary">{day}</span>
              <Bone className="h-3 w-24 rounded" />
            </div>

            {/* Progress bars */}
            <div className="mb-3 flex flex-col gap-1.5">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-border-faint">
                <div
                  className="h-full animate-pulse rounded-full bg-border-subtle"
                  style={{ width: `${calPcts[i]}%` }}
                />
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-border-faint">
                <div
                  className="h-full animate-pulse rounded-full bg-border-subtle"
                  style={{ width: `${proPcts[i]}%` }}
                />
              </div>
            </div>

            {/* Meal slots */}
            <div className="flex flex-col gap-2">
              {SLOTS.map(slot => (
                <div key={slot} className="flex items-center gap-2 rounded-lg border border-border-faint px-3 py-2">
                  <span className="text-xs text-text-secondary">{slot}</span>
                  <Bone className="h-3 flex-1 rounded" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
