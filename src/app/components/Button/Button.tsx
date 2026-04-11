import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  className?: string
}
const Button: React.FC<ButtonProps> = ({label, className}) => {
  return (
    <div className={`rounded-md cursor-pointer ${className}`}>
      <button className='cursor-pointer'>{label}</button>
    </div>
  )
}

export default Button
