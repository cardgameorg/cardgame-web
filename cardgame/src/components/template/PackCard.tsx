import { HTMLAttributes } from 'react';
import NavigateButton from './NavigateButton';
import { useNavigate } from 'react-router';

type PackCardProps = {
  title: string;
  description: string;
  author: string;
  className?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, 'className'>; // Exclude className from props

const PackCard: React.FC<PackCardProps> = ({ title, description, author, className = '', ...props }) => {

    const navigate = useNavigate();
  
    const handleClick = () => {
      navigate("/discover/home");
    };
  return (
    <div
        onClick={handleClick}
      className={`min-w-64 max-w-64 h-86   w-full bg-secondary-bg p-4 gap-6 cursor-pointer hover:scale-105 
         -mr-32 hover:-mr-8 transition-all 
          flex flex-col shadow-center rounded-3xl ${className}`}
      {...props}
    >
        <h1 className="text-main-text font-black text-xl line-clamp-3 text-wrap">{title}</h1>
        <p className="text-secondary-text">{description}</p>
        <div className="w-full justify-between mt-auto flex flex-row">
          <p className="text-secondary-text">Author:</p>
            <p className="hover:font-bold cursor-pointer">@{author}</p>
        </div>
      </div>
  );
};

export default PackCard;
