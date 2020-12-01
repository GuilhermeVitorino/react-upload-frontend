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
    margin-bottom: 30px;
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

    select {
        appearance: none;
        background-color: transparent;
        border: none;
        cursor: inherit;
        font-family: inherit;
        font-size: inherit;
        line-height: inherit;
        margin: 0;
        outline: none;
        padding: 0 1em 0 0;
        width: 100%;
        z-index: 1;
        height: 40px;
        color: #8f9bb3;
        font-family: Open Sans,sans-serif;
        padding: 10px;

        &::-ms-expand {
            display: none;
        }

        option {
          color: #192038;
          font-family: Open Sans,sans-serif;
        }
    }

    .select {
        align-items: center;
        background-color: #f7f9fc;
        border: 1px solid #edf1f7;
        border-radius: 4px;
        color: #192038;
        cursor: pointer;
        display: grid;
        font-family: "Open Sans", sans-serif;
        font-size: 14px;
        grid-template-areas: "select";
        line-height: 1.1;
        position: relative;
        width: 48%;

        select,
        &::after {
            grid-area: select;
            heigth: 40px;
        }

        &:after {
            --background-color: #192038;
            --clip-path: polygon(100% 0%, 0 0%, 50% 100%);
            --content: "";
            --justify-self: end;
            --height: 0.5em;
            --width: 0.8em;
        }
    }

    select:focus + .focus {
        border: 2px solid #c02;
        border-radius: inherit;
        bottom: -1px;
        left: -1px;
        position: absolute;
        right: -1px;
        top: -1px;
    }

    svg {
        font-size: 18px;
        justify-self: end;
        position: absolute;
        right: 5px;
    }
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
