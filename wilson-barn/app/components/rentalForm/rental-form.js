'use client'
import { useFormState } from 'react-dom';
import FormSubmit from '../form-submit';
import SignatureCanvas from 'react-signature-canvas';

export default function RentalForm({action}) {
    const [state, formAction] = useFormState(action, {});

    return (<>
        <h2>New Rental Application</h2>

        <form action={formAction} >
            <p className="form-control">
                <label htmlFor="name">Name Of Renter</label>
                <input type="text" id="name" name="name" />
            </p>
            <p className="form-control">
                <label htmlFor="address">Address</label>
                <input type="text" id="address" name="address" />
            </p>
            <p className="form-control">
                <label htmlFor="phone">Phone Number</label>
                <input type="text" id="phone" name="phone" />
            </p>
            <p className="form-control">
                <label htmlFor="eventType">Type of Event</label>
                <input type="text" id="eventType" name="eventType" />
            </p>
            <p className="form-control">
                <label htmlFor="eventDate">Date of Event</label>
                <input type="date" id="eventDate" name="eventDate" />
            </p>
            <p className="form-control">
                <b>Set up</b> and clean up time is included 
                <br />in the rental time (5 hours) 
                <label htmlFor="setupTimeInitial">Initial*</label>
                <input type="text" id="setupTimeInitial" name="setupTimeInitial" />
            </p>
            <p className="form-control">
                <b>Check Out:</b> 
                <br />The Renter must check out at the close of their event with a 
                <br />barn member or the security deposit will be forfeited 
                <br />because the barn cannot be left unattended when open
                <label htmlFor="checkoutInitial">Initial*</label>
                <input type="text" id="checkoutInitial" name="checkoutInitial" />
            </p>
            <p className="form-control">
                       City of Livonia ordinance mandates that all City Parks close
                <br /> at 10:00 pm. Your event must be over and the premises
                <br />vacated By 10:00 pm
                <label htmlFor="closeTimeInitial">Initial</label>
                <input type="text" id="closeTimeInitial" name="closeTimeInitial" />
            </p>
            <p className='form-control'>
                <legend>Will outside electrical boxes be required?</legend>
                <div>
                <input type='radio' id='yesElectric' name='electric' value='yes' />
                    <input type='radio' id='yesElectric' name='electric' value='yes' />

                </div>
                    
                
            </p>
            


            {/* <p className='form-control'>
                <label htmlFor='initial'>Initial</label>
                <SignatureCanvas 
                penColor='#EDD4B2'
                canvasProps={{width: 150, height: 50, className: 'signature-canvas'}}
                />
            </p> */}


            
            <p className='form-actions'>
                <FormSubmit />
            </p>

        </form>
    </>


)

}