import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import PayloadContext from './PayloadContext';
import Stepper from '../Stepper';
import SubscriptionType from '../SubscriptionType';
import SubscriptionLength from '../SubscriptionLength';
import PersonalInfo from '../PersonalInfo';
import Summary from '../Summary';
import mockApi from '../../mockApi';
import SVGloader from '../../loader.svg';
// import { basePrices, periods } from "../../mockData";

export default function Subscription() {
  const [payload, setPayload] = useState({});
  const history = useHistory();
  const [isLoading, setLoading] = useState(true);

  const stepsOptions = [
    { name: 'Type', component: <SubscriptionType />, isEvaluated: false },
    { name: 'Length', component: <SubscriptionLength />, isEvaluated: false },
    { name: 'Details', component: <PersonalInfo />, isEvaluated: false },
    { name: 'Summary', component: <Summary />, isEvaluated: true },
  ];

  useEffect(() => {
    async function fetchData() {
      const result = await mockApi('GET');
      return result;
    }
    fetchData().then(data => {
      const { basePrices, periods } = data;
      setPayload(p => ({ ...p, basePrices, periods }));
      setLoading(false);
    });
  }, []);

  const handleSubscribe = () => {
    setLoading(true);
    mockApi('POST', payload).then(res => {
      console.log(res.payload);
      setLoading(false);
      history.push('/thankyou');
    });
  };

  return (
    <Container>
      {!isLoading ? (
        <PayloadContext.Provider value={{ payload, setPayload }}>
          <div className='page-title'>
            <h1>Subscription</h1>
          </div>
          <Stepper options={stepsOptions} onLastStep={handleSubscribe} />
        </PayloadContext.Provider>
      ) : (
        <Loader>
          <img src={SVGloader} alt='Loading' />
        </Loader>
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 1192px;
`;

const Loader = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  img {
    width: 64px;
  }
`;
