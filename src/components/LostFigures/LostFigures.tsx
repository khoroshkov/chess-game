import React from 'react'
import { Figure } from '../../models/figures/Figure'

interface LostFiguresProps {
  title: string
  figures: Figure[]
}

export const LostFigures: React.FC<LostFiguresProps> = ({ title, figures }) => {
  return (
    <div className="lost">
      <h3>{title}</h3>
      {figures.map((figure) => (
        <div key={figure.id}>
          {figure.name}{' '}
          {figure.logo && (
            <img
              className="lostFiguresImg"
              src={figure.logo}
              alt="lost figure image"
            />
          )}
        </div>
      ))}
    </div>
  )
}
