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

export const ContainerCardViewDocument = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    padding: 0 20px 20px;
`;

export const CardViewDocument = styled.div`
    border: 1px solid #e8eaf6;
    border-radius: 4px;
    box-shadow: 0px 5px 10px 0 #e8eaf6;
    margin-bottom: 30px;
    width: 48%;
    --height: 100%;
    height: 530px;
`;

export const CardHeaderDocument = styled.h2`
    border-bottom: 1px solid #e8eaf6;
    color: #717271;
    display: flex;
    font-family: "Open Sans", sans-serif;
    font-size: 17px;
    margin-bottom: 20px;
    padding: 20px;
    width: 100%;
`;

export const CardImage = styled.div`
    background-image: url(${props => props.src});
    max-width: 100%;
    --overflow: auto;
    margin: 20px;
    max-height: 350px;
    height: 100%;

    * > img {
      width: 38%;
    }

`

export const CardActions = styled.div`
    border-top: 1px solid #e8eaf6;    
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
    margin-top: 20px;
    padding: 20px;
`;

export const SelectStatus = styled.div`
    display: flex;
    margin-right: 10px;
    width: 20%;

    select {
        appearance: none;
        background-color: transparent;
        border: none;
        cursor: inherit;
        font-family: inherit;
        font-size: inherit;
        line-height: inherit;
        margin: 0;
        outline: none;
        padding: 0 1em 0 0;
        width: 100%;
        z-index: 1;

        &::-ms-expand {
            display: none;
        }
    }

    .select {
        align-items: center;
        background-color: rgba(232, 234, 246, 0.6);
        border: 1px solid #e8eaf6;
        border-radius: 4px;
        color: #717271;
        cursor: pointer;
        display: grid;
        font-family: "Open Sans", sans-serif;
        font-size: 12px;
        font-weight: bold;
        grid-template-areas: "select";
        line-height: 1.1;
        padding: 8px;
        position: relative;
        width: 100%;

        select,
        &::after {
            grid-area: select;
        }
    }

    select:focus + .focus {
        border: 2px solid #c02;
        border-radius: inherit;
        bottom: -1px;
        left: -1px;
        position: absolute;
        right: -1px;
        top: -1px;
    }

    svg {
        font-size: 18px;
        justify-self: end;
        position: absolute;
        right: 5px;
    }
`;

const Button = styled.button`
    background-color: #FF0547;
    border: none;
    border-radius: 4px;
    color: white;
    cursor: pointer;
    display: flex;
    font-family: "Open Sans", sans-serif;
    font-size: 16px;
    font-weight: bold;
    padding: 10px;
    text-decoration: none;

    &:hover {
        background-color: #FA2D63;
    }
`;

export const ButtonEdit = styled(Button)`
    margin-right: 10px;
`;

export const ButtonDelete = styled(Button)`
    margin-right: 10px;
`;

export const ButtonView = styled(Button)``;

export const Preview = styled.div`
    width: 36px;
    height: 36px;
    border-radius: 5px;
    background-image: url(${props => props.src});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50%, 50%;
    margin-right: 10px;
`;
