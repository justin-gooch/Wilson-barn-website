import { submitRegistration } from "@/actions/logins";
import RegisterForm from "../components/registerForm/register-form";

export default function login() {
    return (<>
    <RegisterForm action={submitRegistration}/>
    </>)
}