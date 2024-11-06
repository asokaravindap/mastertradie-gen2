/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ScrollPanel } from "primereact/scrollpanel";
import { useEffect, useState } from "react";
import { Schema } from "../../../../amplify/data/resource";
import { generateClient } from "aws-amplify/api";
import { useSession, useUser } from "../Dashboard";

const client = generateClient<Schema>();

const RemindersCalendar = () => {
  const { session } = useSession();
  const { user } = useUser();
  useEffect(() => {
    const fetchReminders = async () => {
      const { data } = await client.models.Reminder.list({
        filter: {
          tpUserAccountId: {
            eq: user.userId,
          },
        },
        authMode: "lambda",
        authToken: "token:" + session.tokens?.accessToken.toString(),
      });

      setReminders(data);
    };

    fetchReminders();
  }, [session.tokens?.accessToken, user.userId]);

  const [reminders, setReminders] = useState<Array<Schema["Reminder"]["type"]>>(
    []
  );

  return (
    reminders && (
      <ScrollPanel style={{ width: "100%" }}>
        <DataTable value={reminders} scrollable scrollHeight="600px">
          <Column field="timestamp" header="Timestamp"></Column>
          <Column field="description" header="Description"></Column>
          <Column field="sendEmail" header="SendEmail"></Column>
          <Column field="customerId" header="CustomerId"></Column>
        </DataTable>
      </ScrollPanel>
    )
  );
};

export default RemindersCalendar;
