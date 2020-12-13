import styled from 'styled-components';

export const Container = styled.div.attrs({
    classname: 'fileList'
})`

    ul {
        margin-top: 20px;
        margin-left: 20px;
        padding-right: 20px;
        margin-bottom: 20px;
        padding-top: 10px;

        label {
          margin-left: 0px;
        }

        li {
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #444;

            & + li {
                margin-top: 15px;
            }

            input[type="checkbox"] {
              margin-right: 20px;
              border: 1px solid #edf1f7;
            }

            input[type="checkbox"]:checked {
              margin-right: 20px;
              border: 1px solid #edf1f7;
              color: red;
            }

        }

        li:hover {
          background-color: #f7f9fc;
          border-radius: 10px;
        }
    }
`;

export const Header = styled.h2`
    border-bottom: 1px solid #edf1f7;
    color: #192038;
    display: flex;
    font-family: "Open Sans", sans-serif;
    font-size: .9375rem;
    padding: 0 20px 20px;
    width: 100%;
`;

export const Footer = styled.div`
    border-top: 1px solid #edf1f7;
    display: flex;
    padding: 15px 0px 0px;
    width: 100%;

    div {
      display: inline-block;
      width: 50%;
      float: left;

      label {
        margin-left: 20px;
        font-family: "Open Sans", sans-serif;
      }
    }

    span {
      font-family: "Open Sans", sans-serif;
      font-size: .9375rem;
      fint-color: #192038;
    }

    button {
      float: right;
      margin-right: 20px;
    }
`;

export const FileInfo = styled.div`
    display: flex;
    align-items: center;

    div {
        display: flex;
        flex-direction: column;

        span {
            font-size: 12px;
            color: #999;
            margin-top: 5px;

            button {
                border: 0;
                background: transparent;
                color: #e57878;
                margin-left: 5px;
                cursor: pointer;
            }
        }
    }

`;

export const Preview = styled.div`
    width: 36px;
    height: 36px;
    border-radius: 5px;
    background-image: url(${props => props.src});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50%, 50%;
    margin-right: 10px;
`;


