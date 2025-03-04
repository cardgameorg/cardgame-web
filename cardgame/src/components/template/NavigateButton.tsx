import { ButtonHTMLAttributes, ReactNode } from "react"
import { Navigate, useLocation, useNavigate } from "react-router";

type NavigateButtonProps = {
    to: string;
    children: ReactNode;
  } & ButtonHTMLAttributes<HTMLButtonElement>;
  
  const NavigateButton: React.FC<NavigateButtonProps> = ({ to, children, ...props }) => {
    const navigate = useNavigate();
  
    const handleClick = () => {
      navigate(to);
    };
  
    return (
      <button onClick={handleClick} {...props}>
        {children}
      </button>
    );
  };
  
  export default NavigateButton;
  