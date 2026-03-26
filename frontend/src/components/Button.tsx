import { Link } from 'react-router-dom'
import styles from './Button.module.css'

type ButtonVariant = 'primary' | 'secondary'

type Props = {
  label: string
  to?: string
  type?: 'button' | 'submit' | 'reset'
  variant?: ButtonVariant
  className?: string
}

function Button({ label, to, type = 'button', variant = 'secondary', className = '' }: Props) {
  const buttonClassName = `${styles.button} ${styles[variant]} ${className}`.trim()

  if (to) {
    return (
      <Link className={buttonClassName} to={to}>
        {label}
      </Link>
    )
  }

  return (
    <button className={buttonClassName} type={type}>
      {label}
    </button>
  )
}

export default Button
