import ExperimentsList from "../components/experiment-module/experiments-list";
import { experiments } from "../constants";

const Home = () => <ExperimentsList data={experiments} />

export default Home