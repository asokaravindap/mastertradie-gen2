/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { SplitButton } from "primereact/splitbutton";
import { MenuItem } from "primereact/menuitem";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";

// ----- Styles Starts ----- //

const DashboardSidePanelContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  background-color: var(--surface-300);
`;

const DashboardSidePanelBodyDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #451e0c;
  border-radius: 20px 20px 20px 20px;
  flex: 1;
  position: relative;
`;

const DashboardAvatarDiv = styled.div`
  width: 100%;
  position: absolute;
  top: 10%;
  display: flex;
  justify-content: center;
`;

const DashboardSignOutDiv = styled.div`
  width: 100%;
  position: absolute;
  bottom: 20px;
  height: 50;
  background-color: #451e0c;
  display: flex;
  justify-content: center;
`;

// ----- Styles Ends ----- //

type CustomerTableProps = {
  signOut: () => void;
};

const SidePane: React.FC<CustomerTableProps> = ({ signOut }) => {
  const navigate = useNavigate();

  const customersItems: MenuItem[] = [
    {
      label: "Add New Customer",
      icon: "pi pi-user",
      command: () => {
        navigate("/dashboard/customeradd");
      },
    },
  ];

  const tagsItems: MenuItem[] = [
    {
      label: "Add New Tag",
      icon: "pi pi-tag",
      command: () => {
        navigate("/dashboard/tagadd");
      },
    },
  ];

  const emailsItems: MenuItem[] = [
    {
      label: "Add New Email",
      icon: "pi pi-envelope",
      command: () => {
        console.log("add new email");
      },
    },
  ];

  const remindersItems: MenuItem[] = [
    {
      label: "Add New Reminder",
      icon: "pi pi-bell",
      command: () => {
        navigate("/dashboard/reminderadd");
      },
    },
  ];

  return (
    <DashboardSidePanelContainer>
      <DashboardSidePanelBodyDiv>
        <DashboardAvatarDiv>
          <Avatar
            image="/images/avatar/amyelsner.png"
            size="xlarge"
            shape="circle"
          />
        </DashboardAvatarDiv>
        <div className="card flex justify-content-center">
          <SplitButton
            style={{ width: "100%", height: 50 }}
            label="Customers"
            dropdownIcon="pi pi-plus"
            model={customersItems}
            onClick={() => navigate("/dashboard/customerview")}
            text
            pt={{
              button: {
                label: {
                  style: { color: "white", fontWeight: 100 },
                },
              },
              icon: {
                style: { color: "white" },
              },
            }}
          />
        </div>
        <Divider />
        <div className="card flex justify-content-center">
          <SplitButton
            style={{ width: "100%", height: 50 }}
            label="Tags"
            dropdownIcon="pi pi-plus"
            model={tagsItems}
            onClick={() => navigate("/dashboard/tagview")}
            text
            pt={{
              button: {
                label: {
                  style: { color: "white", fontWeight: 100 },
                },
              },
              icon: {
                style: { color: "white" },
              },
            }}
          />
        </div>
        <Divider />
        <div className="card flex justify-content-center">
          <SplitButton
            style={{ width: "100%", height: 50 }}
            label="Emails"
            dropdownIcon="pi pi-plus"
            model={emailsItems}
            text
            pt={{
              button: {
                label: {
                  style: { color: "white", fontWeight: 100 },
                },
              },
              icon: {
                style: { color: "white" },
              },
            }}
          />
        </div>
        <Divider />
        <div className="card flex justify-content-center">
          <SplitButton
            style={{ width: "100%", height: 50 }}
            label="Reminders"
            dropdownIcon="pi pi-plus"
            model={remindersItems}
            onClick={() => navigate("/dashboard/reminderview")}
            text
            pt={{
              button: {
                label: {
                  style: { color: "white", fontWeight: 100 },
                },
              },
              icon: {
                style: { color: "white" },
              },
            }}
          />
        </div>
        <DashboardSignOutDiv>
          <Button
            style={{
              width: "60%",
              height: 50,
              backgroundColor: "#451e0c",
            }}
            label="Signout"
            icon="pi pi-sign-out"
            onClick={signOut}
            rounded
            pt={{
              label: {
                style: { color: "white", fontWeight: 100 },
              },
              icon: {
                style: { color: "white" },
              },
            }}
          />
        </DashboardSignOutDiv>
      </DashboardSidePanelBodyDiv>

      <br />
    </DashboardSidePanelContainer>
  );
};

export default SidePane;
