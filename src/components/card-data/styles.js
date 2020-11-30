import styled from 'styled-components';

export const Container = styled.div`
  background: #FFF;
  border: 0 solid transparent;
  box-shadow: 0 .5rem 1rem 0 rgba(44,51,73,.1);
  color: #192038;
  border-radius: .25rem;
  font-family: Open Sans,sans-serif
  font-size: .9375rem;
  font-weight: 400;
  line-height: 1.25rem;
  margin-bottom: 1.875rem;

  display: flex;
  flex-flow: column nowrap;
  margin: 5% auto 0;
  padding-bottom: 20px;
  --padding-top: 20px;
  width: 100%;
`;

export const Header = styled.h2`
  border-bottom: 1px solid #edf1f7;
  color: #192038;
  display: flex;
  font-family: "Open Sans", sans-serif;
  font-size: .9375rem;
  margin-bottom: 20px;
  padding: 1rem 1.25rem;
  width: 100%;
`;

export const DataList = styled.ul`
  display: flex;
  padding-left: 20px;
  padding-right: 20px;
  list-style: none;
  flex-flow: row wrap;
  width: 100%;
  
  li {
    color: #192038;
    font-family: "Open Sans", sans-serif;
    font-size: 14px;
    flex: 1;

    p:not(:first-child) {
      color: #192038;
      padding-top: 10px;
    }
  }
`;
