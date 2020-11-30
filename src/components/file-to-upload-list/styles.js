import styled from 'styled-components';

export const Container = styled.div.attrs({
    classname: 'fileList'
})`
    ul {
        border-top: 1px solid #edf1f7;
        margin-top: 20px;
        padding-left: 20px;
        padding-right: 20px;
        padding-top: 10px;

        li {
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #444;

            & + li {
                margin-top: 15px;
            }
        }
    }
`;

export const Header = styled.h2`
  border-bottom: 1px solid #edf1f7;
  color: #192038;
  display: flex;
  font-family: "Open Sans", sans-serif;
  font-size: .9375rem;
  margin-bottom: 20px;
  padding: 0 20px 20px;
  width: 100%;
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
