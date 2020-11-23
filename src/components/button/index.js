import React, { Component } from "react";
import { Button, ContainerButton } from './styles';

const Btn = ( { onClickBtn }) => (
    <ContainerButton>
        <Button onClick={() => onClickBtn()} > Anexar </Button>   
    </ContainerButton>
);

export default Btn;
