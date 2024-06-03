import React from "react";

interface IHeadingProps {
  title: string;
  className?: string | undefined;
  subheading?: boolean;
}

const Heading: React.FC<IHeadingProps> = ({title, className, subheading = false}) => {
  if (subheading) {
    return (
      <h3 className={`mb-2 text-2xl md:text-3xl text-center  tracking-tight text-gray-900 dark:text-white ${className}`}>
        {title}
      </h3>
    )
  }

  return (
    <h1
      className={`mb-4 text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white ${className}`}>
      {title}
    </h1>
  )
}

export default Heading;
