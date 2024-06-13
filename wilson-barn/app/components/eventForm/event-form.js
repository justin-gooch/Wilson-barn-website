'use client'
import FormSubmit from "../../components/eventForm/form-submit";
import { useFormState } from 'react-dom'

export default function EventForm({action}) {
    const [state, formAction] = useFormState(action, {});
    return (
        <>
        <h2>New Event</h2>
        <form action={formAction}>
            <p className="form-control">
                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title" />
            </p>
            <p className="form-control">
                <label htmlFor="image">Image</label>
                <input
                    type="file"
                    accept="image/png, image/jpeg"
                    id="image"
                    name="image"
                />
            </p>    
            <p className="form-control">
                <label htmlFor="description">Description</label>
                <input type="text" id="description" name="description" />
            </p>
            <p className="form-control">

                <label htmlFor="content">Content</label>
                <input type="text" id="content" name="content" />
            </p>

            <p className="form-control">
                <label htmlFor="eventDateTime">Event DateTime</label>
                <input type="datetime-local" id="eventDateTime" name="eventDateTime" />
            </p>


            <p className="form-actions">
                <FormSubmit />
            </p>
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