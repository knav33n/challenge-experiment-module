export const iterationTypeOptions = [
  { label: "Short", value: "short" },
  { label: "Medium Length", value: "medium" },
  { label: "Very very long (up to 35 char)", value: "long" },
];

export const experiments = [
  { id: 1, iterations: [], locked: false },
  {
    id: 2,
    iterations: [
      {
        id: "EM-1",
        title: "Iteration Title",
        type: "short",
      },
      {
        id: "EM-2",
        title: "Iteration Title",
        type: "medium",
      },
      {
        id: "EM-3",
        title: "Iteration Title",
        type: "long",
      },
    ],
    locked: false,
  },
  {
    id: 3,
    iterations: [
      {
        id: "EM-1",
        title: "Iteration Title",
        type: "short",
      },
      {
        id: "EM-2",
        title: "Iteration Title",
        type: "long",
      },
      {
        id: "EM-3",
        title: "Iteration Title",
        type: "long",
      },
      {
        id: "EM-4",
        title: "Iteration Title",
        type: "medium",
      },
      {
        id: "EM-5",
        title: "Iteration Title",
        type: "short",
      },
    ],
    locked: true,
  },
];
