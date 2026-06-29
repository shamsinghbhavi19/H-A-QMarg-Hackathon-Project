export default function Card({
  children,
  className = '',
  hover = false,
  padding = 'p-6',
}) {
  return (
    <div
      className={`bg-white/80 backdrop-blur-sm rounded-2xl border border-pink-100/80 card-shadow transition-all duration-300 ${hover ? 'hover:card-shadow-hover hover:-translate-y-0.5' : ''} ${padding} ${className}`}
    >
      {children}
    </div>
  )
}
