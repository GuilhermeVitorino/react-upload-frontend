import React, { Component } from "react";
import { FaEdit } from 'react-icons/fa';
import { BiShow } from 'react-icons/bi';
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
  ButtonView,
  ButtonDelete
} from "./styles";
import SimpleModal from "../modal2";

import {
  Magnifier,
  GlassMagnifier,
  SideBySideMagnifier,
  PictureInPictureMagnifier,
  MOUSE_ACTIVATION,
  TOUCH_ACTIVATION
} from "react-image-magnifiers";

const imageMimeType = [
  'image/jpeg',
  'image/pjpeg',
  'image/png',
  'image/gif',
  'application/doc',
  'application/ms-doc',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
]

const pdfMimeType = [
  'application/pdf'
]

const docMimeType = [
  'application/zip',
  'application/x-msi',
  'application/doc',
  'application/ms-doc',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
]

function toggleModal(file) {
  console.log(file.type);
  const overflow = document.querySelector('.overflow');
  const modal = document.querySelector('.modal');
  var image = document.querySelector('.image-file');

  if (file.type == 'application/pdf') {
    image = document.querySelector('.pdf-file');
    document.querySelector('.image-file').removeAttribute('src');
  } else {
    document.querySelector('.pdf-file').removeAttribute('src');
  }

  if (overflow.classList.length > 1 && overflow.classList.length > 1) {
    overflow.parentElement.classList.remove('active');
    overflow.classList.remove('active');
    modal.classList.remove('active');
    image.removeAttribute('src');

    return;
  }

  overflow.classList.add('active');
  modal.classList.add('active');
  image.setAttribute('src', file.url)
  overflow.parentElement.classList.add('active');
}

function toggleModal2(file) {
  console.log(file.type);
  const overflow = document.querySelector('.overflow');
  const modal = document.querySelector('.modal');
  var image = document.querySelector('.image-file');

  if (file.type == 'application/pdf') {
    image = document.querySelector('.pdf-file');
    document.querySelector('.image-file').removeAttribute('src');
  } else {
    document.querySelector('.pdf-file').removeAttribute('src');
  }

  if (overflow.classList.length > 1 && overflow.classList.length > 1) {
    overflow.parentElement.classList.remove('active');
    overflow.classList.remove('active');
    modal.classList.remove('active');
    image.removeAttribute('src');

    return;
  }

  overflow.classList.add('active');
  modal.classList.add('active');
  image.setAttribute('src', file.url)
  overflow.parentElement.classList.add('active');
}

function showMessage(file) {
  //console.log(file);
}

const FileViewer = ({ files, onDelete }) => (
  <Container>
    <Header>Documentos Anexados</Header>
    <ContainerCardViewDocument>
      {files.map((file, index) => {
        return (
          <CardViewDocument>
            <CardHeaderDocument>{file.name} / {file.type}</CardHeaderDocument>
            <CardImage onMouseOver={() => showMessage(file)} style={{ minHeight: "350px" }}>
              {imageMimeType.includes(file.type) && (
                <SideBySideMagnifier
                  switchSides={index % 2 == 1}
                  fillAvailableSpace={false}
                  imageSrc={file.url}
                  imageAlt={file.name}
                  className
                />
              )}
              {pdfMimeType.includes(file.type) && (
                <iframe width="100%" height="100%" src={file.url} />
              )}
              {docMimeType.includes(file.type) && (
                <iframe width="100%" height="100%" src={"https://view.officeapps.live.com/op/embed.aspx?src=" + file.url} width="100%" height="100%" />
              )}
            </CardImage>
            <CardActions>
              <SelectStatus>
                <div class="select">
                  <select>
                    <option selected>Status</option>
                    <option value="0">Válido</option>
                    <option value="1">Inválido</option>
                  </select>
                  <span class="focus"></span>
                  <RiArrowDownSLine />
                </div>
              </SelectStatus>
              <ButtonDelete onClick={() => onDelete(file.id, file.uploaded)}>
                <RiDeleteBin7Fill />
              </ButtonDelete>
              <ButtonEdit>
                <FaEdit />
              </ButtonEdit>
              <SimpleModal files={files} index={index} />
            </CardActions>
          </CardViewDocument>
        )
      })}
    </ContainerCardViewDocument>
  </Container>
);



export default FileViewer;