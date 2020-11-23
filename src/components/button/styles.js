import styled from 'styled-components';

export const Button = styled.button`
    background-color: #FF0547;
    border: none;
    border-radius: 4px;
    color: white;
    cursor: pointer;
    display: flex;
    font-family: "Open Sans", sans-serif;
    font-size: 16px;
    font-weight: bold;
    margin-right: 20px;
    margin-top: 10px;
    padding: 10px;
    text-decoration: none;

    &:hover {
        background-color: #FA2D63;
    }
`;

export const ContainerButton = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
    width: 100%;
`;
