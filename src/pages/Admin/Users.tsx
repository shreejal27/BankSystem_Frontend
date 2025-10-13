import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import BlockIcon from "@mui/icons-material/Block";
// import axios from "axios";

interface IUser {
  id: string;
  fullName: string;
  email: string;
  status: "Active" | "Inactive";
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Load dummy users on mount (for testing layout)
  useEffect(() => {
    const dummyData: IUser[] = [
      {
        id: "1",
        fullName: "John Doe",
        email: "john@example.com",
        status: "Active",
      },
      {
        id: "2",
        fullName: "Jane Smith",
        email: "jane@example.com",
        status: "Inactive",
      },
      {
        id: "3",
        fullName: "Robert Brown",
        email: "robert@example.com",
        status: "Active",
      },
      {
        id: "4",
        fullName: "Emily Davis",
        email: "emily@example.com",
        status: "Active",
      },
    ];

    // simulate small delay for loading spinner
    setTimeout(() => {
      setUsers(dummyData);
      setFilteredUsers(dummyData);
      setLoading(false);
    }, 800);
  }, []);

  // Search filter
  useEffect(() => {
    const lower = searchTerm.toLowerCase();
    const filtered = users.filter((u) =>
      u.fullName.toLowerCase().includes(lower)
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  // Edit button handler
  const handleEdit = (id: string) => {
    console.log("Edit user:", id);
  };

  // Deactivate user handler
  const handleDeactivate = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: "Inactive" } : u))
    );
  };

  const columns: GridColDef[] = [
    { field: "fullName", headerName: "Full Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "status", headerName: "Status", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <>
          <Tooltip title="Edit">
            <IconButton
              color="primary"
              onClick={() => handleEdit(params.row.id)}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Deactivate">
            <IconButton
              color="error"
              onClick={() => handleDeactivate(params.row.id)}
              disabled={params.row.status === "Inactive"}
            >
              <BlockIcon />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" fontWeight={600} mb={2}>
        Manage Users
      </Typography>

      <TextField
        label="Search by name"
        variant="outlined"
        size="small"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 2, width: "300px" }}
      />

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <DataGrid
          rows={filteredUsers}
          columns={columns}
          getRowId={(row) => row.id}
          autoHeight
          disableRowSelectionOnClick
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              fontWeight: 600,
              background: "#f5f5f5",
            },
          }}
        />
      )}
    </Box>
  );
};

export default Users;
