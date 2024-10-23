"use client";
import { Driver, Service, User } from "@prisma/client";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Link from "next/link";

interface SummaryProps {
  driver: Driver[];
  services: Service[];
  users: User[];
}

type SummaryDataType = {
  [key: string]: {
    label: string;
    digit: number;
    bgColor: string;
    url: string;
  };
};

const Summary: React.FC<SummaryProps> = ({ driver, users, services }) => {
  const [SummaryData, setSummaryData] = useState<SummaryDataType>({
    totalDriver: {
      label: "Total Driver",
      digit: 0,
      bgColor: "bg-green-100",
      url: "/admin/managedriver",
    },
    totalClient: {
      label: "Total Client",
      digit: 0,
      bgColor: "bg-yellow-100",
      url: "/admin/user",
    },
    totalServices: {
      label: "Total Services",
      digit: 0,
      bgColor: "bg-pink-100",
      url: "/admin/services",
    },
    pendingServices: {
      label: "Pending Services",
      digit: 0,
      bgColor: "bg-blue-100",
      url: "/admin/services",
    },
    resolvedServices: {
      label: "Resolved Services",
      digit: 0,
      bgColor: "bg-purple-100",
      url: "/admin/services",
    }
  });

  useEffect(() => {
    setSummaryData((prev) => {
      let tempData = { ...prev };
      const totalServices = services.filter((service) => service.status === "confirmed");
      const pendingServices = services.filter((service) => service.status === "pending");
      tempData.totalServices.digit = totalServices.length;
      tempData.totalDriver.digit = driver.length;
      tempData.totalClient.digit = users.filter(user => user.role === "USER").length;
      tempData.totalServices.digit = services.length;
      tempData.pendingServices.digit = pendingServices.length;

      return tempData;
    });
  }, [driver, users, services]);

  const summaryKeys = Object.keys(SummaryData);

  return (
    <Container>
      <Row className="my-3">
        {summaryKeys.map((key) => (
          <Col key={key} md={3} xs={6}>
            <Link href={`${SummaryData[key].url}`} style={{ textDecoration: "none", color: "black" }}>
              <div
                id="Admin"
                className={`d-flex shadow gap-2 my-3 align-items-center flex-column justify-content-center ${SummaryData[key].bgColor}`}
                style={{ borderRadius: "5%" }}
              >
                <div className="py-4 text-center">
                  <div className={`fw-semibold py-2 ${summaryKeys.length < 4 ? 'fs-5' : 'fs-6'}`}>
                      <>{SummaryData[key].digit}</>
                  </div>
                  <div className="fs-6">{SummaryData[key].label}</div>
                </div>
              </div>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Summary;
