import React, { useState } from 'react';
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

export default function SimpleModal({ files, index, btnType }) {

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

  const [fileIndex, setFileIndex] = useState(index);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
    console.log(files)
  };

  const handleClose = () => {
    setOpen(false);
  };

  const hasNext = () => {
    return (files.length > fileIndex + 1)
  };

  const next = () => {
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
            <img src={file.url} alt={file.name} />
          )}
          {pdfMimeType.includes(file.type) && (
            <iframe src={file.url + '?#zoom=100%&scrollbar=0&toolbar=0&navpanes=0'} title={file.name} width="100%" height="95%"></iframe>
          )}
          {msDocumentMimeType.includes(file.type) && (
            <iframe src={"https://view.officeapps.live.com/op/embed.aspx?src=" + file.url} title={file.name} width="100%" height="100%" frameborder="0" />
          )}
        </ContainerBody>
      </div>
    </Container>
  )

  return (
    <div>
      {btnType === 'text' && (
        <ButtonView onClick={handleOpen}>
          visualizar
        </ButtonView>
      )}
      {btnType === 'icon' && (
        <ButtonView onClick={handleOpen}>
          <BiShow />
        </ButtonView>
      )}
      {btnType === 'hidden' && (
        <ButtonView style={{backgroundColor: 'transparent'}} onClick={handleOpen}/>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
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
              {files.map(f => {

                      if (imageMimeType.includes(f.type)) {
                        return <img src={f.url} alt={f.name} />
                      }

                      if (pdfMimeType.includes(f.type)) {
                        return <iframe src={f.url + '?#zoom=100%&scrollbar=0&toolbar=0&navpanes=0'} title={f.name} width="100%" height="100%" scrolling="no" />
                      }

                      if (msDocumentMimeType.includes(f.type)) {
                        return <iframe src={"https://view.officeapps.live.com/op/embed.aspx?src=" + f.url} title={f.name} width="100%" height="100%" frameborder="0" scrolling="no"/>
                      }
                  }
               )}
            </ContainerBody>
          </div>
        </Container>
      </Modal>
    </div>
  );
}