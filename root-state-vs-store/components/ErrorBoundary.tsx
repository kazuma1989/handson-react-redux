import React from 'react'

export class ErrorBoundary extends React.Component<{}, { err: any }> {
  static getDerivedStateFromError(err) {
    return { err }
  }

  constructor(props) {
    super(props)
    this.state = { err: null }
  }

  render() {
    const { err } = this.state
    if (err) {
      return (
        <div className="message is-danger">
          <div className="message-body">{err.toString && err.toString()}</div>
        </div>
      )
    }

    return this.props.children || null
  }
}
