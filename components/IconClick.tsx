import { JSX, ReactNode } from "react";

interface IconClickProps {
  icon: ReactNode;
  link: string;
  className?: string;
}

const IconClick = ({
  icon,
  link,
  className = "",
}: IconClickProps): JSX.Element => {
  return (
    <a
      className={className}
      href={link}
      target="_blank"
      rel="noopener noreferrer"
    >
      {icon}
    </a>
  );
};

export default IconClick;
