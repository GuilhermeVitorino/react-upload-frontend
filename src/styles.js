import styled, { createGlobalStyle } from 'styled-components';

export const MainContainer = styled.div``;

export const MenuSidebar = styled.aside``;

export const ContainerContent = styled.div`
    height: 100%;
    margin-left: 20%;
    margin-right: 20%;
    justify-content: center;
    align-items: center;
`;

export const FilesToUpload = styled.div`
    margin: auto;
    margin-top: 5%;
    margin-right: 5%;
    min-width: 100%;
    max-width: 400px;
    background: #FFF;
    border-radius: 4px;
    padding-bottom: 20px;
    padding-top: 20px;
`;

export const UploadedFiles = styled.div`
    margin: auto;
    margin-top: 5%;
    min-width: 100%;
    width: 50%;
    max-width: 400px;
    background: #FFF;
    border-radius: 4px;
    padding: 20px;
`;

export const FilesView = styled.div`
    display: table;
    margin: auto;
    margin-top: 5%;
    min-width: 100%;
    width: 50%;
    max-width: 400px;
    background: #FFF;
    border-radius: 4px;
    padding: 20px;
`;

export const Title = styled.p`
    margin-bottom: 10%;
    box-shadow: 0px 0.1px;
    font-size: small;
`;
