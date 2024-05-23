import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { useState } from "react";
import { generateClient } from "aws-amplify/api";

import type { Schema } from "../../../../amplify/data/resource";
import { AuthSession, AuthUser } from "aws-amplify/auth";

type NewCustomerProps = {
  session: AuthSession;
  user: AuthUser;
};

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  tier: "",
};

const client = generateClient<Schema>();

const NewCustomer: React.FC<NewCustomerProps> = ({ session, user }) => {
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
      <TextField
        onChange={(event) =>
          setFormState({ ...formState, firstName: event.target.value })
        }
        value={formState.firstName as string}
        placeholder="firstName"
      />
      <TextField
        onChange={(event) =>
          setFormState({ ...formState, lastName: event.target.value })
        }
        value={formState.lastName as string}
        placeholder="lastName"
      />
      <TextField
        onChange={(event) =>
          setFormState({ ...formState, email: event.target.value })
        }
        value={formState.email as string}
        placeholder="email"
      />
      <TextField
        onChange={(event) =>
          setFormState({ ...formState, phone: event.target.value })
        }
        value={formState.phone as string}
        placeholder="phone"
      />
      <TextField
        onChange={(event) =>
          setFormState({ ...formState, tier: event.target.value })
        }
        value={formState.tier as string}
        placeholder="tier"
      />
      <Button variant="contained" onClick={createCustomer}>
        Create Customer
      </Button>
    </div>
  );
};

export default NewCustomer;
