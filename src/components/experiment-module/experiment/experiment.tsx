import React, { useState } from 'react';
import { IoLockClosed, IoLockOpen } from "react-icons/io5";
import Button from '../../common/Button/Button';
import Info from '../../common/Info/Info';
import Iteration from '../iteration/iteration';
import NewIteration from '../new-iteration/new-iteration';
import './experiment.scss';
import { experiments } from '../../../constants';

interface ExperimentProps {
    module: Experiment,
    setExperiments: React.Dispatch<React.SetStateAction<Experiment[]>>
}

const Experiment = ({ module, setExperiments }: ExperimentProps) => {
    const [isContentVisible, setIsContentVisible] = useState(false);
    const [isIterationInputVisible, setIsIterationInputVisible] = useState(false)

    const toggleContentVisibility = () => {
        setIsContentVisible(prev => {
            if (prev) {
                setIsIterationInputVisible(false)
            }
            return !prev
        });
    }

    const toggleIterationInputVisibility = () => {
        if (!module.locked)
            setIsIterationInputVisible(!isIterationInputVisible)
    }

    const addIteration = (iterationId: string, title: string, type: IterationType) => {
        setExperiments(prevExperiments => {
            return prevExperiments.map(experiment => {
                if (experiment.id === module.id) {
                    return {
                        ...experiment,
                        iterations: [...experiment.iterations, { id: iterationId, title, type }],
                    };
                }
                return experiment;
            });
        });
        setIsIterationInputVisible(false)
    }

    const toggleLock = () => {
        setExperiments(prevExperiments => {
            return prevExperiments.map(experiment => {
                if (experiment.id === module.id) {
                    return {
                        ...experiment,
                        locked: !experiment.locked
                    };
                }
                return experiment;
            });
        });
    }

    const reset = () => {
        setExperiments(prevExperiments => {
            return prevExperiments.map((experiment, index) => {
                if (experiment.id === module.id) {
                    return experiments[index]
                }
                return experiment;
            });
        });
    }

    return (
        <div className="experiment-module">
            <div className="header" onClick={toggleContentVisibility}>
                <span>Experiment Module</span>
                {module.locked ? <IoLockClosed size={20} /> : <IoLockOpen size={20} />}
            </div>
            {isContentVisible && (
                <>
                    <div className="content">
                        <div className="iterations">{module.iterations.map((iteration: Iteration) => <Iteration key={`${module.id}-${iteration.id}`} {...iteration} />)}</div>
                        <Info>To add a new integration, start typing a prompt or <a href="#">generate</a> one.</Info>
                    </div>

                    <div className="footer">
                        {isIterationInputVisible ? <NewIteration
                            handleAdd={addIteration}
                            handleRemove={toggleIterationInputVisibility}
                            iterationId={module.iterations.length + 1} /> : <div className="buttons">
                            <Button variant="secondary" onClick={toggleLock}>{module.locked ? 'Unlock' : 'Lock'}</Button>
                            <Button variant="secondary" onClick={reset}>Reset</Button>
                            <Button onClick={toggleIterationInputVisibility}>+ Add Iteration</Button>
                        </div>}
                    </div>
                </>
            )}
        </div>
    );
};

export default Experiment;
