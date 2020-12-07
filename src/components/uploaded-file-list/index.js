import React, { useState, useEffect } from "react";
import { CircularProgressbar } from 'react-circular-progressbar';
import { MdCheckCircle, MdError, MdLink } from 'react-icons/md';
import Tooltip from 'react-tooltip-lite';
import { Container, Header, FileInfo, Preview, Footer } from './styles.js';
import './styles.css';
import { Checkbox, FormControlLabel, FormGroup, Switch } from "@material-ui/core";
import Btn from "../button/index.js";
import { ReactComponent as PdfSVG } from "../../assets/pdf-icon.svg";
import { ReactComponent as WordSVG } from "../../assets/word-icon.svg";
import { ReactComponent as ExcelSVG } from "../../assets/excel-icon.svg"
import SimpleModal from "../modal/index.js";

export default function FileList({ files, onChangeInterruptor }) {

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
      if (item === true)
        temp.push(files[index]);
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

  return (
    <Container>
      <Header>Lista de Documentos</Header>

      {files.length > 0 && (
        <ul>
          <Checkbox checked={selectAll} onChange={(e) => handleSelectAll(e)} />Select all
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
                {!uploadedFile.uploaded && !uploadedFile.error && (
                  <CircularProgressbar
                    styles={{
                      root: { width: 24 },
                      path: { stroke: '#7159c1' }
                    }}
                    strokeWidth={10}
                    value={uploadedFile.progress}
                  />
                )}

                {uploadedFile.uploaded &&
                  <MdCheckCircle size={24} color="#78e5d5" />
                }

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
        {booleanFilesArray.filter(f => f).length > 0 && (
          <SimpleModal files={getSelectedFiles(booleanFilesArray)} index={0} btnType="text" />
        )}
      </Footer>
    </Container>
  )
};
