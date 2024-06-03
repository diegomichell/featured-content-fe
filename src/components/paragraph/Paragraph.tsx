import React from "react";

interface IParagraphProps {
  text: string;
  className?: string | undefined;
}
const Paragraph: React.FC<IParagraphProps> = ({text, className}) => {
  return (
    <p className={`mb-4 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400 ${className}`}>
      {text}
    </p>
  )
}

export default Paragraph;
