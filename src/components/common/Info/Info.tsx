import { ReactNode } from "react"
import "./Info.scss"

const Info = ({ children }: { children: ReactNode }) => {
    return (
        <div className="info">{children}</div>
    )
}

export default Info