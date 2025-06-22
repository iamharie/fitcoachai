import { useLocation, useNavigate } from "react-router-dom";

export function useScrollToSection() {
  const location = useLocation();
  const navigate = useNavigate();

  return (sectionId: string) => {
    if (location.pathname !== "/") {
      navigate("/", { replace: false });
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };
}

export default useScrollToSection;
