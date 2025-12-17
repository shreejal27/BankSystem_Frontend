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
import ActiveUserIcon from "@mui/icons-material/Person";
import InactiveUserIcon from "@mui/icons-material/PersonOff";
import {
  useActivateUser,
  useDeactivateUser,
  useGetAllUsers,
} from "../../queries/Admin/UserCommand";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "../../components/ConfirmDialog";

interface IUser {
  id: string;
  fullName: string;
  email: string;
  status: "Active" | "Inactive";
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [actionType, setActionType] = useState<
    "activate" | "deactivate" | null
  >(null);

  const openConfirmDialog = (
    userId: string,
    action: "activate" | "deactivate"
  ) => {
    setSelectedUserId(userId);
    setActionType(action);
    setConfirmOpen(true);
  };

  const { data: allUserData, isLoading, refetch } = useGetAllUsers("all");

  useEffect(() => {
    if (allUserData && Array.isArray(allUserData)) {
      const formatted: IUser[] = allUserData.map((u: any) => ({
        id: u.id,
        fullName: u.name,
        email: u.email,
        status: u.isActive ? "Active" : "Inactive",
      }));
      setUsers(formatted);
      setFilteredUsers(formatted);
    }
  }, [allUserData]);

  useEffect(() => {
    const lower = searchTerm.toLowerCase();
    const filtered = users.filter((u) =>
      u.fullName.toLowerCase().includes(lower)
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const handleEdit = (id: string) => {
    navigate(`edit/${id}`);
  };

  const activateUser = useActivateUser();
  const deactivateUser = useDeactivateUser();

  const handleConfirmAction = () => {
    if (!selectedUserId || !actionType) return;

    if (actionType === "activate") {
      activateUser.mutate(selectedUserId, {
        onSuccess: () => {
          refetch();
          setConfirmOpen(false);
        },
      });
    } else {
      deactivateUser.mutate(selectedUserId, {
        onSuccess: () => {
          refetch();
          setConfirmOpen(false);
        },
      });
    }
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

          {params.row.status === "Active" ? (
            <Tooltip title="Deactivate">
              <IconButton
                color="error"
                onClick={() => openConfirmDialog(params.row.id, "deactivate")}
                disabled={deactivateUser.isPending}
              >
                <ActiveUserIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Activate">
              <IconButton
                color="success"
                onClick={() => openConfirmDialog(params.row.id, "activate")}
                disabled={activateUser.isPending}
              >
                <InactiveUserIcon />
              </IconButton>
            </Tooltip>
          )}
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

      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <DataGrid
          rows={filteredUsers}
          columns={columns}
          getRowId={(row) => row.id}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10, 25, 50]}
          disableRowSelectionOnClick
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              fontWeight: 600,
              background: "#f5f5f5",
            },
          }}
        />
      )}

      <ConfirmDialog
        open={confirmOpen}
        title={actionType === "activate" ? "Activate User" : "Deactivate User"}
        message={`Are you sure you want to ${actionType} this user?`}
        confirmText={actionType === "activate" ? "Activate" : "Deactivate"}
        confirmColor={actionType === "activate" ? "success" : "error"}
        loading={activateUser.isPending || deactivateUser.isPending}
        onConfirm={handleConfirmAction}
        onCancel={() => setConfirmOpen(false)}
      />
    </Box>
  );
};

export default Users;
