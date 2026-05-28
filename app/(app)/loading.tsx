export default function Loading() {
  return (
    <div className="flex flex-col gap-3">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="h-16 animate-pulse rounded-xl bg-bg-secondary" />
      ))}
    </div>
  )
}
