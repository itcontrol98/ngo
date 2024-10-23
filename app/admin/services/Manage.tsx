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
  const router = useRouter();

  const [selectedDrivers, setSelectedDrivers] = useState<{ [key: string]: string }>({});

  const handleDriverChange = (id: string, driverId: string) => {
    setSelectedDrivers((prev) => ({
      ...prev,
      [id]: driverId,
    }));
  };

  let rows: any = [];
  if (services) {
    rows = services.map((order: any) => {
      return {
        id: order.id,
        name: order.user.name,
        contact: order.user.contact,
        email: order.user.email,
        line1: order.line1,
        state: order.state,
        message: order.message,
        district: order.district,
        date: moment(order.createdAt).fromNow(),
        status: order.status,
        drivername: order.drivername,
        drivercontact: order.drivercontact,
        drivervehiclenumber: order.drivervehiclenumber,
        deliverystatus: order.deliverystatus,
        driver: order.driver, // Add driver if available
      };
    });
  }

  const columns: GridColDef[] = [
    { field: "name", headerName: "Customer Name", width: 150 },
    { field: "contact", headerName: "Customer Contact", width: 150 },
    { field: "email", headerName: "Customer Email", width: 180 },
    { field: "line1", headerName: "Address", width: 200 },
    { field: "district", headerName: "District", width: 170 },
    { field: "state", headerName: "State", width: 170 },
    { field: "message", headerName: "Message", width: 170 },
    { field: "drivername", headerName: "Driver Name", width: 170 },
    { field: "drivercontact", headerName: "Driver Contact", width: 170 },
    { field: "drivervehiclenumber", headerName: "Driver Vehicle Number", width: 170 },
    {
      field: "drivers",
      headerName: "Drivers",
      width: 170,
      renderCell: (params) => {
        const driver = selectedDrivers[params.row.id] || params.row.driver || "";

        return (
          <FormControl size="small" className="w-75 mt-1">
            <InputLabel size="small">Driver</InputLabel>
            <Select
              value={driver}
              onChange={(event) => handleDriverChange(params.row.id, event.target.value)}
              size="small"
              disabled={
                params.row.deliverystatus === "approved" || 
                params.row.status === "confirmed" || 
                params.row.status === "cancelled"
              }
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 200,
                    width: 250,
                  },
                },
              }}
            >
              {drivers.map((data: any) => (
                <MenuItem key={data.user.id} value={data.user.id}>
                  {data.user.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      },
    },
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
    { field: "date", headerName: "Date", width: 130 },
    {
      field: "deliverystatus",
      headerName: "Delivery Boy Status",
      width: 180,
      renderCell: (params) => {
        return (
          <div className="text-secondary fw-light">
            {params.row.deliverystatus === "approved" ? (
              <Status
                icon={MdDone}
                bg="bg-success"
                color="text-white"
                text="approved"
              />
            ) : params.row.deliverystatus === "rejected" ? (
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
      field: "assign",
      headerName: "Assign",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="">
            <Button
              color="primary"
              variant="contained"
              disabled={
                params.row.deliverystatus === "approved" || 
                params.row.status === "confirmed" || 
                params.row.status === "cancelled" ||
                params.row.drivercontact
              }
              onClick={() => assignDriver(params.row.id, selectedDrivers[params.row.id])}
            >
              Assign
            </Button>
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 160,
      renderCell: (params) => {
        const isCancelled = params.row.status === "cancelled" || params.row.status === "confirmed";
        return (
          <div className="d-flex justify-content-between w-100">
            {!isCancelled && (
              <>
                <ActionBtn
                  icon={MdDone}
                  onClick={() => {
                    handleConfirmed(params.row.id);
                  }}
                />
              </>
            )}
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



  const assignDriver = useCallback((id: any, driver: string) => {
    const filteredDrivers = drivers.filter((item: any) => item.user.id === driver);
    if (filteredDrivers.length > 0) {
      const selectedDriver = filteredDrivers[0];
      
      axios
        .put("/api/assign", {
          id,
          deliverystatus: "pending",
          drivername: selectedDriver.user.name,
          drivercontact: selectedDriver.user.contact,
          drivervehicle: selectedDriver.vehicletype,
          drivervehiclenumber: selectedDriver.vehiclenumber,
          driverid: driver,
        })
        .then((res) => {
          toast.success("Assigned");
          router.refresh();
        })
        .catch((err) => {
          console.error(err);
          toast.error("Oops! Something went wrong");
        });
    } else {
      toast.error("Driver not found");
    }
  }, [drivers, router]);

  // Deliver product by admin
  const handleConfirmed = useCallback((id: string) => {
    axios
      .put("/api/status", {
        id,
        status: "confirmed",
      })
      .then((res) => {
        toast.success("Confirmed");
        router.refresh();
      })
      .catch((err) => {
        toast.error("Oops! something went wrong");
      });
  }, []);

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
        <Heading title="Manage Services" center />
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
