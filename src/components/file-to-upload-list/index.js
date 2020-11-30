import React, { Component } from "react";
import { CircularProgressbar } from 'react-circular-progressbar';
import { MdCheckCircle, MdError, MdLink } from 'react-icons/md';
import Btn from '../button';
import { Container, Header, FileInfo, Preview } from './styles';

const FileToUploadList = ({ files, onDelete, btnUploadFiles }) => (
     <Container>
         {files.length > 0 && (
             <ul>
                 {files.map(uploadedFile => (
                     <li key={uploadedFile.id}>
                         <FileInfo>
                             <Preview src={uploadedFile.preview}/>
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
          <Btn onClickBtn={() => btnUploadFiles()} btnText={"ANEXAR"}/>
         )}
    </Container>
);

export default FileToUploadList;