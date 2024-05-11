import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

const client = generateClient<Schema>();

function App() {
  const [customers, setCustomers] = useState<Array<Schema["Customer"]["type"]>>(
    []
  );

  useEffect(() => {
    client.models.Customer.observeQuery().subscribe({
      next: (data) => setCustomers([...data.items]),
    });
  }, []);

  function createCustomer() {
    client.models.Customer.create({
      tpUserAccountId: "1234",
      firstName: "Asok",
      lastName: "Perera",
      email: "perera.asok@gmail.com",
      phone: "12344567",
      tier: "Gold",
    });
  }

  function deleteCustomer(id: string) {
    client.models.Customer.delete({ id });
  }

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <h1>{user?.signInDetails?.loginId}'s Customers</h1>
          <button onClick={createCustomer}>+ new</button>
          <ul>
            {customers.map((customer) => (
              <li onClick={() => deleteCustomer(customer.id)} key={customer.id}>
                {customer.firstName}
              </li>
            ))}
          </ul>
          <button onClick={signOut}>Sign out</button>
          <div>
            🥳 App successfully hosted. Try creating a new Customer.
            <br />
            <a href="https://next-release-dev.d1ywzrxfkb9wgg.amplifyapp.com/react/start/quickstart/vite-react-app/#step-2-add-delete-to-do-functionality">
              Review next step of this tutorial.
            </a>
          </div>
        </main>
      )}
    </Authenticator>
  );
}

export default App;
