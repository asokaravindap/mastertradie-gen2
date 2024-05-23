import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { AuthSession, AuthUser } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/api";
import { Schema } from "../../../../amplify/data/resource";
import { useEffect, useState } from "react";

interface Column {
  field: string;
  headerName: string;
}

type CustomerTableProps = {
  session: AuthSession;
  user: AuthUser;
};

const client = generateClient<Schema>();

const CustomerTable: React.FC<CustomerTableProps> = ({ session, user }) => {
  const [customers, setCustomers] = useState<Array<Schema["Customer"]["type"]>>(
    []
  );

  useEffect(() => {
    const fetchCustomers = async () => {
      const { data } = await client.models.Customer.list({
        filter: {
          tpUserAccountId: {
            eq: user.userId,
          },
        },
        authMode: "lambda",
        authToken: "token:" + session.tokens?.accessToken.toString(),
      });

      setCustomers(data);
    };

    fetchCustomers();
  }, [session.tokens?.accessToken, user.userId]);

  const columns: Column[] = [
    { field: "firstName", headerName: "Firstname" },
    { field: "lastName", headerName: "Lastname" },
    { field: "email", headerName: "Email" },
    { field: "phone", headerName: "Phone" },
    { field: "tier", headerName: "Tier" },
    { field: "tpUserAccountId", headerName: "TPUserAccountId" },
  ];

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 300 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.field} sx={{ fontWeight: "bold" }}>
                  {column.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((column) => (
                  <TableCell key={column.field}>
                    {row[column.field as keyof Schema["Customer"]["type"]]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default CustomerTable;
