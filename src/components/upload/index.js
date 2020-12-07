import React, { Component } from "react";

import DropZone from 'react-dropzone';

import {FaUpload} from 'react-icons/fa';

import { RiArrowDownSLine } from 'react-icons/ri';
import ComboBoxDocumento from "../name-combo-box";

import {
  Container,
  DropContainer,
  HeaderDropContainer,
  UploadMessage,
  InfoDocument
} from "./styles";

export default class Upload extends Component {

  renderDragMessage = (isDragActive, isDragReject) => {
      if (!isDragActive) {
          return <UploadMessage>
            <FaUpload class="icon-upload" />
            <p>Selecione um <strong>arquivo</strong></p>
            <p>Documentos permitidos: <strong>.xls, .xlsx, .pdf, .jpeg, .png, .jpg, .doc, .docx</strong></p>
          </UploadMessage>
      }

      if (isDragReject) {
        return <UploadMessage type="error">Arquivo não suportado</UploadMessage>
      }

      return <UploadMessage type="success">Solte os arquivos aqui</UploadMessage>
  }

  render() {

    const { onUpload } = this.props;

    return (
      <DropZone accept="  image/*,
                          application/pdf, 
                          application/doc,
                          application/docx,
                          application/ms-doc,
                          application/msword,
                          application/vnd.openxmlformats-officedocument.wordprocessingml.document,
                          application/excel,
                          application/vnd.ms-excel,
                          application/x-excel,
                          application/x-msexcel,
                          application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
                        "
                onDropAccepted={onUpload} >
        {({ getRootProps, getInputProps, isDragActive, isDragReject }) =>(
          <Container>
            <HeaderDropContainer>Anexar Documentos</HeaderDropContainer>
            <ComboBoxDocumento/>
            <DropContainer
            { ...getRootProps()}
            isDragActive={isDragActive}
            isDragReject={isDragReject}
            >
              <input {...getInputProps()} />
              {this.renderDragMessage(isDragActive, isDragReject)}
            </DropContainer>        
          </Container>
        )
        }
      </DropZone>
    );
  }
}
