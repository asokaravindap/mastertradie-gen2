import "primereact/resources/themes/saga-orange/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

// import { type AuthUser } from "aws-amplify/auth";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { ScrollPanel } from "primereact/scrollpanel";
// import { UseAuthenticator } from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/api";
import CustomerTable from "./CustomerTable/CustomerTable";
import SidePane from "./SidePane/SidePane";

import type { Schema } from "../../../amplify/data/resource";
import { Authenticator } from "@aws-amplify/ui-react";

// type DashboardProps = {
//   signOut?: UseAuthenticator["signOut"];
//   user?: AuthUser;
// };

const initialState = {
  tpUserAccountId: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  tier: "",
};

const client = generateClient<Schema>();

const Dashboard = () => {
  const [formState, setFormState] = useState(initialState);
  const [customers, setCustomers] = useState<Array<Schema["Customer"]["type"]>>(
    []
  );

  useEffect(() => {
    fetchCustomers();
  }, []);

  async function fetchCustomers() {
    client.models.Customer.observeQuery().subscribe({
      next: (data) => setCustomers([...data.items]),
    });
  }

  function createCustomer() {
    const customer = { ...formState };
    setFormState(initialState);

    client.models.Customer.create(
      {
        tpUserAccountId: customer.tpUserAccountId,
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone,
        tier: customer.tier,
      },
      {
        authMode: "lambda",
      }
    );
  }

  return (
    <Authenticator>
      {({ signOut, user }) => (
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

              <div
                style={{
                  flex: 7,
                  padding: "2rem 2rem 2rem 2rem",
                  overflowY: "auto",
                }}
              >
                <h1 style={{ color: "blue" }}>Hello {user?.username}</h1>
                <h2 style={{ color: "blue" }}>Amplify Customers</h2>
                <InputText
                  onChange={(event) =>
                    setFormState({
                      ...formState,
                      tpUserAccountId: event.target.value,
                    })
                  }
                  value={formState.tpUserAccountId as string}
                  placeholder="tpUserAccountId"
                />
                <InputText
                  onChange={(event) =>
                    setFormState({
                      ...formState,
                      firstName: event.target.value,
                    })
                  }
                  value={formState.firstName as string}
                  placeholder="firstName"
                />
                <InputText
                  onChange={(event) =>
                    setFormState({ ...formState, lastName: event.target.value })
                  }
                  value={formState.lastName as string}
                  placeholder="lastName"
                />
                <InputText
                  onChange={(event) =>
                    setFormState({ ...formState, email: event.target.value })
                  }
                  value={formState.email as string}
                  placeholder="email"
                />
                <InputText
                  onChange={(event) =>
                    setFormState({ ...formState, phone: event.target.value })
                  }
                  value={formState.phone as string}
                  placeholder="phone"
                />
                <InputText
                  onChange={(event) =>
                    setFormState({ ...formState, tier: event.target.value })
                  }
                  value={formState.tier as string}
                  placeholder="tier"
                />
                <Button onClick={createCustomer}>Create Customer</Button>
                <ScrollPanel
                  style={{ width: "100%", height: "calc(100vh / 2)" }}
                >
                  <CustomerTable customers={customers}></CustomerTable>
                  <CustomerTable customers={customers}></CustomerTable>
                  <CustomerTable customers={customers}></CustomerTable>
                </ScrollPanel>
              </div>
            </div>
          </div>
        </div>
      )}
    </Authenticator>
  );
};

export default Dashboard;
