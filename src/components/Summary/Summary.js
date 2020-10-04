import React, { useContext } from 'react';
import styled from 'styled-components';
import PayloadContext from '../Subscription/PayloadContext';

function filterPeriod(periods, subscriptionLength, prop) {
  const period = periods.filter(
    p => p.subscriptionLength === subscriptionLength
  );
  const result = period.length > 0 ? period[0][prop] : '';
  return result;
}

export default function Summary() {
  const { payload } = useContext(PayloadContext);
  const {
    formData,
    periods,
    subscriptionLength,
    subscriptionType,
    total,
  } = payload;
  const lengthTitle = filterPeriod(periods, subscriptionLength, 'title');
  const discount = filterPeriod(
    periods,
    subscriptionLength,
    'discountPercentage'
  );
  return (
    <Container>
      <h2>Summary</h2>
      <div className='personal'>
        <div>
          {formData.firstName} {formData.surname}
        </div>
        <div>{formData.email}</div>
      </div>
      <div className='plan-summary'>
        <div>{subscriptionType.toUpperCase()} Plan</div>
        <div>{lengthTitle}</div>
      </div>
      <div className='discount'>
        {discount ? (
          <div>
            Discount <b>{discount}% OFF</b> applied.
          </div>
        ) : null}
      </div>
      <div className='to-pay'>
        <div className='price-box'>
          <div className='label'>You'll be charged</div>
          <div className='total label'>${total}</div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* max-width: 450px; */
  .plan-summary {
    background: #444;
    color: #fafafa;
    padding: 16px;
    margin: 24px 0;
  }
  .to-pay {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
  .price-box {
    display: flex;
    flex-direction: column;
    margin-top: 24px;
  }
  .total {
    font-size: 18px;
    font-weight: 700;
  }
  .label {
    text-align: right;
  }
  .personal {
    display: flex;
    justify-content: space-between;
  }
`;
