import * as React from "react";

export interface IColProps {
  children: JSX.Element | JSX.Element[] | React.ReactNode | React.ReactNode[];
  sm?: number | string;
  md?: number | string;
  lg?: number | string;
  customClass?: string;
}

export const Col: React.FC<IColProps> = ({
  children,
  sm,
  md,
  lg,
  customClass,
}) => {
  return (
    <article
      className={`ms-Grid-col ms-sm${sm} ms-md${md} ms-lg${lg} ${
        customClass === undefined ? "" : customClass
      }`}
    >
      {children}
    </article>
  );
};
