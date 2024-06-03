import React from "react";

interface IBoxProps {
  children: React.ReactNode;
}

const Box: React.FC<IBoxProps> = ({children}) => {
  return (
    <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow">
      {children}
    </div>
  )
}

export default Box;
