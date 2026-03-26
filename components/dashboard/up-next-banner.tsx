import { Button } from "@/components/ui/button"

export function UpNextBanner() {
  return (
    <div className="relative flex flex-col items-start justify-between gap-4 overflow-hidden rounded-xl bg-primary p-6 text-white shadow-sm sm:flex-row sm:items-center">
      <div className="pointer-events-none absolute top-0 right-0 -mt-20 -mr-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
      <div className="relative z-10">
        <span className="mb-3 inline-block rounded bg-white/20 px-2.5 py-1 text-xs font-semibold tracking-wide text-white uppercase">
          Up Next
        </span>
        <h2 className="mb-1 text-xl font-semibold">Typography Systems</h2>
        <p className="text-primary-100 text-sm text-white/80">
          Advanced UI Design • Module 4
        </p>
      </div>
      <Button variant="secondary" className="relative z-10 bg-white text-primary hover:bg-slate-50">
        Continue Module
      </Button>
    </div>
  )
}
