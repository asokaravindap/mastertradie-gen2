/* eslint-disable @typescript-eslint/no-explicit-any */
import { ScrollPanel } from "primereact/scrollpanel";
import { useEffect, useState } from "react";
import { Schema } from "../../../../amplify/data/resource";
import { generateClient } from "aws-amplify/api";
import { useSession, useUser } from "../Dashboard";
import { Grid } from "@aws-amplify/ui-react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";

const client = generateClient<Schema>();

const TagTable = () => {
  const { session } = useSession();
  const { user } = useUser();
  useEffect(() => {
    const fetchTags = async () => {
      const { data } = await client.models.Tag.list({
        filter: {
          tpUserAccountId: {
            eq: user.userId,
          },
        },
        authMode: "lambda",
        authToken: "token:" + session.tokens?.accessToken.toString(),
      });

      setTags(data);
    };

    fetchTags();
  }, [session.tokens?.accessToken, user.userId]);

  const [tags, setTags] = useState<Array<Schema["Tag"]["type"]>>([]);

  return (
    tags && (
      <div
        className="card"
        style={{
          borderRadius: "10px",
          backgroundColor: "var(--surface-200)",
          padding: "30px",
        }}
      >
        <ScrollPanel style={{ width: "100%", height: "600px" }}>
          <Grid
            templateColumns={{ base: "1fr 1fr", large: "1fr 1fr 1fr 1fr" }}
            gap="2rem"
          >
            {tags.map((tag, index) => (
              <div key={index}>
                <TagCard topic={tag.name!} text={tag.description!} />
              </div>
            ))}
          </Grid>
        </ScrollPanel>
      </div>
    )
  );
};

interface TagCardProps {
  topic: string;
  text: string;
}

const TagCard: React.FC<TagCardProps> = ({ topic, text }) => {
  const header = (
    <img
      alt="Card"
      src="https://primefaces.org/cdn/primereact/images/usercard.png"
    />
  );
  const footer = (
    <>
      <Button label="Save" icon="pi pi-check" />
      <Button
        label="Cancel"
        severity="secondary"
        icon="pi pi-times"
        style={{ marginLeft: "0.5em" }}
      />
    </>
  );

  return (
    <div className="card flex justify-content-center">
      <Card
        title={topic}
        footer={footer}
        header={header}
        className="md:w-17rem"
      >
        <p className="m-0">{text}</p>
      </Card>
    </div>
  );
};

export default TagTable;
