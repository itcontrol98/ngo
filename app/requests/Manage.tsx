"use client";
import { useCallback, useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridToolbarExport,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import { MdDeliveryDining, MdDone, MdCancel, MdClose } from "react-icons/md";
import ActionBtn from "@/app/components/ActionBtn";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import moment from "moment";
import React from "react";

const Manage = ({ services, drivers }: any) => {
const filterData = services.filter((item:any)=>item.userId === drivers)
  const router = useRouter();
  let rows: any = [];
  if (filterData) {
    rows = filterData.map((order: any) => {
      return {
        id: order.id,
        status: order.status,
        drivername: order.drivername,
        drivercontact: order.drivercontact,
        drivervehiclenumber: order.drivervehiclenumber,
        drivervehicle: order.drivervehicle,
      };
    });
  }

  const columns: GridColDef[] = [
    { field: "drivername", headerName: "Drivery Name", width: 170 },
    { field: "drivercontact", headerName: "Drivery Contact", width: 170 },
    { field: "drivervehicle", headerName: "Drivery Vehicle Type", width: 170 },
    { field: "drivervehiclenumber", headerName: "Drivery Vehicle Number", width: 170 },
    {
      field: "status",
      headerName: "Service Status",
      width: 180,
      renderCell: (params) => {
        return (
          <div className="text-secondary fw-light">
            {params.row.status === "confirmed" ? (
              <Status
                icon={MdDone}
                bg="bg-success"
                color="text-white"
                text="confirmed"
              />
            ) : params.row.status === "resolved" ? (
              <Status
                icon={MdDone}
                bg="bg-warning"
                color="text-white"
                text="resolved"
              />
            ) : params.row.status === "cancelled" ? (
              <Status
                icon={MdClose}
                bg="bg-danger"
                color="text-white"
                text="cancelled"
              />
            ) : params.row.status === "approved" ? (
              <Status
                icon={MdClose}
                bg="bg-secondary"
                color="text-white"
                text="pending"
              />
            ) : params.row.status === "rejected" ? (
              <Status
                icon={MdClose}
                bg="bg-secondary"
                color="text-white"
                text="pending"
              />
            )
             : (
              <Status
                icon={MdClose}
                bg="bg-secondary"
                color="text-white"
                text="pending"
              />
            )
            }
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Cancel",
      width: 200,
      renderCell: (params) => {
        const isCancelled = params.row.status === "cancelled" || params.row.status === "confirmed";
        return (
          <div className="d-flex justify-content-between w-100">
            {!isCancelled && (
              <ActionBtn
                icon={MdCancel}
                onClick={() => {
                  handleCancel(params.row.id);
                }}
              />
            )}
          </div>
        );
      },
    },
  ];

  // Cancel Order
  const handleCancel = useCallback((id: string) => {
    axios
      .put("/api/status", {
        id,
        status: "cancelled",
      })
      .then((res) => {
        toast.success("Cancelled");
        router.refresh();
      })
      .catch((err) => {
        toast.error("Oops! something went wrong");
      });
  }, []);

  return (
    <div style={{ width: "100%" }} className="my-4">
      <div>
        <Heading title="View Services" center />
      </div>
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
            border: "none",
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
    </div>
  );
};

export default Manage;
