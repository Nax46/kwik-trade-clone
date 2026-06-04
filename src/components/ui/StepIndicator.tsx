import { Check } from 'lucide-react'

export type StepItem = {
  id: number
  label: string
}

type StepIndicatorProps = {
  steps: StepItem[]
  currentStep: number
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <nav aria-label="Booking progress" className="mb-8">
      <ol className="flex flex-wrap gap-2 sm:gap-0 sm:justify-between">
        {steps.map((step) => {
          const isComplete = currentStep > step.id
          const isCurrent = currentStep === step.id

          return (
            <li
              key={step.id}
              className="flex min-w-0 flex-1 items-center gap-2 sm:flex-col sm:gap-1 sm:text-center"
              aria-current={isCurrent ? 'step' : undefined}
            >
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition sm:h-9 sm:w-9 ${
                  isComplete
                    ? 'bg-brand-600 text-white'
                    : isCurrent
                      ? 'bg-brand-600 text-white ring-4 ring-brand-100'
                      : 'border-2 border-slate-200 bg-white text-slate-400'
                }`}
              >
                {isComplete ? <Check className="h-4 w-4" aria-hidden /> : step.id}
              </span>
              <span
                className={`hidden truncate text-xs font-medium sm:block sm:max-w-[5.5rem] ${
                  isCurrent ? 'text-brand-700' : isComplete ? 'text-slate-700' : 'text-slate-400'
                }`}
              >
                {step.label}
              </span>
              <span
                className={`truncate text-xs font-medium sm:hidden ${
                  isCurrent ? 'text-brand-700' : 'text-slate-500'
                }`}
              >
                {isCurrent ? step.label : null}
              </span>
            </li>
          )
        })}
      </ol>
      <p className="mt-3 text-center text-sm font-medium text-slate-600 sm:hidden">
        Step {currentStep} of {steps.length}: {steps.find((s) => s.id === currentStep)?.label}
      </p>
    </nav>
  )
}
