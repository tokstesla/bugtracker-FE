import * as Yup from "yup";

const projectSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .min(6, "Title must be at least 6 characters"),
  duration: Yup.string().required("Duration is required"),
  startDate: Yup.date().required("Date to start is required"),
  budget: Yup.number()
    .required("Budget is required")
    .min(6, "Budget must be at least 6 numbers"),
});

const projectData = {
  title: "",
  duration: "",
  startDate: new Date().toISOString().split("T")[0],
  budget: 0,
  jobs: {
    inspector: false,
    flooringInstaller: false,
    surveyor: false,
    brickMason: false,
    ironWorker: false,
    craneOperator: false,
    safetyManager: false,
    costEstimator: false,
    manager: false,
  },
}

export { projectSchema, projectData };