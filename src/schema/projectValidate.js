import * as Yup from "yup";

const projectSchema = Yup.object().shape({
  name: Yup.string().required("Project name is required"),
  description: Yup.string().required("Description is required"),
});

const projectData = {
  name: "",
  description: "",
  members: [],
};

export { projectSchema, projectData };
