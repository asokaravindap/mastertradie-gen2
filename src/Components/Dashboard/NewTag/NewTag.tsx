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
  name: "",
  description: "",
};

const client = generateClient<Schema>();

const NewTag = () => {
  const { session } = useSession();
  const { user } = useUser();
  const [formState, setFormState] = useState(initialState);

  function createTag() {
    const tag = { ...formState };
    setFormState(initialState);

    client.models.Tag.create(
      {
        tpUserAccountId: user.userId,
        name: tag.name,
        description: tag.description,
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
          setFormState({ ...formState, name: event.target.value })
        }
        value={formState.name as string}
        placeholder="name"
      />
      <InputText
        onChange={(event) =>
          setFormState({ ...formState, description: event.target.value })
        }
        value={formState.description as string}
        placeholder="description"
      />
      <Button onClick={createTag}>Create Tag</Button>
    </div>
  );
};

export default NewTag;
