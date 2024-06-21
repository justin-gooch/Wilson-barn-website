'use client' 

import { useFormStatus } from 'react-dom'

export default function FormSubmit({SubmitTitle='Create Post'}) {
    const status = useFormStatus();

    if (status.pending) {
        return <p>Creating post...</p>
    }

    return (
        <>
        <button type="reset">Reset</button>
        <button>{SubmitTitle}</button>
        </>
    )
}