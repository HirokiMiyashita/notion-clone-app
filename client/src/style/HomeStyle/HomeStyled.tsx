import styled from "styled-components";
import LogoutIcon from "@mui/icons-material/Logout";

export const Container = styled.div`
  width: 100;
  display: flex;
  padding: 0;
  margin: 0;
`;

export const LeftContainer = styled.section`
  width: 20%;
  height: 100vh;
  border-right: 1px solid gray;
`;
export const RightContainer = styled.div`
  width: 80%;
`;

export const UserNameArea = styled.dl`
  display: flex;
  width: 100%;
`;

export const UserNameAreaTitle = styled.dt`
  padding-left: 1rem;
`;

export const UserLogoutIcon = styled(LogoutIcon)`
  padding-left: 2rem;
`;
