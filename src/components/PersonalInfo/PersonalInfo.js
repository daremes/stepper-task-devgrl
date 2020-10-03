import React, { useState, useContext } from "react";
import styled from "styled-components";
import PayloadContext from "../Subscription/PayloadContext";
import StepperContext from "../Stepper/StepperContext";

export default function ParsonalInfo() {
  const handleEvaluate = useContext(StepperContext);
  const { payload, setPayload } = useContext(PayloadContext);

  const [formData, setFormData] = useState({
    firstName: payload.formData ? payload.formData.firstName : "",
    surname: payload.formData ? payload.formData.surname : "",
    email: payload.formData ? payload.formData.email : "",
    agreement: payload.formData ? payload.formData.agreement : false,
  });
  //
  const [, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, type, value, checked } = event.target;
    const newData = {
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    };
    setFormData(newData);
    if (type === "checkbox" && checked) {
      setErrors({});
      validateForm(newData);
    } else if (type === "checkbox" && !checked) {
      validateForm(newData);
      handleEvaluate(false);
    }
  };

  const validateForm = (newData) => {
    const { firstName, surname, email } = formData;
    const err = {};
    if (firstName.length < 1) {
      err.firstName = "Fill in your name.";
    }
    if (surname.length < 1) {
      err.surname = "Fill in your name.";
    }
    if (!email.includes("@") || !email.includes(".")) {
      err.email = "Use your valid email";
    }
    if (Object.keys(err).length < 1) {
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
        <TextField
          name="firstName"
          type="text"
          className="input-field"
          id="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
        />
        <TextField
          name="surname"
          type="text"
          className="input-field"
          id="surname"
          value={formData.surname}
          onChange={handleChange}
          placeholder="Surname"
        />
        <TextField
          name="email"
          type="email"
          className="input-field"
          id="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <div>
          <TextField
            name="agreement"
            type="checkbox"
            className="input-field"
            id="agreement"
            value={formData.agreement}
            checked={formData.agreement}
            onChange={handleChange}
            placeholder="License agreement stuff"
          />
          <label> Some agreement or stuff like that</label>
        </div>
      </form>
      <h2>Payment Method</h2>
      <div style={{ height: "48px" }}>...etc...</div>
    </Container>
  );
}

const Container = styled.div`
  form {
    display: flex;
    flex-direction: column;
    max-width: 450px;
  }
`;
const TextField = styled.input`
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
  font-family: "Montserrat", sans-serif;
`;
