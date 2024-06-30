import { useState } from "react"
import Experiment from "./experiment/experiment"

const ExperimentsList = ({ data }: { data: Experiment[] | [] }) => {
    const [experiments, setExperiments] = useState<Experiment[] | []>(data)

    return (
        <main>
            <div>
                {experiments.map((module) =>
                    <Experiment
                        key={module.id}
                        module={module}
                        setExperiments={setExperiments}
                    />)}
            </div>
        </main>
    )
}

export default ExperimentsList