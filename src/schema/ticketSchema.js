import * as Yup from "yup";

const ticketData = {
  title: "",
  description: "",
  status: "",
  date: "",
  priority: "",
  type: "",
  assigned_devs: [],
};

const ticketValidationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  status: Yup.string().required("Status is required"),
  date: Yup.number().max(168, 'Maximum number of hours reached').required("This field is required"),
  priority: Yup.string().required("This field is required"),
  type: Yup.string().required("This field is required"),
});

export { ticketValidationSchema, ticketData };
