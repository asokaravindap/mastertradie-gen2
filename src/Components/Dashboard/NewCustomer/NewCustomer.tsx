import "primereact/resources/themes/saga-orange/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { generateClient } from "aws-amplify/api";
import type { Schema } from "../../../../amplify/data/resource";
import { useSession, useUser } from "../Dashboard";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  tier: "",
};

const client = generateClient<Schema>();

const NewCustomer = () => {
  const { session } = useSession();
  const { user } = useUser();
  const [formState, setFormState] = useState(initialState);

  function createCustomer() {
    const customer = { ...formState };
    setFormState(initialState);

    client.models.Customer.create(
      {
        tpUserAccountId: user.userId,
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone,
        tier: customer.tier,
      },
      {
        authMode: "lambda",
        authToken: "token:" + session.tokens?.accessToken.toString(), // amplify-category-api/issues/2128
      }
    );
  }

  return (
    <div
      style={{
        overflowY: "auto",
      }}
    >
      <InputText
        onChange={(event) =>
          setFormState({ ...formState, firstName: event.target.value })
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
    </div>
  );
};

export default NewCustomer;
