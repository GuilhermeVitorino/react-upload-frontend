import React, { Component } from 'react';
import { uniqueId } from 'lodash';
import filesize from 'filesize';

import api from './services/api';

import GlobalStyle from './styles/global';
import { FilesToUpload, UploadedFiles, FilesView, MainContainer, MenuSidebar, ContainerContent } from './styles'

import Upload from './components/upload';
import FileList from './components/filelist';
import Btn from './components/button';
import FileViewer from './components/fileviewer';
import CardData from './components/card-data';
import Modal from './components/modal';

class App extends Component {
  state = {
    uploadedFiles: [],
    filesToUpload: false
  };

  async componentDidMount() {
    const response = await api.get('posts');
    
    this.setState({
      uploadedFiles: response.data.map(file => ({
        id: file._id,
        name: file.name,
        readableSize: filesize(file.size),
        preview: file.url,
        uploaded: true,
        url: file.url,
        type: file.type,
      }))
    });
  }

  handleUpload = files => {
    console.log(files);
    const uploadedFiles = files.map(file => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null,
    }));

    this.setState({
      uploadedFiles: this.state.uploadedFiles.concat(uploadedFiles),
      filesToUpload: this.getFilesToUpload
    });

    //uploadedFiles.forEach(this.processUpload);

  };

  btnUploadFiles = () => {
    this.state.uploadedFiles.filter(file => !file.uploaded).forEach(this.processUpload);
  }

  updateFile = (id, data) => {
    this.setState({
      uploadedFiles: this.state.uploadedFiles.map(uploadedFile => {
        return id === uploadedFile.id
          ? { ...uploadedFile, ...data} 
          : uploadedFile;
        }),
        filesToUpload: this.getFilesToUpload
    });
  };

  processUpload = (uploadedFile) => {
    const data = new FormData();

    data.append('file', uploadedFile.file, uploadedFile.name);

    api.post('posts', data, {
      onUploadProgress: e => {
        const progress = parseInt(Math.round((e.loaded * 100) / e.total));

        this.updateFile(uploadedFile.id, {
          progress
        });
      }
    }).then((response) => {

      this.updateFile(uploadedFile.id, {
        uploaded: true,
        id: response.data._id,
        url: response.data.url,
        type: response.data.type
      });

      this.setState({
        filesToUpload: this.getFilesToUpload()
      });

    }).catch(() =>{

      this.updateFile(uploadedFile.id, {
        error: true,
      });

    });
  }

  handleDelete = async (id, uploaded) => {

    if ( uploaded ) { await api.delete(`posts/${id}`)}

    const newUploadedFiles = this.state.uploadedFiles.filter(file => file.id !== id)
    const newUploadedFiles2 = newUploadedFiles.filter(file => file.uploaded === false)
    
    this.setState({
      uploadedFiles: this.state.uploadedFiles.filter(file => file.id !== id),
      filesToUpload: !!newUploadedFiles2.length
    });

  }

  componentWillUnmount(){
    this.state.uploadedFiles.forEach(file => URL.revokeObjectURL(file.preview));
  }

  getFilesToUpload(){
    return !!this.state.uploadedFiles.filter(file => file.uploaded === false).length
  }

  render() {
    
    const { uploadedFiles } = this.state;
    const { filesToUpload } = this.state;

    return (
      <MainContainer>
        <MenuSidebar />
        <ContainerContent>
          <CardData />
          <FilesToUpload>
            <Upload onUpload={this.handleUpload} />
            { !!uploadedFiles.length && (
              <FileList files={uploadedFiles.filter(file => file.uploaded === false)} onDelete={this.handleDelete} />
            )}
            { filesToUpload && (
              <Btn onClickBtn={this.btnUploadFiles}/>
            )}
          </FilesToUpload>
          { !!uploadedFiles.length && (
            <UploadedFiles>
                <FileList files={uploadedFiles.filter(file => file.uploaded === true)} onDelete={this.handleDelete} />
            </UploadedFiles>
          )}
          { !!uploadedFiles.length && (
              <FileViewer files={uploadedFiles.filter(file => file.uploaded === true)} onDelete={this.handleDelete} />
          )}
          <GlobalStyle/>
        </ContainerContent>
        <Modal />
      </MainContainer>
    );  
  }
}

export default App;
