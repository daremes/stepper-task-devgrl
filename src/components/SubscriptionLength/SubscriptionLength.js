import React, { useContext } from "react";
import styled from "styled-components";
import PayloadContext from "../Subscription/PayloadContext";
import StepperContext from "../Stepper/StepperContext";
import calculatePrice from "./calculatePrice";
import Plan from "./Plan";

export default function SubscriptionLength() {
  const handleEvaluate = useContext(StepperContext);
  const { payload, setPayload } = useContext(PayloadContext);
  const { subscriptionLength, monthlyPrice, periods } = payload;

  const handleSelect = (length, discount) => {
    const total = calculatePrice(monthlyPrice, length, discount);
    setPayload({
      ...payload,
      subscriptionLength: length,
      total,
    });
    handleEvaluate(true);
  };

  return (
    <Container>
      <h2>Subscription Length</h2>
      {periods.map((plan, i) => (
        <Plan
          key={`${plan.title}-${i}`}
          handleSelect={handleSelect}
          subscriptionLength={subscriptionLength}
          thisPlanLength={plan.subscriptionLength}
          monthlyPrice={monthlyPrice}
          discountPercentage={plan.discountPercentage}
          title={plan.title}
          description={plan.description}
        />
      ))}
    </Container>
  );
}

const Container = styled.div``;
