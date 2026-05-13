import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`
        w-full mx-auto
        px-5 sm:px-8 md:px-10 lg:px-12
        max-w-7xl
        py-10
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Container;
