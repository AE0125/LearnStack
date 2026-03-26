type WelcomeHeaderProps = {
  userName: string | null | undefined
}

export function WelcomeHeader({ userName }: WelcomeHeaderProps) {
  return (
    <div className="mb-10">
      <h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl dark:text-white">
        Good morning, {userName}
      </h1>
      <p className="text-base text-slate-500 dark:text-slate-400">
        {new Date().toLocaleDateString("de-DE", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
    </div>
  )
}
