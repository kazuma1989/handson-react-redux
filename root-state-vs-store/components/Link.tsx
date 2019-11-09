import React from 'react'

type Props = {
  to: string
  className?: string
  children: React.ReactNode
}

export function Link({ to, className, children }: Props) {
  return (
    <a href={to} className={className}>
      {children}
    </a>
  )
}
