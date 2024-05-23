import "primereact/resources/themes/saga-orange/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import { useEffect, useState } from "react";
import CustomerTable from "./CustomerTable/CustomerTable";
import SidePane from "./SidePane/SidePane";

import { useAuthenticator } from "@aws-amplify/ui-react";
import { AuthSession, fetchAuthSession } from "aws-amplify/auth";
import NewCustomer from "./NewCustomer/NewCustomer";

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: "var(--surface-300)",
      }}
    >
      <div
        style={{
          backgroundColor: "var(--primary-color)",
          borderRadius: "0 0 30px 0",
          top: "0",
          width: "100vw",
          flex: 1,
        }}
      >
        Header
      </div>
      <div
        style={{
          flex: 10,
          backgroundColor: "var(--surface-300)",
          width: "100vw",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            height: "100%",
          }}
        >
          <div
            style={{
              flex: 1,
              padding: "1rem 1rem 1rem 1rem",
              borderRadius: "0 30px 30px 0",
              backgroundColor: "var(--surface-100)",
            }}
          >
            <SidePane signOut={signOut!}></SidePane>
          </div>

          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <div
              style={{
                flex: 7,
                padding: "2rem 2rem 2rem 2rem",
                overflowY: "auto",
              }}
            >
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
