import { useAuth } from "@/features/auth/hooks";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <div>{/* Banner */}</div>
    </div>
  );
}
