import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'gold' | 'outline' | 'glass'
  children: React.ReactNode
}

export default function Button({ variant = 'gold', children, className = '', ...props }: ButtonProps) {
  let baseStyles = "px-6 py-3 rounded-2xl font-semibold transition-all duration-300 active:scale-95 text-center flex items-center justify-center gap-2 "
  
  if (variant === 'gold') {
    baseStyles += "btn-gold shadow-sm"
  } else if (variant === 'outline') {
    baseStyles += "btn-outline"
  } else if (variant === 'glass') {
    baseStyles += "btn-outline opacity-80"
  }

  return (
    <button className={`${baseStyles} ${className}`} {...props}>
      {children}
    </button>
  )
}
