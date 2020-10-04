import React, { useContext } from 'react';
import styled from 'styled-components';
import PayloadContext from '../Subscription/PayloadContext';
import StepperContext from '../Stepper/StepperContext';

function getStyle(subscriptionType, selectedType) {
  return {
    background: subscriptionType === selectedType ? '#444' : 'transparent',
    color: subscriptionType === selectedType ? '#fafafa' : '#444',
  };
}

export default function SubscriptionType() {
  const handleEvaluate = useContext(StepperContext);
  const { payload, setPayload } = useContext(PayloadContext);
  const { subscriptionType, basePrices } = payload;

  const handleSelect = type => {
    handleEvaluate(true);
    setPayload({
      ...payload,
      subscriptionType: type,
      monthlyPrice: basePrices[type],
    });
  };

  return (
    <Container>
      <h2>Subscription Type</h2>
      <PlanBox
        onClick={() => handleSelect('personal')}
        style={getStyle(subscriptionType, 'personal')}
      >
        <div>
          <Title>Personal</Title>
          <Description>
            Bacon ipsum dolor amet pork belly meatloaf picanha ham filet mignon
            ball tip chislic kevin, frankfurter jowl shankle strip steak. Swine
            t-bone meatloaf.
          </Description>
        </div>
        <Price>${payload.basePrices ? basePrices.personal : 0.0}/mo.</Price>
      </PlanBox>
      <PlanBox
        onClick={() => handleSelect('professional')}
        style={getStyle(subscriptionType, 'professional')}
      >
        <div>
          <Title>Professional</Title>
          <Description>
            Shank tenderloin pancetta drumstick meatball prosciutto. Chislic
            alcatra beef, pork chop pork loin spare ribs pancetta prosciutto
            venison. Pancetta hamburger ball tip, turkey.
          </Description>
        </div>
        <Price>${payload.basePrices ? basePrices.professional : 0.0}/mo.</Price>
      </PlanBox>
      <PlanBox
        onClick={() => handleSelect('enterprise')}
        style={getStyle(subscriptionType, 'enterprise')}
      >
        <div>
          <Title>Enterprise</Title>
          <Description>
            Alcatra cow meatloaf shoulder t-bone drumstick tail capicola.
            Turducken kevin brisket, tri-tip drumstick flank capicola pig
            pastrami frankfurter rump pork belly cupim.
          </Description>
        </div>
        <Price>${payload.basePrices ? basePrices.enterprise : 0.0}/mo.</Price>
      </PlanBox>
    </Container>
  );
}

const Container = styled.div``;

const PlanBox = styled.div`
  display: flex;
  font-size: 14px;
  align-items: center;
  cursor: pointer;
  border: 2px solid transparent;
  box-sizing: border-box;
  padding: 8px;
  margin-bottom: 12px;
  &:hover {
    border: 2px solid #444;
  }
  @media (max-width: 360px) {
    font-size: 12px;
  }
`;
const Title = styled.div`
  font-weight: bold;
  margin-bottom: 4px;
`;

const Description = styled.div`
  font-weight: 300;
  padding-right: 40px;
  @media (max-width: 360px) {
    font-size: 12px;
    padding-right: 16px;
  }
`;

const Price = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 16px;
  flex-basis: 15%;
`;
