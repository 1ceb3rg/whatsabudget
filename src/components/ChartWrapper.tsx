import React from "react";

interface ChartWrapperProps {
  children: React.ReactNode;
  title: string;
}
export default function ChartWrapper(props: ChartWrapperProps) {
  const { children, title } = props;

  return (
    <div className="mt-2 rounded-lg border bg-white  pb-2 shadow  ">
      <div className="mb-2 rounded-t-lg border-b p-4 text-center text-xl">
        {title}
      </div>
      {children}
    </div>
  );
}
