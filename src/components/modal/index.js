import React, { Component } from "react";
import { GrNext, GrPrevious } from 'react-icons/gr';
import {
  Container,
  ContainerHeader,
  Header,
  ButtonLeft,
  ButtonRight,
  ButtonClose,
  ContainerBody
} from "./styles";

function toggleModal() {
  const overflow = document.querySelector('.overflow');
  const modal = document.querySelector('.modal');

  if (overflow.classList.length > 1 && overflow.classList.length > 1) {
    overflow.parentElement.classList.remove('active');
    overflow.classList.remove('active');
    modal.classList.remove('active');
    
    return;
  }
  
  overflow.parentElement.classList.add('active')
  overflow.classList.add('active');
  modal.classList.add('active');
}

const Modal = () => (
  <Container>
    <div class="overflow"></div>
    <div class="modal">
      <ContainerHeader>
        <Header>Visualização do Documento</Header>
        <ButtonLeft>
          <GrPrevious />
        </ButtonLeft>
        <ButtonRight>
          <GrNext />
        </ButtonRight>
        <ButtonClose onClick={ () => toggleModal()}>
          Fechar
        </ButtonClose>
      </ContainerHeader>
      <ContainerBody>
        <img class="image-file" />
        <embed class="pdf-file"/>   
      </ContainerBody>
    </div>
  </Container> 
);

export default Modal;
