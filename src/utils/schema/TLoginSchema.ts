import { object, string } from "yup";
import type { InferType } from "yup";

const LoginSchema = object().shape({
  email: string()
    .email("Invalid email format")
    .required("Email is required"),
  password: string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
export default LoginSchema;

export type TLoginSchema = InferType<typeof LoginSchema>;