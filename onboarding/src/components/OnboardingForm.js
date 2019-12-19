import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import '../App.css'

const OnboardingForm = ({ values, errors, touched, status }) => {
    const [job, setJob] = useState([]);

    useEffect(()=> {
        status &&  setJob(job => [...job, status])
    }, [status])

    return(
        <div className="onboarding-form">
             <Form>
                
                    <label htmlFor="companyName">Company Name
                    <Field id="companyName"
                        type="text"
                        name="companyName"
                        placeholder="Company name" />

                        {touched.companyName && errors.companyName && (
                            <p className="errors">{errors.companyname}</p>
                        )}
                    </label>
                 
               
                <label htmlFor="companyHQ">Company HQ
                    <Field id="companyHQ"
                        type="text"
                        name="companyHQ"
                        placeholder="Company HQ"/>
                    {touched.companyHQ && errors.companyHQ && (
                        <p className="errors">{errors.companyHQ}</p>
                    )}  

                </label>
                
                <label htmlFor="position">Position
                    <Field id="position"
                        type="text"
                        name="position"
                        placeholder="i.e. Full Stack Developer"/>

                        {touched.position && errors.position && (
                        <p className="errors">{errors.position}</p>
                    )}
                </label>
                
                    <Field id="category"
                        name="category"
                        as="select">
                            <option disabled>Choose a category</option>
                            <option value="software development">Software Development</option>
                            <option value="design">Design</option>
                            <option value="customer support">Customer support/Admin</option>
                            <option value="marketing">Marketing</option>
                            <option value="writing">Writing</option>
                        </Field>
                
                <label htmlFor="location">Location Restrictions
                    <Field id="location" 
                        type="text"
                        name="location"
                        placeholder="i.e. Worldwide, North America" />
                        {touched.location && errors.location && (
                        <p className="errors">{errors.location}</p>
                    )}
                </label>
                <label htmlFor="description">Description
                    <Field id="description" 
                            as="textarea"
                            type="text"
                            name="description"
                            placeholder="Describe job"
                            />
                    {touched.description && errors.description && (
                        <p className="errors">{errors.description}</p>
                    )}
                </label>
                <label htmlFor="applyURL">Apply URL
                    <Field id="applyURL" 
                            type="text"
                            name="applyURL"
                            placeholder="Where to apply"
                            />
                    {errors.applyURL && (
                        <p className="errors">{errors.applyURL}</p>
                    )}
                </label>

                <label htmlFor="applyEmail">Apply Email
                    <Field id="applyEmail" 
                            type="email"
                            name="applyEmail"
                            placeholder="Where to apply"
                            />
                    {errors.applyEmail  && (
                        <p className="errors">{errors.applyEmail }</p>
                    )}
                </label>

                <label htmlFor="salary">Salary
                    <Field id="salary" 
                            type="text"
                            name="salary"/>
                    {errors.notes && (
                        <p className="errors">{errors.salary}</p>
                    )}
                </label>
                <button type="submit">Submit</button>
                               
            </Form>
        </div>
    )
}
const FormikOnboardingForm = withFormik({
    mapPropsToValues(props){
        return{
            companyName: props.companyName || '',
            companyHQ: props.companyHQ || '', 
            position: props.position || '', 
            category: props.category || '', 
            salary: props.salary || '0', 
            location: props.location || 'Worldwide', 
            description: props.description || '', 
            applyURL: props.applyURL || '', 
            applyEmail: props.applyEmail || '', 
            notes: props.notes || '', 
            userId: props.userId || 5
        }
    }, 
     validationSchema: Yup.object().shape({
        companyName: Yup.string().required("Required"),
        companyHQ: Yup.string().required("Required"), 
        position: Yup.string().required("Required"),
        description: Yup.string().required("Required"), 
        applyEMail: Yup.string().email("Invalid Email")
     }), 

     handleSumbit(values, {setStatus, resetForm}){
         axios
         .post("https://reqres.in/api/users/", values)
         .then(res => {
             setStatus(res.data)

             resetForm();
         })
         .catch(err => console.log(err.response));
     }
})(OnboardingForm)
export default FormikOnboardingForm;