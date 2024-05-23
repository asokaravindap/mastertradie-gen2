import { useEffect, useState } from "react";

import { useAuthenticator } from "@aws-amplify/ui-react";
import { AuthSession, fetchAuthSession } from "aws-amplify/auth";

import CustomerTable from "./CustomerTable/CustomerTable";
import SidePane from "./SidePane/SidePane";
import NewCustomer from "./NewCustomer/NewCustomer";

import Box from "@mui/material/Box";

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

const board = {};

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
    <Box style={{ backgroundColor: "white" }}>
      <Box style={containerStyle}>
        <Box style={sidePane}>
          <SidePane signOut={signOut!}></SidePane>
        </Box>
        <Box style={board}>
          {isLoading ? (
            <Box>Loading...</Box>
          ) : (
            <Box>
              <NewCustomer session={session} user={user}></NewCustomer>
              <CustomerTable session={session} user={user}></CustomerTable>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
