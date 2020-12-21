import React from "react";
import { CircularProgressbar } from 'react-circular-progressbar';
import { MdCheckCircle, MdError, MdLink } from 'react-icons/md';
import Btn from '../button';
import { Container, FileInfo, Preview } from './styles';
import { ReactComponent as PdfSVG } from "../../assets/pdf-icon.svg";
import { ReactComponent as WordSVG } from "../../assets/word-icon.svg";
import { ReactComponent as ExcelSVG } from "../../assets/excel-icon.svg"
import { ReactComponent as Mp4SVG } from "../../assets/mp4-icon.svg"

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

const FileToUploadList = ({ files, onDelete, btnUploadFiles }) => (
     <Container>
         {files.length > 0 && (
             <ul>
                 {files.map(uploadedFile => (
                     
                     <li key={uploadedFile.id}>

                         <FileInfo>

                          {imageMimeType.includes(uploadedFile.file.type) && (
                            <Preview src={uploadedFile.preview}/>
                          )}

                          {(uploadedFile.file.type === "application/pdf") && (
                            <Preview>
                              <PdfSVG/>
                            </Preview>
                          )}

                          {(uploadedFile.file.type === "video/mp4") && (
                            <Preview>
                              <Mp4SVG/>
                            </Preview>
                          )}

                          {wordDocumentMimeType.includes(uploadedFile.file.type)
                            && uploadedFile.name.includes("doc", "docx")
                            && (
                              <Preview>
                                <WordSVG/>
                              </Preview>
                            )}

                          {excelDocumentMimeType.includes(uploadedFile.file.type)
                            && uploadedFile.name.includes("xls", "xlsx")
                            && (
                              <Preview>
                                <ExcelSVG/>
                              </Preview>
                            )}

                             <div>
                                 <strong>{uploadedFile.name}</strong>
                                 <span>{uploadedFile.readableSize}
                                     <button onClick={() => onDelete(uploadedFile.id, uploadedFile.uploaded)}>Excluir</button>
                                 </span>
                             </div>
                             
                         </FileInfo>
         
                         <div>
                             {!uploadedFile.uploaded && !uploadedFile.error &&(
                                 <CircularProgressbar
                                     styles={{
                                         root: { width: 24},
                                         path: { stroke: '#7159c1'}
                                     }}
                                     strokeWidth={10}
                                     //percentage={uploadedFile.progress}
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
                                 <MdCheckCircle size={24} color="#78e5d5"/>
                             }
         
                             {uploadedFile.error && 
                                 <MdError size={24} color="#e57878"/>
                             }
                                               
                         </div>
                     </li>
                 ))}
             </ul>
         )}
         { !!files.length && (
          <Btn onClickBtn={() => btnUploadFiles(files.filter(f => f.checked === true ).length > 0)} btnText={"ANEXAR"}/>
         )}
    </Container>
);

export default FileToUploadList;
