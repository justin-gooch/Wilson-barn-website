import LoginForm from "../components/loginForm/login-form";
import { submitLogin } from "@/actions/logins";

export default function login() {
    return (<>
    <LoginForm action={submitLogin}/>
    </>)
}