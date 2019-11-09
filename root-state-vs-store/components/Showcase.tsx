import React from 'react'
import { ErrorBoundary } from './ErrorBoundary'

export function Showcase({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      {React.Children.map(children, child => (
        <div style={{ border: 'solid 1px black', borderWidth: '0 1px 1px 0' }}>
          <ErrorBoundary>{child}</ErrorBoundary>
        </div>
      ))}
    </div>
  )
}
