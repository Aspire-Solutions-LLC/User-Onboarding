import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import '../App.css'

const RegistrationForm = ({ values, errors, touched, status }) => {
    const [user, setUser] = useState([]);

    useEffect(()=> {
        status &&  setUser(user => [...user, status])
    }, [status])

    return(
        <div className="onboarding-form">
             <Form>
                
                    <label htmlFor="email">Email
                    <Field id="email"
                        type="text"
                        name="email"
                        placeholder="Email" />

                        {touched.email && errors.email && (
                            <p className="errors">{errors.email}</p>
                        )}
                    </label>
                 
               
                <label htmlFor="password">Password
                    <Field id="password"
                        type="password"
                        name="password"
                        placeholder="Password"/>
                    {touched.password && errors.pasword && (
                        <p className="errors">{errors.password}</p>
                    )}  

                </label>
                
                
                <button type="submit">Submit</button>
                               
            </Form>
        </div>
    )
}
const FormikRegistrationForm = withFormik({
    mapPropsToValues(props){
        return{
            email: props.email || '',
            password: props.password || '' 
            
        }
    }, 
     validationSchema: Yup.object().shape({
        email: Yup.string().required("Required"),
        password: Yup.string().required("Required")
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
})(RegistrationForm)
export default FormikRegistrationForm;