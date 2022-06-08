import * as React from "react";
import styles from "./FileUploadingTool.module.scss";
import { IFileUploadingToolProps } from "./IFileUploadingToolProps";

const FileUploadingTool: React.FC<IFileUploadingToolProps> = (props) => {
  return (
    <section className={styles.fileUploadingToolWrapper}>
      <article className={styles.container}>FC hello</article>
    </section>
  );
};

export default FileUploadingTool;
