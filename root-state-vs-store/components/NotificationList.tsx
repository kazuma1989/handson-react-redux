import React from 'react'
import { TNotification } from '../types/TNotification'
import { Link } from './Link'

type Props = {
  value: TNotification[]
}

export function NotificationList({ value }: Props) {
  return (
    <div className="content">
      <ul>
        {value.map(({ id, read, title }) => (
          <li key={id}>
            <Link to={id}>{read ? title : <strong>{title} **</strong>}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
