/* eslint-disable react-refresh/only-export-components */
import "primereact/resources/themes/saga-orange/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import { useEffect, useState } from "react";
import SidePane from "./SidePane/SidePane";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { AuthSession, AuthUser, fetchAuthSession } from "aws-amplify/auth";
import styled from "@emotion/styled";
import { ProgressSpinner } from "primereact/progressspinner";
import { Outlet, useOutletContext } from "react-router-dom";

// ----- Styles Starts ----- //

const DashboardContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: var(--surface-300);
`;

const DashboardHeaderDiv = styled.div`
  background-color: #451e0c;
  border-radius: 0 0 30px 30px;
  top: 0;
  width: 100vw;
  flex: 1;
`;

const DashboardBodyDiv = styled.div`
  flex: 10;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;

const DashboardSidePanelDiv = styled.div`
  flex: 1;
  padding: 1rem 1rem 1rem 1rem;
  border-radius: 0 30px 30px 0;
  /* background-color: var(--surface-100); */
`;

const DashboardPanelDiv = styled.div`
  flex: 5;
  padding: 2rem 2rem 2rem 2rem;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// ----- Styles Ends ----- //

type SessionType = { session: AuthSession };
type UserType = { user: AuthUser };

const Dashboard = () => {
  const [session, setSession] = useState<AuthSession>({});
  const [isLoading, setIsLoading] = useState(true);

  const { user, signOut } = useAuthenticator((context) => [context.user]);

  useEffect(() => {
    setCurrentSession();
  }, []);

  async function setCurrentSession() {
    const currentSession = await fetchAuthSession();
    setSession(currentSession);
    setIsLoading(false);
  }

  return (
    <DashboardContainerDiv>
      <DashboardHeaderDiv></DashboardHeaderDiv>
      <DashboardBodyDiv>
        <DashboardSidePanelDiv>
          <SidePane signOut={signOut!}></SidePane>
        </DashboardSidePanelDiv>

        {isLoading ? (
          <DashboardPanelDiv>
            <ProgressSpinner strokeWidth="4" />
          </DashboardPanelDiv>
        ) : (
          <DashboardPanelDiv>
            <Outlet
              context={{
                session: session,
                user: user,
              }}
            />
          </DashboardPanelDiv>
        )}
      </DashboardBodyDiv>
    </DashboardContainerDiv>
  );
};

export function useSession(): SessionType {
  return useOutletContext<SessionType>();
}

export function useUser(): UserType {
  return useOutletContext<UserType>();
}

export default Dashboard;
