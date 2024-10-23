"use client";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
interface CommonButtonProps {
  id: string;
  name: string;
}
const CommonButton: React.FC<CommonButtonProps> = ({ id, name }) => {
  const router = useRouter();
  return (
    <div>
      <Button
        variant="outlined"
        color="inherit"
        className="me-3"
        onClick={() => router.push(`/appointments/${id}`)}
      >
        {name}
      </Button>
    </div>
  );
};

export default CommonButton;
