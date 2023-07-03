import styled from 'styled-components';

/* ----- Root ----- */
export const S_Root = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  font-size: 16px;
  @media only screen and (max-width: 480px) {
    font-size: 13px;
  }
`;

/* ----- Wrapper Root-Main ----- */
export const S_Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-grow: 1;
  width: calc(100%-(60px));
  overflow: hidden;
`;

export const S_Container = styled.main`
  max-width: 1500px;
  flex-grow: 1;
`;
