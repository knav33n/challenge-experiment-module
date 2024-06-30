import React, { ReactNode } from "react"
import "./Button.scss"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline",
    children: ReactNode,
    isActive?: boolean
}

const Button = ({ variant = "primary", children, isActive = false, ...props }: ButtonProps) => {
    return (
        <button className={`button ${variant} ${isActive ? 'active' : ''}`}  {...props}>{children}</button>
    )
}

export default Button