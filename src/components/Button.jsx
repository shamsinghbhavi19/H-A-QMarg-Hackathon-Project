import { Link } from 'react-router-dom'

const variants = {
  primary:
    'gradient-purple text-white shadow-md hover:shadow-lg hover:brightness-110 active:scale-[0.98]',
  secondary:
    'bg-white text-primary-700 border border-primary-200 hover:bg-primary-50 hover:border-primary-300 active:scale-[0.98]',
  ghost: 'text-primary-700 hover:bg-primary-50 active:scale-[0.98]',
  outline:
    'border-2 border-primary-600 text-primary-700 hover:bg-primary-50 active:scale-[0.98]',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-2.5 text-sm',
  lg: 'px-8 py-3 text-base',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  className = '',
  ...props
}) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${variants[variant]} ${sizes[size]} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  )
}
