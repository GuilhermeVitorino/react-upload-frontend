import styled from 'styled-components';

export const Container = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
    opacity: 0;
    transition: opacity 400ms ease-in;
    
    &.active {
        opacity: 1;
    }
    
    .overflow {
        background: rgba(0,0,0,0.8);
        bottom: 0;
        display: none;
        left: 0;
        opacity: 0;
        pointer-events: none;
        position: fixed;
        right: 0;
        top: 0;
        z-index: 2;
        
        &.active {
            display: block;
            opacity: 1;
        }
    }

    .modal {
        background-color: #fff;
        border-radius: 4px;
        border-top: 4px solid #c02;
        display: none;
        max-width: 90%;
        opacity: 0;
        padding: 20px 0;
        position: fixed;
        top: 100px;
        width: auto;
        z-index: 3;
        
        &.active {
            display: block;
            opacity: 1;
        }
    }
`;

export const ContainerHeader = styled.div`
    align-items: center;
    border-bottom: 1px solid #e8eaf6;
    display: flex;
    flex-flow: row nowrap;
    padding: 0 20px 20px;
`;

export const Header = styled.h2`
    color: #717271;
    font-family: "Open Sans", sans-serif;
    font-size: 17px;
    width: 100%;
`;

const Button = styled.button`
    background-color: #FF0547;
    border: none;
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
    display: flex;
    font-family: "Open Sans", sans-serif;
    font-size: 16px;
    font-weight: bold;
    height: 38px;
    padding: 10px;
    text-decoration: none;

    &:hover {
        background-color: #FA2D63;
    }

    svg {
        polyline {
            stroke: #fff;
        }
    }
`;

export const ButtonLeft = styled(Button)`
    margin-right: 10px;
`;

export const ButtonRight = styled(Button)`
    margin-right: 10px;
`;

export const ButtonClose = styled(Button)``;

export const ContainerBody = styled.div`
    display: flex;
    justify-content: center;
    height: 100%;
    max-height: 500px;
    overflow: auto;
    margin: 20px;
`;
