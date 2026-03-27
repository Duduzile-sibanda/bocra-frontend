import type { ReactNode } from 'react'
import styles from './Card.module.css'

type Props = {
  title?: string
  children: ReactNode
  className?: string
}

function Card({ title, children, className = '' }: Props) {
  return (
    <article className={`${styles.card} ${className}`.trim()}>
      {title ? <h3 className={styles.title}>{title}</h3> : null}
      <div>{children}</div>
    </article>
  )
}

export default Card
