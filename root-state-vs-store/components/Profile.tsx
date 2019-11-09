import React from 'react'
import { TProfile } from '../types/TProfile'

type Props = {
  value: TProfile
}

export function Profile({ value }: Props) {
  const { name, sns, position } = value

  return (
    <article className="media">
      <figure className="media-left">
        <p className="image">
          <img src={`https://api.adorable.io/avatars/128/${sns}.png`} />
        </p>
      </figure>

      <div className="media-content">
        <div className="content">
          <p>
            <strong>{name}</strong>
            <br />
            <small>{sns}</small>
          </p>
          <p>{position}</p>
        </div>
      </div>
    </article>
  )
}
