'use client'
import { useFormState } from 'react-dom';
import FormSubmit from '../form-submit';
import SignatureCanvas from 'react-signature-canvas';
import { useRef, useState } from 'react';

export default function VendorForm({action, marketInfo}) {
    const sigPad = useRef();
    const [formState, formAction] = useFormState(action, {});
    const [currentSignature, setCurrentSignature] = useState('');

    const marketdays = marketInfo.listOfDaysForMarket;
    const marketDaysList = marketdays.split(',');
    const marketDaysArr = [];

    marketDaysList.forEach((marketDay) => {
        marketDaysArr.push(<>
        <input type="checkbox" id={marketDay.trim()} name={`days_of_participation`} value={marketDay.trim()} />
        <label for={marketDay.trim()}>{marketDay.trim()}</label></>
    )
    });
    
    const clearSignature = () => {
        if (sigPad.current) {
            sigPad.current.clear();
        }
    }

    const saveSignature = () => {
        if (sigPad.current) {
            const sigImage = sigPad.current.toDataURL();
            setCurrentSignature(sigImage)
        }
    }

    return (<>
        <h2>New Vendor Application</h2>
        <h4>{marketInfo.title}</h4>

        <form action={formAction} >
            <div className="form-control">
                <label htmlFor="first_name">First Name</label>
                <input type="text" id="first_name" name="first_name" />
            </div >
            <div className="form-control">
                <label htmlFor="last_name">Last name</label>
                <input type="text" id="last_name" name="last_name" />
            </div >
            <div className="form-control">
                <label htmlFor="business_name">Business Name</label>
                <input type="text" id="business_name" name="business_name" />
            </div >
            <div className="form-control">
                <label htmlFor="email">Email</label>
                <input type="text" id="email" name="email" />
            </div >
            <div className="form-control">
                <label htmlFor="street_address">Street Address</label>
                <input type="text" id="street_address" name="street_address" />
            </div >
            <div className="form-control">
                <label htmlFor="street_address_line_2">Street Address Line 2</label>
                <input type="text" id="street_address_line_2" name="street_address_line_2" />
            </div >
            <div className="form-control">
                <label htmlFor="city">City</label>
                <input type="text" id="city" name="city" />
            </div>
            <div className="form-control">
                <label htmlFor="state">state</label>
                <input type="text" id="state" name="state" />
            </div>
            <div className="form-control">
                <label htmlFor="zip">zip</label>
                <input type="text" id="zip" name="zip" />
            </div>
            <div className="form-control">
                <label htmlFor="phone">phone</label>
                <input type="text" id="phone" name="phone" />
            </div>

            <div className='form-control'>
                <legend>Do You Accept Credit Cards?</legend>
                <div className='form-control-yes-no'>
                    <input type='radio' id='yesCreditCard' name='accept_credit_debit' value='1' />
                    <label htmlFor='yesCreditCard'>Yes</label>
                    <input type='radio' id='noCreditCard' name='accept_credit_debit' value='0' />
                    <label htmlFor='noCreditCard'>No</label>
                </div>
            </div >

            <div className='form-control'>
                <legend>Do You need Electricity?</legend>
                <div className='form-control-yes-no'>
                    <input type='radio' id='yesElectricity' name='electricity' value='1' />
                    <label htmlFor='yesElectricity'>Yes</label>
                    <input type='radio' id='noElectricity' name='electricity' value='0' />
                    <label htmlFor='noElectricity'>No</label>
                </div>
            </div >

            <div className="form-control">
                <label htmlFor="description_of_items_sold">Description Of Items Sold</label>
                <input type="text" id="description_of_items_sold" name="description_of_items_sold" />
            </div>

            <div className='form-control'>
                <legend>How many spots do you need?</legend>
                <div className='form-control-yes-no'>
                    <input type='radio' id='how_many_spots1' name='how_many_spots' value='1' />
                    <label htmlFor='how_many_spots'>1</label>
                    <input type='radio' id='how_many_spots2' name='how_many_spots' value='2' />
                    <label htmlFor='how_many_spots'>2</label>
                    <input type='radio' id='how_many_spots3' name='how_many_spots' value='3' />
                    <label htmlFor='how_many_spots'>3</label>
                    <input type='radio' id='how_many_spots4' name='how_many_spots' value='4' />
                    <label htmlFor='how_many_spots'>4</label>
                </div>
            </div >

            <div className='form-control'>
                <legend>What days are you participating?</legend>
                {marketDaysArr}
            </div>

            <div className='form-control'>
                <legend>Do you want to pay for the entire season? (${marketInfo.costPerSpotPerSeason}/spot)</legend>
                <div className='form-control-yes-no'>
                    <input type='radio' id='pay_for_whole_season_yes' name='pay_for_whole_season' value='1' />
                    <label htmlFor='pay_for_whole_season_yes'>Yes</label>
                    <input type='radio' id='pay_for_whole_season_no' name='pay_for_whole_season' value='0' />
                    <label htmlFor='pay_for_whole_season_no'>No</label>
                </div>
            </div >


            <div className='form-control'>
                <legend><p>{marketInfo.participateText}</p></legend>
                <div className='form-control-yes-no'>
                    <input type='radio' id='agree_to_participate_pay_yes' name='agree_to_participate_pay' value='1' />
                    <label htmlFor='agree_to_participate_pay_yes'>Yes</label>
                    <input type='radio' id='agree_to_participate_pay_no' name='agree_to_participate_pay' value='0' />
                    <label htmlFor='agree_to_participate_pay_yes'>No</label>
                </div>
            </div >

            <div className='form-control'>
                <legend><p>{marketInfo.foodFarmLicenseText}</p></legend>
                <div className='form-control-yes-no'>
                    <input type='radio' id='farmer_food_liability_license_yes' name='farmer_food_liability_license' value='1' />
                    <label htmlFor='farmer_food_liability_license_yes'>Yes</label>
                    <input type='radio' id='farmer_food_liability_license_no' name='farmer_food_liability_license' value='0' />
                    <label htmlFor='farmer_food_liability_license_no'>No</label>
                    <input type='radio' id='farmer_food_liability_license_not_applicable' name='farmer_food_liability_license' value='3' />
                    <label htmlFor='farmer_food_liability_license_not_applicable'>Not applicable</label>
                </div>
            </div >

            <div className='form-control'>
                <legend><p>{marketInfo.mediaReleaseText}</p></legend>
                <div className='form-control-yes-no'>
                    <input type='radio' id='media_release_yes' name='media_release' value='1' />
                    <label htmlFor='media_release_yes'>Yes</label>
                    <input type='radio' id='media_release_no' name='media_release' value='0' />
                    <label htmlFor='media_release_no'>No</label>
                </div>
            </div >

            <div className='form-control'>
                <legend><p>{marketInfo.holdHarmlessText}</p></legend>
                <div className='form-control-yes-no'>
                    <input type='radio' id='hold_harmless_yes' name='hold_harmless' value='1' />
                    <label htmlFor='hold_harmless_yes'>Yes</label>
                    <input type='radio' id='hold_harmless_no' name='hold_harmless' value='0' />
                    <label htmlFor='hold_harmless_no'>No</label>
                </div>
            </div >

            <div className='form-control'>
                <legend><p>{marketInfo.paymentAgreementText}</p></legend>
                <div className='form-control-yes-no'>
                    <input type='radio' id='paying_via_paypal_yes' name='paying_via_paypal' value='1' />
                    <label htmlFor='paying_via_paypal_yes'>Yes</label>
                    <input type='radio' id='paying_via_paypal_no' name='paying_via_paypal' value='0' />
                    <label htmlFor='paying_via_paypal_no'>No</label>
                </div>
            </div >            
            <br/>
            <article className='form-details'>             
                <div>
                    <div className='form-control-bold-underline'>Please sign below agreeing to the Market Agreement and to abide by all stated conditions. </div> Falsification of any information in this agreement renders the document void.
                </div >
                <div className='form-control'>
                    <div className='form-control-bold-underline'>Signature:</div>
                    <SignatureCanvas ref={sigPad} penColor='black' onEnd={saveSignature} canvasProps={{width: 500, height: 200, className: 'signature-canvas'}} />
                </div >
                <div className='form-actions signature'>
                    <button type='button' onClick={clearSignature} >Clear Signature</button>
                    {/* <button type='button' onClick={saveSignature}>Save Signature</button> */}
                </div >
                <div hidden>
                    <input type='text' id='signature' name='signature' value={currentSignature} onChange={saveSignature}/>
                </div>
                <div hidden>
                    <input type='text' id='marketID' name='marketID' value={marketInfo.id}/>
                </div>
                <div className='form-control'>
                    <div className='form-control-bold-underline'>Submit Date:</div>
                    <input type="date" id="submit_date" name="submit_date" value={new Date().toISOString().split('T')[0]} readOnly />
                </div >
                
            </article>
            
            {formState?.errors && (<ul id='form-errors'>
            {Object.keys(formState.errors).map((error) => <li key={error}>{formState.errors[error]}</li>)}
                </ul>)}
            
            <div className='form-actions'>
                <FormSubmit SubmitTitle='Submit Market Application' />
            </div >

        </form>
    </>
)

}