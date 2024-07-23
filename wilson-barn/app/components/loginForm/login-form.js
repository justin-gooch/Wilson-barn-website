'use client'

import { useFormState } from 'react-dom'
import FormSubmit from '../form-submit'
export default function LoginForm({action}) {
    const [formState, formAction] = useFormState(action, {})
    return (<form action={formAction} id='auth-form'>
        <div>

        </div>
        <div className='form-control'>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" />
        </div>
        <div className='form-control'>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
        </div>
        {formState?.errors && (<ul id='form-errors'>
            {Object.keys(formState.errors).map((error) => <li key={error}>{formState.errors[error]}</li>)}
        </ul>)}
        <div className='form-actions'>
            <FormSubmit SubmitTitle='Login' />
        </div>

    </form>)
}