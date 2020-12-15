import React from "react";
import { Button, ContainerButton } from './styles';

const Btn = ( { onClickBtn, btnText }) => (
    <ContainerButton>
        <Button onClick={() => onClickBtn()} > {btnText} </Button>   
    </ContainerButton>
);

export default Btn;
