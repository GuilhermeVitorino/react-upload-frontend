import React, { useState } from "react";
import { MdError } from 'react-icons/md';
import Tooltip from 'react-tooltip-lite';
import { Container, Header, FileInfo, Preview, Footer } from './styles.js';
import './styles.css';
import { IconButton, TextField, Checkbox, FormControlLabel, FormGroup, Switch } from "@material-ui/core";
import { ReactComponent as PdfSVG } from "../../assets/pdf-icon.svg";
import { ReactComponent as WordSVG } from "../../assets/word-icon.svg";
import { ReactComponent as ExcelSVG } from "../../assets/excel-icon.svg"
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

export default function FileList({ files, onChangeInterruptor, handleFilesFilter }) {

  const classes = useStyles();

  const [booleanFilesArray, setBooleanFilesArray] = useState(files.map(f => {
    return false;
  }));

  const [selectAll, setSelectAll] = useState(false);

  function handleFileCheck(e, index) {
    const newState = [...booleanFilesArray];
    newState[index] = e.target.checked;
    verfyAllChecked(newState);
    setBooleanFilesArray(newState);
    console.log(getSelectedFiles(newState));
  }

  function handleSelectAll(e) {
    const files = [...booleanFilesArray];
    const newState = files.map(item => {
      return e.target.checked;
    })
    setBooleanFilesArray(newState);
    setSelectAll(e.target.checked);
  }

  function verfyAllChecked(fileList) {
    const checkeds = fileList.filter(f => f === true);

    if (checkeds.length === files.length) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }

  function getSelectedFiles(array) {
    const temp = [];
    array.forEach((item, index) => {
      if (item === true && files[index] !== undefined)
        temp.push(files[index]);
    });
    return temp;
  }

  const getDataFromURL = (url) => {
    fetch(url)
    .then( res => res.blob() )
    .then( blob => {
      var file = window.URL.createObjectURL(blob);
      window.location.assign(file);
    });
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

  function downloadFile(file){

    fetch(file.url, {
      method: 'GET',
      headers: {
        'Content-Type': file.type,
      },
    })
    .then((response) => response.blob())
    .then((blob) => {
      // Create blob link to download
      const url = window.URL.createObjectURL(
        new Blob([blob]),
      );
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
        'download',
        file.name,
      );

      // Append to html link element page
      document.body.appendChild(link);

      // Start download
      link.click();

      // Clean up and remove the link
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
                <Checkbox checked={selectAll} onChange={(e) => handleSelectAll(e)}/>
              }
              label="Selecionar todos"
            />
          </li>
          {files.map((uploadedFile, index) => (
            <li key={uploadedFile.id}>
              <FileInfo>
                
                <Checkbox checked={booleanFilesArray[index]} onChange={(e) => handleFileCheck(e, index)} />
                
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

                {(uploadedFile.type == "application/pdf") && (
                  <Preview>
                    <PdfSVG>
                      <SimpleModal files={[uploadedFile]} index={0} btnType="hidden" />
                    </PdfSVG>
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
                  <strong>{uploadedFile.name}</strong>
                </div>
              </FileInfo>
              <div>

                
                  <strong>{uploadedFile.createdAt}</strong>
                
                
                <IconButton onClick={() => downloadFile(uploadedFile)} title="baixar documento">
                  <CloudDownloadIcon/>
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
        {booleanFilesArray.filter((f, index) => f && files[index] !== undefined ).length > 0 && (
          <SimpleModal files={getSelectedFiles(booleanFilesArray)} index={0} btnType="text" />
        )}
      </Footer>
    </Container>
  )
};
