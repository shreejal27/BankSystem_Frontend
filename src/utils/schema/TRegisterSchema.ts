import { object, string } from "yup";
import type { InferType } from "yup";

const RegisterSchema = object().shape({
  name: string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  email: string()
    .email("Invalid email format")
    .required("Email is required"),
  password: string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
export default RegisterSchema;

export type TRegisterSchema = InferType<typeof RegisterSchema>;