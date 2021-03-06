import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import PayloadContext from '../Subscription/PayloadContext';
import StepperContext from '../Stepper/StepperContext';

const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

let timerId = {};

export default function ParsonalInfo() {
  const initState = {
    firstName: '',
    surname: '',
    email: '',
    agreement: '',
  };
  const handleEvaluate = useContext(StepperContext);
  const { payload, setPayload } = useContext(PayloadContext);
  const [formData, setFormData] = useState(initState);
  const [touched, setTouched] = useState(initState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // safety precautions on unmount
    return () => {
      Object.keys(timerId).forEach(id => {
        clearTimeout(timerId[id]);
      });
    };
  }, []);

  const handleChange = event => {
    const { name, type, value, checked } = event.target;
    const newData = {
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    };
    if (!touched[name]) {
      // ux concerns: give our user some time to enter a valid email before marking field as "touched" and displaying a validation error
      // a naive replacement for classic throttle func
      const timeoutToShowError = () =>
        setTimeout(() => {
          setTouched({ ...touched, [name]: true });
        }, 3500);
      timerId[name] = timeoutToShowError();
    }
    setFormData(newData);
    handleEvaluate(false);
    handleValidation(newData);
  };

  const handleValidation = newData => {
    const { firstName, surname, email, agreement } = newData;
    const err = {};
    if (firstName.length < 1) {
      err.firstName = 'Fill in your name.';
    }
    if (surname.length < 1) {
      err.surname = 'Fill in your name.';
    }
    if (!emailRegEx.test(email)) {
      err.email = 'Use your valid email';
    }
    if (!agreement) {
      err.agreement = 'You have to agree to something';
    }
    if (Object.keys(err).length < 1 && agreement) {
      setPayload({
        ...payload,
        formData: newData,
      });
      handleEvaluate(true);
    }
    setErrors(err);
  };

  return (
    <Container>
      <h2>Personal Details</h2>
      <form>
        <InputField>
          <input
            name='firstName'
            type='text'
            value={formData.firstName}
            onChange={handleChange}
            placeholder='First Name'
          />
          <ErrMsg>{touched.firstName ? errors.firstName : null}</ErrMsg>
        </InputField>
        <InputField>
          <input
            name='surname'
            type='text'
            value={formData.surname}
            onChange={handleChange}
            placeholder='Surname'
          />
          <ErrMsg>{touched.surname ? errors.surname : null}</ErrMsg>
        </InputField>
        <InputField>
          <input
            name='email'
            type='email'
            value={formData.email}
            onChange={handleChange}
            placeholder='Email'
          />
          <ErrMsg>{touched.email ? errors.email : null}</ErrMsg>
        </InputField>
        <InputField>
          <div>
            <input
              name='agreement'
              type='checkbox'
              id='check1'
              value={formData.email}
              checked={formData.agreement}
              onChange={handleChange}
              placeholder='License agreement stuff'
            />
            <ErrMsg>{touched.agreement ? errors.agreement : null}</ErrMsg>
            <label htmlFor='check1'>Some agreement or stuff like that</label>
          </div>
        </InputField>
      </form>
      <h2>Payment Method</h2>
      <div style={{ height: '48px' }}>...etc...</div>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  form {
  }
`;
const InputField = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  input {
    max-width: 450px;
    padding: 5px;
    font-size: 16px;
    border-width: 0px;
    border-color: #cccccc;
    background-color: #ffffff;
    color: #000000;
    border-bottom: 2px solid #444;
    border-radius: 0px;
    box-shadow: 0px 0px 5px rgba(66, 66, 66, 0);
    margin-bottom: 24px;
    font-family: 'Montserrat', sans-serif;
  }
`;

const ErrMsg = styled.div`
  position: absolute;
  font-size: 12px;
  color: red;
  top: -14px;
`;
