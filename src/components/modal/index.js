import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { GrNext, GrPrevious } from 'react-icons/gr';
import { BiShow } from 'react-icons/bi';
import {
  Container,
  ContainerHeader,
  Header,
  ButtonLeft,
  ButtonRight,
  ButtonClose,
  ButtonView,
  ContainerBody
} from "./styles";

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

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal({ files, index }) {

  const [fileIndex, setFileIndex] = useState(index);
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const hasNext = () => {
    return (files.length > fileIndex + 1)
  };

  const next = () => {
    console.log('next');
    if (hasNext()) {
      setFileIndex(fileIndex + 1);
    }
  };

  const hasPrevious = () => {
    return (fileIndex !== 0)
  };

  const previous = () => {
    if (hasPrevious()) {
      setFileIndex(fileIndex - 1);
    }
  };

  const file = files[fileIndex];

  const body = (
    <Container>
      <div class="overflow"></div>
      <div class="modal">
        <ContainerHeader>
          <Header>Visualização do Documento</Header>
          <ButtonLeft onClick={previous} disabled={!hasPrevious()}>
            <GrPrevious />
          </ButtonLeft>
          <ButtonRight onClick={next} disabled={!hasNext()}>
            <GrNext />
          </ButtonRight>
          <ButtonClose onClick={handleClose}>
            Fechar
          </ButtonClose>
        </ContainerHeader>
        <ContainerBody>        
          {imageMimeType.includes(file.type) && (
            <img src={file.url} />
          )}
          {pdfMimeType.includes(file.type) && (
            <iframe src={file.url + '?#zoom=100%&scrollbar=0&toolbar=0&navpanes=0'} width="100%" height="95%"></iframe>
          )}
          {msDocumentMimeType.includes(file.type) && (
            <iframe width="100%" height="100%" src={"https://view.officeapps.live.com/op/embed.aspx?src=" + file.url} frameborder="0"/>
          )}
        </ContainerBody>
      </div>
    </Container>
  )

  return (
    <div>
      <ButtonView onClick={handleOpen}>
        <BiShow />
      </ButtonView>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}