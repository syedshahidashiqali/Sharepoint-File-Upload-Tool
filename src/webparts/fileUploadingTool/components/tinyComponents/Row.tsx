import * as React from "react";

export interface IRowProps {
  children: JSX.Element | JSX.Element[] | React.ReactNode | React.ReactNode[];
  customClass?: string;
}

export const Row: React.FC<IRowProps> = ({ children, customClass }) => {
  return (
    <div
      className={`ms-Grid-row ${customClass === undefined ? "" : customClass}`}
    >
      {children}
    </div>
  );
};
