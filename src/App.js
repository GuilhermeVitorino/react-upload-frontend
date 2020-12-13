import React, { Component } from 'react';
import { uniqueId } from 'lodash';
import filesize from 'filesize';

import api from './services/api';

import GlobalStyle from './styles/global';
import { FilesToUpload, UploadedFiles, FilesView, MainContainer, MenuSidebar, ContainerContent } from './styles'

import Upload from './components/upload';
import FileToUploadList from './components/file-to-upload-list';
import FileList from './components/uploaded-file-list';
import FileViewer from './components/fileviewer';
import CardData from './components/card-data';

class App extends Component {
  
  state = {
    uploadedFiles: [],
    filteredUploadedFiles: [],
    filesToUpload: false,
    showDetailedFiles: false
  };

  async componentDidMount() {
    const response = await api.get('posts');
    const data = response.data.map(file => ({
                    id: file._id,
                    name: file.name,
                    readableSize: filesize(file.size),
                    preview: file.url,
                    uploaded: true,
                    url: file.url,
                    type: file.type,
                    createdAt: this.getDateFromTimeStamp(file.createdAt)
                  }))

    this.setState({
      uploadedFiles: data,
      filteredUploadedFiles: data
    });
  }

  getDateFromTimeStamp = timeStamp => {
    const date = new Date(timeStamp);
    return date.toLocaleDateString();
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

  };

  handleFilesFilter = (e) => {
    const lowercasedFilter = e.target.value.toLowerCase();
    const filteredFiles = this.state.uploadedFiles.filter(item => item.name.toLowerCase().includes(lowercasedFilter));
    this.setState({
      filteredUploadedFiles: filteredFiles,
    });
  }

  btnUploadFiles = () => {
    this.state.uploadedFiles.filter(file => !file.uploaded).forEach(this.processUpload);
  }

  updateFile = (id, data) => {

    const temp = [...this.state.uploadedFiles]
    const files = temp.map(uploadedFile => {
      return id === uploadedFile.id
        ? { ...uploadedFile, ...data }
        : uploadedFile;
    })

    this.setState({
      uploadedFiles: files,
      filteredFiles: files,
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

    }).catch(() => {

      this.updateFile(uploadedFile.id, {
        error: true,
      });

    });
  }

  handleDelete = async (id, uploaded) => {

    if (uploaded) { await api.delete(`posts/${id}`) }

    const newUploadedFiles = this.state.uploadedFiles.filter(file => file.id !== id)
    const newUploadedFiles2 = newUploadedFiles.filter(file => file.uploaded === false)

    this.setState({
      uploadedFiles: this.state.uploadedFiles.filter(file => file.id !== id),
      filesToUpload: !!newUploadedFiles2.length
    });

  }

  componentWillUnmount() {
    this.state.uploadedFiles.forEach(file => URL.revokeObjectURL(file.preview));
  }

  getFilesToUpload() {
    return !!this.state.uploadedFiles.filter(file => file.uploaded === false).length
  }

  handleDetailedFilesInterruptor(e) {
    this.setState({
      showDetailedFiles: e.target.checked
    });
  }

  render() {

    const { uploadedFiles } = this.state;
    const { filteredUploadedFiles } = this.state;
    const { filesToUpload } = this.state;
    const { showDetailedFiles } = this.state;

    return (
      <MainContainer>
        <MenuSidebar />
        <ContainerContent>

          <CardData />

          <FilesToUpload>
            <Upload onUpload={this.handleUpload} />
            {!!uploadedFiles.length && (
              <FileToUploadList
                files={uploadedFiles.filter(file => file.uploaded === false)}
                onDelete={this.handleDelete}
                btnUploadFiles={this.btnUploadFiles} />
            )}
          </FilesToUpload>

          {!!uploadedFiles.length && (
            <UploadedFiles>
              <FileList
                files={filteredUploadedFiles.filter(file => file.uploaded === true)}
                onDelete={this.handleDelete}
                onChangeInterruptor={this.handleDetailedFilesInterruptor.bind(this)}
                handleFilesFilter={this.handleFilesFilter}
               />
            </UploadedFiles>
          )}

          {!!uploadedFiles.length && showDetailedFiles && (
            <FileViewer
              files={uploadedFiles.filter(file => file.uploaded === true)}
              onDelete={this.handleDelete}
            />
          )}

          <GlobalStyle />
        </ContainerContent>

      </MainContainer>
    );
  }
}

export default App;
