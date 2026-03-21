import type { ReactNode } from 'react'
import styles from './Card.module.css'

type Props = {
  title?: string
  children: ReactNode
}

function Card({ title, children }: Props) {
  return (
    <article className={styles.card}>
      {title ? <h3 className={styles.title}>{title}</h3> : null}
      <div>{children}</div>
    </article>
  )
}

export default Card
