import "primereact/resources/themes/saga-orange/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { generateClient } from "aws-amplify/api";
import type { Schema } from "../../../../amplify/data/resource";
import { useSession } from "../Dashboard";

const initialState = {
  timestamp: "",
  description: "",
  sendEmail: "",
  customerId: "", // TODO: need to get rid of this
};

const client = generateClient<Schema>();

const NewReminder = () => {
  const { session } = useSession();
  const [formState, setFormState] = useState(initialState);

  function createReminder() {
    const reminder = { ...formState };
    setFormState(initialState);

    client.models.Reminder.create(
      {
        timestamp: reminder.timestamp,
        description: reminder.description,
        sendEmail: reminder.sendEmail ? true : false, // TODO: needs a better way for this
        customerId: reminder.customerId,
      },
      {
        authMode: "lambda",
        authToken: "token:" + session.tokens?.accessToken.toString(),
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
          setFormState({ ...formState, timestamp: event.target.value })
        }
        value={formState.timestamp as string}
        placeholder="timestamp"
      />
      <InputText
        onChange={(event) =>
          setFormState({ ...formState, description: event.target.value })
        }
        value={formState.description as string}
        placeholder="description"
      />
      <InputText
        onChange={(event) =>
          setFormState({ ...formState, sendEmail: event.target.value })
        }
        value={formState.sendEmail as string}
        placeholder="sendEmail"
      />
      <InputText
        onChange={(event) =>
          setFormState({ ...formState, customerId: event.target.value })
        }
        value={formState.customerId as string}
        placeholder="customerId"
      />
      <Button onClick={createReminder}>Create Reminder</Button>
    </div>
  );
};

export default NewReminder;
