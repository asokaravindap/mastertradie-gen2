/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

type CustomerTableProps = {
  customers: any[];
};

const CustomerTable: React.FC<CustomerTableProps> = ({ customers }) => {
  return (
    <DataTable value={customers}>
      <Column field="firstName" header="Firstname"></Column>
      <Column field="lastName" header="Lastname"></Column>
      <Column field="email" header="Email"></Column>
      <Column field="phone" header="Phone"></Column>
      <Column field="tier" header="Tier"></Column>
      <Column field="tpUserAccountId" header="TPUserAccountId"></Column>
    </DataTable>
  );
};

export default CustomerTable;
