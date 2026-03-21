import type { ReactNode } from 'react'
import styles from './Section.module.css'

type Props = {
  title: string
  subtitle?: string
  children: ReactNode
  id?: string
}

function Section({ title, subtitle, children, id }: Props) {
  return (
    <section className={styles.section} id={id}>
      <header className={styles.header}>
        <h2>{title}</h2>
        {subtitle ? <p>{subtitle}</p> : null}
      </header>
      {children}
    </section>
  )
}

export default Section
