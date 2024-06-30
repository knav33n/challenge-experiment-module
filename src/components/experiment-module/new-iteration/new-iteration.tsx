import { useState } from "react"
import { iterationTypeOptions } from "../../../constants"
import Button from "../../common/Button/Button"
import "./new-iteration.scss"

interface NewIterationProps {
    handleAdd: (iterationId: string, title: string, type: IterationType) => void
    handleRemove: () => void
    iterationId: number
}

const NewIteration = ({ handleAdd, handleRemove, iterationId }: NewIterationProps) => {
    const [title, setTitle] = useState<string | undefined>()
    const [type, setType] = useState<IterationType>("short")

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const addIteration = () => {
        handleAdd(`EM-${iterationId}`, title!, type)
    }

    return (
        <div className="new-iteration">
            {`EM-${iterationId}`}
            <div>
                <input className="iteration-title" value={title} onChange={handleInputChange} placeholder="Iteration Title" />
                <div className="iteration-type">
                    {iterationTypeOptions.map(button =>
                        <Button
                            key={button.value}
                            variant="outline"
                            isActive={type === button.value}
                            onClick={() => setType(button.value as IterationType)}>
                            {button.label}
                        </Button>
                    )}
                </div>
                <div className="iteration-actions">
                    <Button variant="secondary" onClick={handleRemove}>Remove</Button>
                    <Button onClick={addIteration}>Done</Button>
                </div>
            </div>
        </div>
    )
}

export default NewIteration