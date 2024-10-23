"use client";
import { useState, useCallback } from "react";
import { Col, Container, Form, Image, Row } from "react-bootstrap";
import { DataGrid, GridColDef, GridToolbar, GridToolbarExport, GridToolbarQuickFilter } from "@mui/x-data-grid";
import { Driver} from "@prisma/client";
import Heading from "@/app/components/Heading";
import { AiFillEdit } from "react-icons/ai";
import ActionBtn from "@/app/components/ActionBtn";
import { useRouter } from "next/navigation";
import { Box } from "@mui/material";

interface ManageProductsClientsProps {
    drivers: Driver[];
}
const ShowDriver: React.FC<ManageProductsClientsProps> = ({
    drivers,
}) => {
  const router = useRouter();


  let rows: any = [];
  if (drivers) {
    rows = drivers.map((data) => {
      return {
        id: data.id,
        name: data.user.name,
        contact: data.user.contact,
        email: data.user.email,
        vehicletype: data.vehicletype,
        vehiclenumber: data.vehiclenumber,
        status: data.status
      };
    });
  }

  const columns: GridColDef[] = [
    { field: "name", headerName: "Driver Name", width: 150 },
    { field: "contact", headerName: "Driver Contact", width: 150 },
    { field: "email", headerName: "Driver Email", width: 180 },
    { field: "vehicletype", headerName: "Vehicle Type", width: 150 },
    { field: "vehiclenumber", headerName: "Vehicle Number", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div
            className="d-flex justify-content-between align-items-center w-100"
          >
            {/* <ActionBtn
              icon={MdDelete}
              onClick={() => {
                handleDelete(params.row.id, params.row.images);
              }}
            /> */}
            <ActionBtn
              icon={AiFillEdit}
              onClick={() => router.push(`/admin/managedriver/${params.row.id}`)}
            />
          </div>
        );
      },
    },
  ];
  
  return (
    <div style={{ width: "100%" }} className="my-4">
      <div>
        <Heading title="Manage Drivers" center />
      </div>
      <Container>
        <Row>
          <Col md={12} className="my-3">
            <Box sx={{ height: "400px", width: "100%" }}>
              <DataGrid
                disableColumnFilter
                disableColumnSelector
                disableDensitySelector
                disableRowSelectionOnClick
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
    </div>
  );
};

export default ShowDriver;
