type IterationType = "short" | "medium" | "long";

interface Iteration {
  id: string;
  title: string;
  type: IterationType;
}

interface Experiment {
  id: number;
  iterations: Iteration[] | [];
  locked: boolean;
}
