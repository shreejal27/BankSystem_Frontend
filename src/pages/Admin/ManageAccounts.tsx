import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
} from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface IAccountResponse {
  id: string;
  accountNumber: string;
  accountType: string;
  balance: number;
  status: string;
  userName: string;
  userEmail: string;
  createdAt: string;
}

const ManageAccounts = () => {
  const [search, setSearch] = useState("");
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedAccount, setSelectedAccount] =
    useState<IAccountResponse | null>(null);

  const queryClient = useQueryClient();

  // Fetch all accounts
  const { data: accounts, isLoading } = useQuery({
    queryKey: ["all-accounts"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5131/api/Account?flag=all");
      return res.data;
    },
  });

  // Update account mutation
  const updateMutation = useMutation({
    mutationFn: async (updated: IAccountResponse) =>
      axios.put(`http://localhost:5131/api/Account/${updated.id}`, updated),
    onSuccess: () => {
      // queryClient.invalidateQueries(["all-accounts"]);
      setOpenEdit(false);
    },
  });

  //Delete account
  const deleteMutation = useMutation({
    mutationFn: async (id: string) =>
      axios.delete(`http://localhost:5131/api/Account/${id}`),
    onSuccess: () => {
      // queryClient.invalidateQueries(["all-accounts"]);
    },
  });

  // Columns
  const columns: GridColDef[] = [
    { field: "accountNumber", headerName: "Account No.", flex: 1 },
    { field: "userName", headerName: "User", flex: 1 },
    { field: "userEmail", headerName: "Email", flex: 1 },
    { field: "accountType", headerName: "Type", flex: 1 },
    {
      field: "balance",
      headerName: "Balance",
      flex: 1,
      renderCell: (params) => `Rs ${params.row.balance.toFixed(2)}`,
    },
    { field: "status", headerName: "Status", flex: 1 },

    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleEdit(params.row)}>
            <EditIcon color="primary" />
          </IconButton>

          <IconButton onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon color="error" />
          </IconButton>
        </>
      ),
    },
  ];

  const handleEdit = (row: IAccountResponse) => {
    setSelectedAccount(row);
    setOpenEdit(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this account permanently?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleUpdate = () => {
    if (selectedAccount) updateMutation.mutate(selectedAccount);
  };

  // Search Filter
  const filteredAccounts =
    accounts?.filter((acc: IAccountResponse) =>
      `${acc.accountNumber} ${acc.userName} ${acc.userEmail}`
        .toLowerCase()
        .includes(search.toLowerCase())
    ) || [];

  return (
    <Box p={2}>
      <Typography variant="h5" fontWeight={600} mb={1}>
        Manage Accounts
      </Typography>
      <Typography color="text.secondary" mb={3}>
        Admin control panel to manage user bank accounts.
      </Typography>

      {/* Search */}
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <TextField
            fullWidth
            label="Search by Account Number, User Name or Email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </CardContent>
      </Card>

      {/* Table */}
      <Box height={520}>
        <DataGrid
          rows={filteredAccounts}
          columns={columns}
          getRowId={(row) => row.id}
          disableRowSelectionOnClick
          loading={isLoading}
          pageSizeOptions={[5, 10, 20]}
        />
      </Box>

      {/* Edit Dialog */}
      <Dialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit Account</DialogTitle>

        <DialogContent>
          {/* Account Number */}
          <TextField
            fullWidth
            label="Account Number"
            margin="normal"
            value={selectedAccount?.accountNumber}
            disabled
          />

          {/* Type */}
          <TextField
            fullWidth
            margin="normal"
            select
            label="Account Type"
            value={selectedAccount?.accountType || ""}
            onChange={(e) =>
              setSelectedAccount((prev) =>
                prev ? { ...prev, accountType: e.target.value } : prev
              )
            }
          >
            <MenuItem value="Savings">Savings</MenuItem>
            <MenuItem value="Current">Current</MenuItem>
          </TextField>

          {/* Status */}
          <TextField
            fullWidth
            margin="normal"
            select
            label="Status"
            value={selectedAccount?.status || ""}
            onChange={(e) =>
              setSelectedAccount((prev) =>
                prev ? { ...prev, status: e.target.value } : prev
              )
            }
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Disabled">Disabled</MenuItem>
          </TextField>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleUpdate}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageAccounts;
