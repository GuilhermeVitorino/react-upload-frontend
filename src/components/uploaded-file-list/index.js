import React from "react";
import { MdError } from 'react-icons/md';
import Tooltip from 'react-tooltip-lite';
import { Container, Header, FileInfo, Preview, Footer } from './styles.js';
import './styles.css';
import { IconButton, TextField, Checkbox, FormControlLabel, FormGroup, Switch } from "@material-ui/core";
import { ReactComponent as PdfSVG } from "../../assets/pdf-icon.svg";
import { ReactComponent as WordSVG } from "../../assets/word-icon.svg";
import { ReactComponent as ExcelSVG } from "../../assets/excel-icon.svg"
import { ReactComponent as Mp4SVG } from "../../assets/mp4-icon.svg"
import SimpleModal from "../modal/index.js";
import { makeStyles } from '@material-ui/core/styles';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

const useStyles = makeStyles((theme) => ({
  input: {
    marginLeft: '20px',
    marginTop: '20px',
    flex: 1,
  }
}));

export default function FileList({ files, onChangeInterruptor, handleFilesFilter, handleFileCheck, handleSelectAll, selectAll }) {

  const classes = useStyles();

  function getSelectedFiles(filesArray) {
    const temp = [];
    filesArray.forEach((f) => {
      if (f.checked)
        temp.push(f);
    });
    return temp;
  }

  const wordDocumentMimeType = [
    'application/zip',
    'application/x-msi',
    'application/doc',
    'application/ms-doc',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ]

  const excelDocumentMimeType = [
    'application/excel',
    'application/x-msi',
    'application/vnd.ms-excel',
    'application/x-excel',
    'application/x-msexcel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ]

  const imageMimeType = [
    'image/jpeg',
    'image/pjpeg',
    'image/png',
    'image/gif'
  ]

  function handleListFileChanges(e) {
    e.target.checked = false;
    handleSelectAll(e);
    handleFilesFilter(e);
  }

  function downloadFile(file) {

    fetch(file.url, {
      method: 'GET',
      headers: {
        'Content-Type': file.type,
      },
    })
      .then((response) => response.blob())
      .then((blob) => {

        const url = window.URL.createObjectURL(
          new Blob([blob]),
        );

        const link = document.createElement('a');
        
        link.href = url;
        link.setAttribute(
          'download',
          file.name,
        );

        document.body.appendChild(link);

        link.click();
        link.parentNode.removeChild(link);
      });
  }

  return (
    <Container>
      <Header>Lista de Documentos</Header>
      <TextField
        onChange={handleListFileChanges}
        className={classes.input}
        id="standard-basic"
        label="Filtrar documentos" />
      {files.length > 0 && (
        <ul>
          <li>
            <FormControlLabel
              control={
                <Checkbox checked={selectAll} onChange={(e) => handleSelectAll(e.target.checked)} />
              }
              label="Selecionar todos"
            />
          </li>
          {files.map((uploadedFile, index) => (
            <li key={uploadedFile.id}>
              <FileInfo>

                <Checkbox checked={uploadedFile.checked === true} onChange={(e) => handleFileCheck(uploadedFile.id, e.target.checked)} />

                <Tooltip
                  content={(
                    <div>
                      <ul className="tip-list">
                        <li>Nome: {uploadedFile.name}</li>
                        <li>Tipo: {uploadedFile.type}</li>
                        <li>Tamanho: {uploadedFile.readableSize}</li>
                        <li>Data de criação: {uploadedFile.createdAt}
                        </li>
                      </ul>
                    </div>
                  )}
                  direction="right"
                  tagName="span"
                  className="target"
                  tipContentClassName=""
                >

                  {imageMimeType.includes(uploadedFile.type) && (
                    <Preview src={uploadedFile.preview}>
                      <SimpleModal files={[uploadedFile]} index={0} btnType="hidden" />
                    </Preview>
                  )}

                  {(uploadedFile.type === "application/pdf") && (
                    <Preview>
                      <PdfSVG>
                        <SimpleModal files={[uploadedFile]} index={0} btnType="hidden" />
                      </PdfSVG>
                    </Preview>
                  )}

                  {(uploadedFile.type === "video/mp4") && (
                    <Preview>
                      <Mp4SVG>
                        <SimpleModal files={[uploadedFile]} index={0} btnType="hidden" />
                      </Mp4SVG>
                    </Preview>
                  )}

                  {wordDocumentMimeType.includes(uploadedFile.type)
                    && uploadedFile.name.includes("doc", "docx")
                    && (
                      <Preview>
                        <WordSVG>
                          <SimpleModal files={[uploadedFile]} index={0} btnType="hidden" />
                        </WordSVG>
                      </Preview>
                    )}

                  {excelDocumentMimeType.includes(uploadedFile.type)
                    && uploadedFile.name.includes("xls", "xlsx")
                    && (
                      <Preview>
                        <ExcelSVG>
                          <SimpleModal files={[uploadedFile]} index={0} btnType="hidden" />
                        </ExcelSVG>
                      </Preview>
                    )}

                </Tooltip>
                <div>
                    <strong>{uploadedFile.name} - ({uploadedFile.status === '' ? 'sem status' : uploadedFile.status})</strong>
                </div>
              </FileInfo>
              <div>


                <strong>{uploadedFile.createdAt}</strong>


                <IconButton onClick={() => downloadFile(uploadedFile)} title="baixar documento">
                  <CloudDownloadIcon />
                </IconButton>

                {uploadedFile.error &&
                  <MdError size={24} color="#e57878" />
                }

              </div>
            </li>
          ))}
        </ul>
      )}
      <Footer>
        <FormGroup>
          <FormControlLabel
            labelPlacement="start"
            control={<Switch defaultChecked={false} onChange={e => onChangeInterruptor(e)} />}
            label="Exibir lista detalhada"
          />
        </FormGroup>
        {files.filter(f => f.checked === true).length > 0 && (
          <SimpleModal files={getSelectedFiles(files)} index={0} btnType="text" />
        )}
      </Footer>
    </Container>
  )
};
