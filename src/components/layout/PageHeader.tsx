type PageHeaderProps = {
  label?: string
  title: string
  description?: string
}

export function PageHeader({ label, title, description }: PageHeaderProps) {
  return (
    <div className="relative overflow-hidden border-b border-border bg-surface-raised/50 py-12 sm:py-16">
      <div className="pointer-events-none absolute inset-0 bg-hero-radial opacity-60" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-grid-fade bg-grid opacity-30" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {label && (
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">{label}</p>
        )}
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h1>
        {description && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{description}</p>
        )}
      </div>
    </div>
  )
}
