'use client'
import { useFormState } from 'react-dom';
import FormSubmit from '../form-submit';
import SignatureCanvas from 'react-signature-canvas';
import { useEffect, useRef } from 'react';

export default function RentalForm({action}) {
    const sigPad = useRef();
    const [state, formAction] = useFormState(action, {});

    useEffect(() => {
        if(sigPad) {

        console.log('currSig', sigPad)

        }
    }, [sigPad])

    const clearSignature = () => {
        if (sigPad.current) {
            sigPad.current.clear();
        }
    }

    return (<>
        <h2>New Rental Application</h2>

        <form action={formAction} >
            <div className="form-control">
                <label htmlFor="name">Name Of Renter</label>
                <input type="text" id="name" name="name" />
            </div >
            <div className="form-control">
                <label htmlFor="address">Address</label>
                <input type="text" id="address" name="address" />
            </div >
            <div className="form-control">
                <label htmlFor="phone">Phone Number</label>
                <input type="text" id="phone" name="phone" />
            </div >
            <div className="form-control">
                <label htmlFor="eventType">Type of Event</label>
                <input type="text" id="eventType" name="eventType" />
            </div >
            <div className="form-control">
                <label htmlFor="eventDate">Date of Event</label>
                <input type="date" id="eventDate" name="eventDate" />
            </div >
            <div className="form-control">
                <div className='form-control-bold-underline'>Set up</div> and clean udiv time is included 
                <br />in the rental time (5 hours) 
                <label htmlFor="setupTimeInitial">Initial*</label>
                <input type="text" id="setupTimeInitial" name="setupTimeInitial" />
            </div >
            <div className="form-control">
            <div className='form-control-bold-underline'>Check Out:</div> 
                The Renter must check out at the close of their event with a 
                <br />barn member or the security deposit will be forfeited 
                <br />because the barn cannot be left unattended when open
                <label htmlFor="checkoutInitial">Initial*</label>
                <input type="text" id="checkoutInitial" name="checkoutInitial" />
            </div >
            <div className="form-control">
            <div className='form-control-bold-underline'>City of Livonia ordinance</div> mandates that all City Parks close
                <br /> at 10:00 pm. Your event must be over and the premises
                <br />vacated By 10:00 pm
                <label htmlFor="closeTimeInitial">Initial*</label>
                <input type="text" id="closeTimeInitial" name="closeTimeInitial" />
            </div >
            <div className='form-control'>
                <legend>Will outside electrical boxes be required?</legend>
                <div className='form-control-yes-no'>
                    <input type='radio' id='yesElectric' name='electric' value='yes' />
                    <label htmlFor='yesElectric'>Yes</label>
                    <input type='radio' id='noElectric' name='electric' value='no' />
                    <label htmlFor='noElectric'>No</label>
                </div>
            </div >
            <div className='form-control'>
                <legend>Will bouncy houses, carnival rides, petting farms, etc be used?</legend>
                <div className='form-control-yes-no'>
                    <input type='radio' id='yesBouncyHouse' name='bouncyHouse' value='yes' />
                    <label htmlFor='yesBouncyHouse'>Yes</label>
                    <input type='radio' id='noBouncyHouse' name='bouncyHouse' value='no' />
                    <label htmlFor='noBouncyHouse'>No</label>
                </div>
            </div >
            <div className='form-control'>
                <legend>Are you having the event catered?</legend>
                <div className='form-control-yes-no'>
                    <input type='radio' id='yesCatered' name='catered' value='yes' />
                    <label htmlFor='yesCatered'>Yes</label>
                    <input type='radio' id='noCatered' name='catered' value='no' />
                    <label htmlFor='noCatered'>No</label>
                </div>
            </div >
            <br/>
            <article className='form-details'>
                <div><div className='form-control-bold-underline'>Catered events: </div> Require a current certificate of liability insurance for $1 million.
                    The City of Livonia and the Friends of the Barn must be designated as “additional
                 insureds.” A copy of the certificate must accompany this agreement. No open flames of
                 any kind (including sterno cans) are not allowed inside the barn or within 50 feet
                 around the barn.</div > 
                <div><div className='form-control-bold-underline'>Refrigerator and Microwave:</div> The Barn’s lower level includes restrooms and a kitchenette equipped with a small microwave and large commercial refrigerator and a chest freezer. Only that portion of the lower level is accessible to renters.</div >
                <div><div className='form-control-bold-underline'>Picnic tables: </div> The outside picnic tables may be arranged and moved by the renters, at their own risk, as desired. There are eight (8) picnic tables marked “Friends of the Barn” located inside the barn. These tables may be used inside the barn or moved outside. However, the Renter is responsible for putting the 8 marked tables back inside the Barn at the end of the event, as well as all cleanup inside and outside the Barn.</div >
                <div><div className='form-control-bold-underline'>Parking:</div>Parking is available at Emerson Middle School, which is located adjacent to and directly east of the Wilson Barn on West Chicago. Seniors and handicap vehicles (with permit) may park on the Barn Grounds behind the Barn. It is the Renter’s responsibility to make sure their guests park at Emerson.</div >
                <div><div className='form-control-bold-underline'>Other rental items:</div> The Barn does not rent tables, chairs, or any other items. The rental fee only includes the Barn space and picnic tables. Any other items required by the Renter are the sole responsibility of the Renter.</div >
                <div className='form-control'>
                    <div className='form-control-bold-underline'>Alcoholic Beverages: </div>
                    No alcoholic beverages are permitted at Wilson Barn events. A City of Livonia ordinance prohibits alcoholic beverages at any of its parks. Our mission is to provide a family friendly environment. 
                    <label htmlFor="noAlcoholInitial">Initial*</label>
                    <input type="text" id="noAlcoholInitial" name="noAlcoholInitial" />
                </div >
                <div className='form-control'>
                    <div className='form-control-bold-underline'>Balloons and Adhesives: </div>
                    No helium balloons are permitted inside the Barn.Staples, tacks, and nails are not permitted to hang any item. Any tape must be completely removed.
                    <label htmlFor="noBaloonsInitial">Initial*</label>
                    <input type="text" id="noBaloonsInitial" name="noBaloonsInitial" />
                </div >
                <div className='form-control'>
                    <div className='form-control-bold-underline'>Smoking: </div>
                    No smoking is allowed inside the Barn or within a 50-foot range around the entire Barn.
                    <label htmlFor="noSmokingInitial">Initial*</label>
                    <input type="text" id="noSmokingInitial" name="noSmokingInitial" />
                </div >
                <div>
                    <div className='form-control-bold-underline'>Rental Fees:</div>
                    <ul>
                        <li>Rental Fee: $225.00 per day for 5 hours</li>
                        <li>Security Deposit: $50 per day security deposit is required.</li>
                        <li>Additional Hours: Additional hours are available, please discuss this with your rental coordinator at least one week before your event</li>
                        <li>$225.00 cost for 5 hours of Rental</li>
                        <li>$50.00 Security Deposit</li>
                        <li>275.00 Total payment for 5 hours </li>
                        <li>If additional hours are needed (And you have discussed it with the rental coordinator) It would be $25.00 per additional hour.</li>
                        <li>After Receiving the form we will send you an invoice which can be paid online</li>
                        <li>With a online processing fee attached</li>
                        <li>Or with a check sent to</li>
                        </ul>
                        Wilson Barn rental <br/>
                        29350 West Chicago <br/>
                        Livonia, Mi, 48150 <br/>
                </div >
                <div>
                    <div className='form-control-bold-underline'>Release and Hold Harmless Agreement:</div>In consideration of entering into this Agreement with the City of Livonia and the Friends of the Barn, the undersigned, by this instrument, does hereby expressly stipulate and agree to release, discharge, indemnify, and forever hold harmless the City of Livonia and the Friends of the Barn, its assigns, agents, servants and employees, of any damage, loss, or injury which heretofore has been or which may hereafter be sustained by the said individual, group, organization or family as a consequence of their participation in any and all activities in connection with this Agreement. This release extends and applies to, and also covers and includes all unknown, unforeseen, unanticipated and unsuspected injuries, damages, loss and liability, and the consequence thereof, as well as those now disclosed and known to exist. The provisions of any state, federal, local or territorial law or statue providing in substance that releases shall not extend to claims, demands, injuries or damages, which are unknown or are unsuspected to exist at the time to the person executing such release, are hereby expressly waived.

                    <br /> <br/>
                    Having read the above conditions, I agree to adhere to the conditions of this agreement and the guidelines established by the Friends of the Barn
                </div >
                <div>
                    <div className='form-control-bold-underline'>Please sign below agreeing to the Rental Agreement and to abide by all stated conditions. </div> Falsification of any information in this agreement renders the document void.
                </div >
                <div className='form-control'>
                    <div className='form-control-bold-underline'>Signature:</div>
                    <SignatureCanvas ref={sigPad} penColor='black' canvasProps={{width: 500, height: 200, className: 'signature-canvas'}} />
                </div >
                <div className='form-actions signature'>
                    <button type='button' onClick={clearSignature} >Clear Signature</button>
                    <button type='button' onClick={() => {}}>Save Signature</button>
                </div >
                <div className='form-control'>
                    <div className='form-control-bold-underline'>Submit Date:</div>
                    <input type="date" id="submitDate" name="submitDate" value={new Date().toISOString().split('T')[0]} readOnly />
                </div >
                
            </article>
            
            
            <div className='form-actions'>
                <FormSubmit />
            </div >

        </form>
    </>


)

}