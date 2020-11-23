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
                <p><strong>CNPJ</strong></p>
                <p>00.000.000/0001-00</p>
            </li>
            <li>
                <p><strong>Razão Social</strong></p>
                <p>TESTE FINANCEIRO</p>
            </li>
            <li>
                <p><strong>LMG</strong></p>
                <p>R$ 100.000,00</p>
            </li>
            <li>
                <p><strong>Reserva Indenização</strong></p>
                <p>R$ 28.414,75</p>
            </li>
            <li>
                <p><strong>Reserva Despesa</strong></p>
                <p>R$ 0,00</p>
            </li>
        </DataList>
    </Container>
)

export default cardData;
