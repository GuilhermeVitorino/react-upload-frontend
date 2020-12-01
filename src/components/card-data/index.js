import React, { Component } from "react";
import { Container, Header, DataList } from './styles'

const cardData = () => (
    <Container>
        <Header>Dados do Sinistro</Header>
        <DataList>
            <li>
                <p><strong>Apólice</strong></p>
                <p>0000000000</p>
            </li>
            <li>
                <p><strong>Sinistro</strong></p>
                <p>322355</p>
            </li>
            <li>
                <p><strong>CNPJ</strong></p>
                <p>00.000.000/0001-00</p>
            </li>
            <li>
                <p><strong>Nome</strong></p>
                <p>TESTE FINANCEIRO</p>
            </li>
        </DataList>
    </Container>
)

export default cardData;
