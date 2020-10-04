import React from 'react';
import styled from 'styled-components';
import calculatePrice from './calculatePrice';

function getStyle(subscriptionType, selectedType) {
  return {
    background: subscriptionType === selectedType ? '#444' : 'transparent',
    color: subscriptionType === selectedType ? '#fafafa' : '#444',
  };
}

export default function Plan({
  handleSelect,
  subscriptionLength,
  thisPlanLength,
  monthlyPrice,
  discountPercentage,
  title,
  description,
}) {
  const regularPrice = calculatePrice(monthlyPrice, thisPlanLength, 0);
  const discountedPrice = calculatePrice(
    monthlyPrice,
    thisPlanLength,
    discountPercentage
  );

  return (
    <PlanBox
      onClick={() => handleSelect(thisPlanLength, discountPercentage)}
      style={getStyle(subscriptionLength, thisPlanLength)}
    >
      <div className='flex-85'>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </div>
      <Price>
        {discountPercentage ? (
          <div className='discount-box'>
            <div className='discount-amount'>{discountPercentage}% OFF</div>
            <div className='discount-oldprice'>${regularPrice}</div>
          </div>
        ) : null}
        <div className='price'>${discountedPrice}</div>
      </Price>
    </PlanBox>
  );
}

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
  .flex-85 {
    flex-basis: 66.6666%;
  }
`;
const Title = styled.div`
  font-weight: bold;
  margin-bottom: 4px;
  @media (max-width: 416px) {
    font-size: 12px;
  }
`;

const Description = styled.div`
  font-weight: 300;
  padding-right: 40px;
  @media (max-width: 416px) {
    padding-right: 8px;
    font-size: 12px;
  }
`;

const Price = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 16px;
  flex-basis: 33.3333%;
  .discount-box {
    padding: 0 16px;
    font-size: 13px;
    text-align: right;
    @media (max-width: 416px) {
      padding: 0;
      font-size: 10px;
    }
  }
  .discount-amount {
    font-weight: 700;
    min-width: 52px;
  }
  .price {
    align-self: center;
    margin-left: 16px;
    text-align: right;
    width: 80px;
    @media (max-width: 416px) {
      width: 100%;
      margin-left: 8px;
    }
  }
  .discount-oldprice {
    text-decoration: line-through;
  }
`;
