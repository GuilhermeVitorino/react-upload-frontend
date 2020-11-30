import React, { Component } from "react";

import DropZone from 'react-dropzone';

import { FaUpload } from 'react-icons/fa';

import { RiArrowDownSLine } from 'react-icons/ri';

import {
  Container,
  DropContainer,
  HeaderDropContainer,
  UploadMessage,
  InfoDocument
} from "./styles";

export default class Uploaded extends Component {

  render() {
    return (
      <Container>
        <HeaderDropContainer>Anexar Documentos</HeaderDropContainer>
      </Container >
    )
  }
}
