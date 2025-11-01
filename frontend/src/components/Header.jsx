import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
export const Header = ({ data }) => {
  const handleNavigate = useNavigate();
  const handleBack = () => {
    handleNavigate(-1);
  };

  return (
    <header className="fixed z-[100] h-[var(--nav-h)] bg-base-200 flex items-center gap-2 px-2 w-full">
      <Link onClick={handleBack}>
        <ArrowLeft size={30} strokeWidth={4} />
      </Link>

      <h1 className="font-bold">{data}</h1>
    </header>
  );
};
