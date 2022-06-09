import * as React from "react";

export interface IContainerProps {
  children: JSX.Element | JSX.Element[] | React.ReactNode | React.ReactNode[];
  customClass?: string;
}

export const Container: React.FC<IContainerProps> = ({
  children,
  customClass,
}) => {
  return (
    <article
      className={`ms-Grid ${customClass === undefined ? "" : customClass}`}
    >
      {children}
    </article>
  );
};
