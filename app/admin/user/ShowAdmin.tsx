"use client";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState, useMemo, useCallback } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import CachedIcon from "@mui/icons-material/Cached";
import Status from "@/app/components/Status";
import { MdClose, MdDone } from "react-icons/md";
import {
  DataGrid,
  GridToolbar,
  GridToolbarQuickFilter,
  GridToolbarExport,
} from "@mui/x-data-grid";
import Heading from "@/app/components/Heading";
import { User } from "@prisma/client";

interface ShowUserProps {
  users:User[]
}

const ShowUser:React.FC<ShowUserProps> = ({users}) => {
  const router = useRouter();


  let rows: any = [];
  if (users) {
    rows = users.map((user) => {
      return {
        id: user.id,
        name: user.name,
        contact: user.contact,
        email: user.email,
        role: user.role,
        isEnabled: user.isEnabled,
      };
    });
  }

  const handleToggleStatus = useCallback((id: string, isEnabled: boolean) => {
    axios
      .put(`/api/userstatus`, {
        id,
        isEnabled: !isEnabled,
      })
      .then((res) => {
        toast.success("User status changed");
        router.refresh();
      })
      .catch((err) => {
        toast.error("Oops! something went wrong");
      });
  }, []);

  // Call Delete API
  const deleteUser = async (id: any) => {
    if (confirm("Do you want to Delete ?") === true) {
      try {
        let response = await fetch(`/api/user/${id}`, {
          method: "DELETE",
          cache: "no-cache",
        });
        toast.success("User deleted successfully");
        router.refresh();
      } catch (error) {
        toast.error("An error occurred while deleting the User");
      }
    }
  };

  const columns = useMemo(
    () => [
      {
        field: "name",
        headerName: "Name",
        width: 200,
      },
      { field: "email", headerName: "Email", width: 200 },
      { field: "contact", headerName: "Contact", width: 200 },
      { field: "role", headerName: "Role", width: 200 },
      {
        field: "isEnabled",
        headerName: "User Status",
        width: 180,
        renderCell: (params: any) => {
          return (
            <div className="text-secondary  fw-light">
              {params.row.isEnabled === true ? (
                <Status
                  icon={MdDone}
                  bg="bg-success"
                  color="text-white"
                  text="Active"
                />
              ) : (
                <Status
                  icon={MdClose}
                  bg="bg-danger"
                  color="text-white"
                  text="Inactive"
                />
              )}
            </div>
          );
        },
      },
      {
        field: "statuschange",
        headerName: "User Status",
        width: 100,
        renderCell: (params: any) => (
          <CachedIcon
            onClick={() => {
              handleToggleStatus(params.row.id, params.row.isEnabled);
            }}
            color="success"
            fontSize="large"
            style={{ cursor: "pointer" }}
            className="ms-2 mt-2 p-1"
          />
        ),
      },
      {
        field: "update",
        headerName: "Update",
        width: 100,
        renderCell: (params: any) => (
          <EditIcon
            onClick={() => router.push(`/admin/user/${params.id}`)}
            color="success"
            fontSize="large"
            style={{ cursor: "pointer" }}
            className="ms-2 mt-2 p-1"
          />
        ),
      },
      {
        field: "delete",
        headerName: "Delete",
        width: 100,
        renderCell: (params: any) => (
          <DeleteForeverIcon
            onClick={() => deleteUser(params.row.id)}
            color="error"
            fontSize="large"
            style={{ cursor: "pointer" }}
            className="ms-2 mt-2 p-1"
          />
        ),
      },
    ],
    [users]
  );

  return (
    <Container>
      <Row>
        <Col md={12} className="my-3">
        <div>
        <Heading title="Manage User" center />
      </div>
          <Box sx={{ width: "100%" }}>
            <DataGrid
              disableColumnFilter
              disableColumnSelector
              disableDensitySelector
              rows={rows}
              columns={columns}
              hideFooter={true}
              getRowId={(row) => row.id}
              slots={{ toolbar: GridToolbar }}
              sx={{
                "& .MuiDataGrid-row.Mui-selected": {
                  backgroundColor: "inherit",
                },
                "& .MuiDataGrid-row:hover": {
                  backgroundColor: "inherit",
                },
                "& .MuiDataGrid-cell": {
                  color: "#000",
                },
                "& .MuiDataGrid-cell:focus": {
                  outline: "none",
                },
                "& .MuiDataGrid-row.Mui-selected:hover": {
                  backgroundColor: "inherit",
                },
                "& .MuiDataGrid-cell:focus-within": {
                  outline: "none",
                },
                "& .MuiDataGrid-toolbarContainer": {
                  color: "black",
                },
                "& .MuiInputBase-root": {
                  color: "black",
                },
                "& .MuiInputBase-root .MuiInputBase-input": {
                  color: "black",
                },
                "& .MuiInput-underline:before": {
                  borderBottomColor: "black",
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "black",
                },
                "& .MuiSvgIcon-root": {
                  color: "black",
                },
              }}
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                  quickFilterProps: {
                    debounceMs: 500,
                  },
                  components: {
                    QuickFilter: GridToolbarQuickFilter,
                    Export: GridToolbarExport,
                  },
                },
              }}
            />
          </Box>
        </Col>
      </Row>
    </Container>
  );
};

export default ShowUser;
