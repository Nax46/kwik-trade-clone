import { Loader2 } from 'lucide-react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Button } from '../ui/Button'

type SubmitButtonProps = {
  isLoading?: boolean
  loadingText?: string
  children: ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>

export function SubmitButton({
  isLoading = false,
  loadingText = 'Please wait…',
  children,
  disabled,
  className = '',
  ...props
}: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      className={`w-full ${className}`.trim()}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          {loadingText}
        </>
      ) : (
        children
      )}
    </Button>
  )
}
