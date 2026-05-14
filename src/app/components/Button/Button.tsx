import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  className?: string
}
const Button: React.FC<ButtonProps> = ({label, className}) => {
  return (
      <button className={`rounded-xl cursor-pointer bg-slate-800 p-2 text-white cursor-pointer ${className}`}>{label}</button>
  )
}

export default Button
