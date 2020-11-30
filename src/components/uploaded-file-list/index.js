import React, { useState } from "react";
import { CircularProgressbar } from 'react-circular-progressbar';
import { MdCheckCircle, MdError, MdLink } from 'react-icons/md';
import Tooltip from 'react-tooltip-lite';
import { Container, Header, FileInfo, Preview, Footer } from './styles.js';
import './styles.css';
import { FormControlLabel, FormGroup, Switch } from "@material-ui/core";
import Btn from "../button/index.js";
import { ReactComponent as PdfSVG } from "../../assets/pdf-icon.svg";
import { ReactComponent as WordSVG } from "../../assets/word-icon.svg";
import { ReactComponent as ExcelSVG } from "../../assets/excel-icon.svg"

function FileList({ files, onDelete, onChangeInterruptor }) {

  const [selectedFiles, setSelectedFiles] = useState([]);

  function handleFileCheck(file, e) {

    file.checked = e.target.checked;
    const checkedFilesList = files.filter(file => file.checked);
    setSelectedFiles(checkedFilesList);

  }

  function handleInterruptor() {

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
          {files.map(uploadedFile => (
            <li key={uploadedFile.id}>
              <FileInfo>
                <input type="checkbox" defaultChecked={uploadedFile.ckecked} onChange={(e) => handleFileCheck(uploadedFile, e)} />

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
                    <Preview src={uploadedFile.preview} />
                  )}

                  {(uploadedFile.type == "application/pdf") && (
                    <Preview>
                      <PdfSVG></PdfSVG>
                    </Preview>
                  )}

                  {wordDocumentMimeType.includes(uploadedFile.type)
                    && uploadedFile.name.includes("doc", "docx")
                    && (
                      <Preview>
                        <WordSVG></WordSVG>
                      </Preview>
                    )}

                  {excelDocumentMimeType.includes(uploadedFile.type)
                    && uploadedFile.name.includes("xls", "xlsx")
                    && (
                      <Preview>
                        <ExcelSVG></ExcelSVG>
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

                {uploadedFile.url && (
                  <a
                    href={uploadedFile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MdLink style={{ marginRight: 8 }} size={24} color="#222" />
                  </a>
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
        {selectedFiles.length > 0 && (
          <Btn onClickBtn={() => { }} btnText={"VISUALIZAR ARQUIVOS"} />
        )}
      </Footer>
    </Container>
  )
};

export default FileList;
