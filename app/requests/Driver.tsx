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
import { MdDone, MdCancel, MdClose } from "react-icons/md";
import ActionBtn from "@/app/components/ActionBtn";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import moment from "moment";
import React from "react";

const Deliver = ({ services, drivers }: any) => {
  const filterData = services.filter((item: any) => item.driverid === drivers);
  console.log(filterData)
  const router = useRouter();
  let rows: any = [];
  if (filterData) {
    rows = filterData.map((order: any) => {
      return {
        id: order.id,
        name: order.user.name,
        contact: order.user.contact,
        line1: order.line1,
        line2: order.line2,
        state: order.state,
        district: order.district,
        postalCode: order.postalCode,
        message: order.message,
        status: order.deliverystatus,
      };
    });
  }

  const columns: GridColDef[] = [
    { field: "name", headerName: "Client Name", width: 170 },
    { field: "contact", headerName: "Client Contact", width: 170 },
    { field: "line1", headerName: "Client Address", width: 170 },
    { field: "line2", headerName: "Line 2", width: 170 },
    { field: "district", headerName: "District", width: 170 },
    { field: "state", headerName: "State", width: 170 },
    { field: "postalCode", headerName: "Pincode", width: 170 },
    { field: "message", headerName: "Message", width: 170 },
    {
      field: "status",
      headerName: "Service Status",
      width: 180,
      renderCell: (params) => {
        return (
          <div className="text-secondary fw-light">
            {params.row.status === "approved" ? (
              <Status
                icon={MdDone}
                bg="bg-success"
                color="text-white"
                text="approved"
              />
            ) : params.row.status === "rejected" ? (
              <Status
                icon={MdClose}
                bg="bg-danger"
                color="text-white"
                text="rejected"
              />
            ) : (
              <Status
                icon={MdClose}
                bg="bg-secondary"
                color="text-white"
                text="pending"
              />
            )}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        const isCancelled = params.row.status === "rejected";
        return (
          <div className="d-flex justify-content-between w-100">
            {!isCancelled && (
              <>
              <ActionBtn
                  icon={MdDone}
                  onClick={() => {
                    handleApprove(params.row.id);
                  }}
                />
                <ActionBtn
                  icon={MdCancel}
                  onClick={() => {
                    handleReject(params.row.id);
                  }}
                />
                
              </>
            )}
          </div>
        );
      },
    },
  ];

  // Approved Order
  const handleApprove = useCallback((id: string) => {
    axios
      .put("/api/status", {
        id,
        deliverystatus: "approved",
      })
      .then((res) => {
        toast.success("Approved");
        router.refresh();
      })
      .catch((err) => {
        toast.error("Oops! something went wrong");
      });
  }, []);
  // Reject Order
  const handleReject = useCallback((id: string) => {
    axios
      .put("/api/status", {
        id,
        deliverystatus: "rejected",
      })
      .then((res) => {
        toast.success("Rejected");
        router.refresh();
      })
      .catch((err) => {
        toast.error("Oops! something went wrong");
      });
  }, []);

  return (
    <div style={{ width: "100%" }} className="my-4">
      <div>
        <Heading title="View Requests" center />
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

export default Deliver;
