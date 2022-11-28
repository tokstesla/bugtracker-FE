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
    .matches(/^[a-zA-Z]+$/, "Invalid firstname")
    .required("First name is required"),
  lastName: Yup.string()
    .matches(/^[a-zA-Z]+$/, "Invalid lastname")
    .required("Last name is required"),
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
