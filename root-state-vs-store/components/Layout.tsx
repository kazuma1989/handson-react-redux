import React from 'react'

type Props = {
  header: React.ReactNode
  footer: React.ReactNode
  children?: React.ReactNode
}

export function Layout({ header, footer, children }: Props) {
  return (
    <div>
      {header}

      <section className="section">
        <div className="container">{children}</div>
      </section>

      {footer}
    </div>
  )
}
