import React, { Component } from "react";

import DropZone from 'react-dropzone';

import {FaUpload} from 'react-icons/fa';

import { RiArrowDownSLine } from 'react-icons/ri';

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
                          application/vnd.openxmlformats-officedocument.wordprocessingml.document
                        "
                onDropAccepted={onUpload} >
        {({ getRootProps, getInputProps, isDragActive, isDragReject }) =>(
          <Container>
            <HeaderDropContainer>Anexar Documentos</HeaderDropContainer>
            <InfoDocument>
              <div class="select">
                <select>
                  <option selected>Tipo de Documento</option>
                  <option value="0">RG</option>
                  <option value="1">CPF</option>
                  <option value="2">CNH</option>
                </select>
                <span class="focus"></span>
                <RiArrowDownSLine />
              </div>
              <div class="select">
                <select>
                  <option selected>Restrição do Documento</option>
                  <option value="0">Todos</option>
                  <option value="1">Institucional</option>
                  <option value="2">Restrito</option>
                </select>
                <span class="focus"></span>
                <RiArrowDownSLine />
              </div>
            </InfoDocument>
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
