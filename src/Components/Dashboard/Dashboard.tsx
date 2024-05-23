import { useEffect, useState } from "react";

import { useAuthenticator } from "@aws-amplify/ui-react";
import { AuthSession, fetchAuthSession } from "aws-amplify/auth";

import CustomerTable from "./CustomerTable/CustomerTable";
import SidePane from "./SidePane/SidePane";
import NewCustomer from "./NewCustomer/NewCustomer";

const containerStyle = {
  display: "flex",
  width: "100vw",
  height: "100vh",
};

const sidePane = {
  display: "flex",
  alignItems: "center",
  paddingLeft: "20px",
  paddingRight: "20px",
};

const board = {
  // flex: 1,
  // backgroundColor: "yellow",
};

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
    <div style={{ backgroundColor: "white" }}>
      <div style={containerStyle}>
        <div style={sidePane}>
          <SidePane signOut={signOut!}></SidePane>
        </div>
        <div style={board}>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <div>
              <NewCustomer session={session} user={user}></NewCustomer>
              <CustomerTable session={session} user={user}></CustomerTable>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
