import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import styled from 'styled-components';

const Container = styled(ToastContainer)`
  .Toastify__toast {
    font-size: 14px;
    border-radius: 10px;
    white-space: pre-line;
	  word-break: keep-all;
    font-weight: 600;
    line-height: 1.5;
    color: #000;
  }

  .Toastify__toast--info {
  }

  .Toastify__toast--success {
  }

  .Toastify__toast--error {
  }
`

export function CustomToastContainer(props) {
  return (
    <Container limit={3} newestOnTop={true} position='bottom-left' />
  );
}