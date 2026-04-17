import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  className?: string
}
const Button: React.FC<ButtonProps> = ({label, className}) => {
  return (
    <div className={`rounded-xl cursor-pointer bg-black p-2 text-white ${className}`}>
      <button className='cursor-pointer'>{label}</button>
    </div>
  )
}

export default Button
