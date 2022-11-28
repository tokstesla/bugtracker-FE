import * as Yup from "yup";

const registerData = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  password: "",
  password2: "",
};

const registerValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required")
    .max(40, "First name must not exceed 40 characters"),
  lastName: Yup.string()
    .required("Last name is required")
    .max(40, "Last name must not exceed 40 characters"),
  email: Yup.string().email().required("Email is required"),
  phoneNumber: Yup.string()
    .matches(
      /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{3,8}$/,
      "Enter a valid phone number"
    )
    .required("Phone number is required"),
  password: Yup.string().required("Password is required"),
  password2: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password"), null], "Passwords do not match"),
});

export { registerValidationSchema, registerData };
