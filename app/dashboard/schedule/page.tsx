export default function Page() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="mx-auto w-full max-w-7xl flex-1 p-6 lg:p-10">
            <div className="mb-10">
              <h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl dark:text-white">
                Schedule
              </h1>
              <p className="text-base text-slate-500 dark:text-slate-400">
                Here is your schedule for the week.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
