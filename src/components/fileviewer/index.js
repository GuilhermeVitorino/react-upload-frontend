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
  'image/gif'
]

const pdfMimeType = [
  'application/pdf'
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

const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, {type: contentType});
  return blob;
}

const contentType = 'application/excel';
const b64Data = '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';

const blob = b64toBlob(b64Data, contentType);
const blobUrl = URL.createObjectURL(blob);

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
              {msDocumentMimeType.includes(file.type) && (
                <iframe width="100%" height="100%" src={"https://view.officeapps.live.com/op/embed.aspx?src=" + blobUrl} width="100%" height="100%" />
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
