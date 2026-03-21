import { Link } from 'react-router-dom'
import styles from './Button.module.css'

type ButtonVariant = 'primary' | 'secondary'

type Props = {
  label: string
  to?: string
  type?: 'button' | 'submit' | 'reset'
  variant?: ButtonVariant
}

function Button({ label, to, type = 'button', variant = 'secondary' }: Props) {
  const className = `${styles.button} ${styles[variant]}`

  if (to) {
    return (
      <Link className={className} to={to}>
        {label}
      </Link>
    )
  }

  return (
    <button className={className} type={type}>
      {label}
    </button>
  )
}

export default Button
