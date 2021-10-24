import styled from "@emotion/styled";

export const Header = styled.header`
  display: flex;
  height: 6rem;
  padding: 0 2rem;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid #f7f7f7;
  z-index: 1;
`;

export const FlexColumnMain = styled.main`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 6rem);
`;

export const FlexRowMain = styled.main`
  display: flex;
  flex-direction: row;
  min-height: calc(100vh - 6rem);
`;

export const ContentContainer = styled.div`
  flex: 1;
  padding: 1.5rem 2rem;
  background-color: #f0f2f5;
  width: calc(100vw - 200px);
`;

export const Content = styled.div`
  display: flex;
  background-color: #fff;
  border-radius: 2px;
  width: 100%;
  height: 100%;
  padding: 1.5rem 2rem;
`;
