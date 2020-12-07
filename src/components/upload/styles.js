import styled, { css } from 'styled-components';

const dragActive = css`
    border-color: #78e5d5;
`;

const dragReject = css`
    border-color: #e57878;
`;

export const DropContainer = styled.div.attrs({
    classname: "dropzone"
})`
    background-color: rgba(238, 238, 238, 0.3);
    border: 1px dashed #ddd;
    border-radius: 4px;
    cursor: pointer;
    margin: 0 20px 20px;
    transition: height 0.2s ease;

    ${props => props.isDragActive && dragActive};
    ${props => props.isDragReject && dragReject};
`;

export const HeaderDropContainer = styled.h2`
    border-bottom: 1px solid #edf1f7;
    color: #192038;
    display: flex;
    font-family: "Open Sans", sans-serif;
    font-size: .9375rem;
    padding: 0 20px 20px;
    width: 100%;
`;

export const Container = styled.div``;

export const InfoDocument = styled.div `
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    padding: 0 20px 20px;
    width: 100%;
`;

const messageColors = {
    default: '#999',
    error: '#e57878',
    success: '#78e5d5'
};

export const UploadMessage = styled.div`
    align-items: center;
    color: ${props => messageColors[props.type || 'default']};
    display: flex;
    justify-content: center;
    padding: 30px 20px;
    flex-flow: column;

    .icon-upload {
        height: 25px;
        width: 25px;
    }

    p {
        color: #999;
        display: block;
        font-family: "Open Sans", sans-serif;
        font-size: 14px;
        margin-top: 20px;
    }
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
    box-shadow: 0 0.5rem 1rem 0 rgba(44,51,73,.1);
`;
