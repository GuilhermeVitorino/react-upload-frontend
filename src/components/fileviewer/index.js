import React from "react";
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { RiArrowDownSLine } from 'react-icons/ri';
import {
  Container,
  Header,
  ContainerCardViewDocument,
  CardViewDocument,
  CardHeaderDocument,
  CardImage,
  CardActions,
  SelectStatus,
  ButtonEdit,
  ButtonDelete
} from "./styles";
import SimpleModal from "../modal";

import { SideBySideMagnifier } from "react-image-magnifiers";

const imageMimeType = [
  'image/jpeg',
  'image/pjpeg',
  'image/png',
  'image/gif'
]

const pdfMimeType = [
  'application/pdf',
  'video/mp4'
]

const msDocumentMimeType = [
  'application/zip',
  'application/x-msi',
  'application/doc',
  'application/ms-doc',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/excel',
  'application/vnd.ms-excel',
  'application/x-excel',
  'application/x-msexcel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
]

const FileViewer = ({ files, onDelete, handleUpdateStatus }) => (
  <Container>
    <Header>Documentos Anexados</Header>
    <ContainerCardViewDocument>
      {files.map((file, index) => {
        return (
          <CardViewDocument>
            <CardHeaderDocument>{file.name}</CardHeaderDocument>
            <CardImage style={{ minHeight: "350px" }}>
              
              {imageMimeType.includes(file.type) && (
                <SideBySideMagnifier
                  switchSides={index % 2 === 1}
                  fillAvailableSpace={false}
                  imageSrc={file.url}
                  imageAlt={file.name}
                />
              )}

              {pdfMimeType.includes(file.type) && (
                <iframe title={file.name} src={file.url} width="100%" height="100%" />
              )}

              {msDocumentMimeType.includes(file.type) && (
                <iframe title={file.name} src={"https://view.officeapps.live.com/op/embed.aspx?src=" + file.url} width="100%" height="100%" />
              )}

            </CardImage>
            <CardActions>
              <SelectStatus>
              <div className="select">
                <select defaultValue={file.status} onChange={(event) => handleUpdateStatus(event, file.id)}>
                  <option value="" disabled selected>Status</option>
                  <option value="Não recebido">Não recebido</option>
                  <option value="Recebido">Recebido</option>
                  <option value="Não é necessário">Não é necessário</option>
                  <option value="Eliminado">Eliminado</option>
                  <option value="Inválido">Inválido</option>
                  <option value="Criado">Criado</option>
                  <option value="E-Ticket">E-Ticket</option>
                </select>
                <span className="focus"></span>
                <RiArrowDownSLine />
              </div>
              </SelectStatus>
              <ButtonDelete onClick={() => onDelete(file.id, file.uploaded)}>
                <RiDeleteBin7Fill />
              </ButtonDelete>
              <ButtonEdit>
                <FaEdit />
              </ButtonEdit>
              <SimpleModal files={files} index={index} btnType={"icon"}/>
            </CardActions>
          </CardViewDocument>
        )
      })}
    </ContainerCardViewDocument>
  </Container>
);

export default FileViewer;
