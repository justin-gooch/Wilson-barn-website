'use client'

import FormSubmit from "../form-submit";
import { useFormState } from 'react-dom'


export default function EventForm({action}) {
    const [state, formAction] = useFormState(action, {});
    return (
        <>
        <h2>New Event</h2>
        <form action={formAction}>
            <div className="form-control">
                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title" />
            </div>
            <div className="form-control">
                <label htmlFor="image">Image</label>
                <input
                    type="file"
                    accept="image/png, image/jpeg"
                    id="image"
                    name="image"
                />
            </div>    
            <div className="form-control">
                <label htmlFor="description">Description</label>
                <input type="text" id="description" name="description" />
            </div>
            <div className="form-control">
                <label htmlFor="content">Content</label>
                <input type="text" id="content" name="content" />
            </div>

            <div className="form-control">
                <label htmlFor="eventDateTime">Event DateTime</label>
                <input type="datetime-local" id="eventDateTime" name="eventDateTime" />
            </div>

            <div className="form-actions">
                <FormSubmit />
            </div>
            {state.errors && 
            <ul className='form-errors'>
                {state.errors.map((error) => (
                    <li key={error}>{error}</li>
                ))}
            </ul>
            }
        </form>
        </>
    )
}
