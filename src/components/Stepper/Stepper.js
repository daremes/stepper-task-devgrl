// a reusable stepper component
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import StepperContext from './StepperContext';

export default function Stepper({ options, onLastStep }) {
  const history = useHistory();
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState([...options]);
  const { isEvaluated, component } = steps[currentStep];

  const handleEvaluate = isEvaluated => {
    const newStepsOptions = [...steps];
    newStepsOptions[currentStep].isEvaluated = isEvaluated;
    setSteps(newStepsOptions);
  };

  const handleClickNext = () => {
    if (currentStep === steps.length - 1) {
      if (onLastStep) {
        onLastStep();
      } else {
        history.push('/');
      }
    }
    setCurrentStep(currentStep => currentStep + 1);
  };

  const handleClickBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep => currentStep - 1);
    }
  };

  return (
    <Container>
      <StepperContext.Provider value={handleEvaluate}>
        <StepsVisualization>
          {steps.map((step, i) => (
            <div
              key={`step-${i}`}
              className='step'
              onClick={
                i < currentStep ? () => setCurrentStep(s => s - 1) : () => null
              }
              style={{
                background: i === currentStep ? '#fafafa' : '#444',
                color: i === currentStep ? '#444' : '#fafafa',
              }}
            >
              {step.name ? step.name : i + 1}
            </div>
          ))}
        </StepsVisualization>
        <div className='centered'>
          <Content>{component}</Content>
          <Controls>
            <TextButton
              disabled={currentStep > 0 ? false : true}
              onClick={handleClickBack}
            >
              BACK
            </TextButton>
            <Button disabled={!isEvaluated} onClick={handleClickNext}>
              {currentStep === steps.length - 1 ? 'COMPLETE ORDER' : 'NEXT'}
            </Button>
          </Controls>
        </div>
      </StepperContext.Provider>
    </Container>
  );
}

const Container = styled.div`
  .centered {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
const StepsVisualization = styled.div`
  background: #444;
  color: #fafafa;
  display: flex;
  justify-content: space-around;
  .step {
    padding: 0 4px;
  }
`;
const Content = styled.div`
  width: 100%;
  max-width: 768px;
`;
const Controls = styled.div`
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding-top: 24px;
  width: 100%;
  max-width: 768px;
  margin: 24px 0;
  display: flex;
  justify-content: space-between;
  font-family: 'Montserrat', sans-serif;
`;

const Button = styled.button`
  background-color: #444;
  border: 1px solid #444;
  box-sizing: border-box;
  display: inline-block;
  cursor: pointer;
  color: #fafafa;
  font-size: 16px;
  padding: 8px 12px;
  font-family: inherit;
  text-decoration: none;
  &:hover {
    background-color: #333;
    color: #fafafa;
  }
  &:active {
    position: relative;
    top: 1px;
  }
  &:disabled {
    border: none;
    cursor: not-allowed;
    background-color: transparent;
    color: #777;
  }
`;

const TextButton = styled.button`
  background-color: transparent;
  border: 1px solid transparent;
  box-sizing: border-box;
  display: inline-block;
  cursor: pointer;
  color: #444;
  font-size: 14px;
  padding: 8px 12px;
  text-decoration: none;
  &:hover {
    background-color: transparent;
    color: #333;
  }
  &:active {
    position: relative;
    top: 1px;
  }
  &:disabled {
    border: none;
    cursor: not-allowed;
    background-color: transparent;
    color: #777;
  }
`;

Stepper.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      component: PropTypes.element,
      isEvaluated: PropTypes.bool,
    })
  ).isRequired,
  onLastStep: PropTypes.func,
};

Stepper.defaultProps = {
  onLastStep: () => null,
};
