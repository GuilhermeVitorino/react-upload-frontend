import styled from 'styled-components';

export const Container = styled.div`
  background: #FFF;
  border-radius: 4px;
  display: flex;
  flex-flow: column nowrap;
  margin: 5% auto 0;
  padding-bottom: 20px;
  padding-top: 20px;
  width: 100%;
`;

export const Header = styled.h2`
  border-bottom: 1px solid #e8eaf6;
  color: #717271;
  display: flex;
  font-family: "Open Sans", sans-serif;
  font-size: 17px;
  margin-bottom: 20px;
  padding: 0 20px 20px;
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
    color: #717271;
    font-family: "Open Sans", sans-serif;
    font-size: 14px;
    flex: 1;

    p:not(:first-child) {
      color: #717271;
      padding-top: 10px;
    }
  }
`;
