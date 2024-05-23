/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ScrollPanel } from "primereact/scrollpanel";
import { useEffect, useState } from "react";
import { Schema } from "../../../../amplify/data/resource";
import { AuthSession, AuthUser } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/api";

type CustomerTableProps = {
  session: AuthSession;
  user: AuthUser;
};

const client = generateClient<Schema>();

const CustomerTable: React.FC<CustomerTableProps> = ({ session, user }) => {
  useEffect(() => {
    const fetchCustomers = async () => {
      const { data } = await client.models.Customer.list({
        filter: {
          tpUserAccountId: {
            eq: user.userId,
          },
        },
        authMode: "lambda",
        authToken: "token:" + session.tokens?.accessToken.toString(), // amplify-category-api/issues/2128
      });

      setCustomers(data);
    };

    fetchCustomers();
  }, [session.tokens?.accessToken, user.userId]);

  const [customers, setCustomers] = useState<Array<Schema["Customer"]["type"]>>(
    []
  );

  return (
    customers && (
      <ScrollPanel style={{ width: "100%", height: "calc(100vh / 2)" }}>
        <DataTable value={customers}>
          <Column field="firstName" header="Firstname"></Column>
          <Column field="lastName" header="Lastname"></Column>
          <Column field="email" header="Email"></Column>
          <Column field="phone" header="Phone"></Column>
          <Column field="tier" header="Tier"></Column>
          <Column field="tpUserAccountId" header="TPUserAccountId"></Column>
        </DataTable>
      </ScrollPanel>
    )
  );
};

export default CustomerTable;
