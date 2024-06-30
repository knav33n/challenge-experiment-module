import "./iteration.scss"

const Iteration = ({ id, title, type }: Iteration) => {
    return (
        <div className="iteration" role="listitem">
            <span>{id}</span>
            <span>{title}</span>
            <span>{type} <span className="icon"/> </span>
        </div>
    )
}

export default Iteration