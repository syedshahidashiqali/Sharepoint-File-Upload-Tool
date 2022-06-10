import * as React from "react";
import "./FileUploadingTool.scss";
import { IFileUploadingToolProps } from "./IFileUploadingToolProps";
import { Container } from "./tinyComponents/Container";
import { Row } from "./tinyComponents/Row";
import { Col } from "./tinyComponents/Col";
import { useState, useEffect } from "react";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";

// office ui components
import {
  Label,
  TextField,
  Dropdown,
  DatePicker,
  Toggle,
  IDropdownOption,
} from "office-ui-fabric-react";

// export interface IFileUploadToolState {
//   Title: string;
//   DocType: any;
//   Categories: any;
//   Status: any;
//   DocTypeValue: string;
//   Department: string;
//   SecurityLevel: string;
//   Date: string;
//   Comment: string;
//   Version: string;
//   DateUploaded: string;
//   Timeline: string;
//   DocumentOwner: any;
//   BussinessOwner: any;
//   PrimaryApproval: any;
//   SecondaryApproval: any;
//   Acknowledgment: any;
//   _DocTypesOptions: any;
//   _DepartmentsOptions: any;
//   _SecurityLevelOptions: any;
//   _ExpiryTimelineOptions: any;
// }

const FileUploadingTool: React.FC<IFileUploadingToolProps> = (props) => {
  const [documentTitle, setDocumentTitle] = useState<string>("");
  const [documentTypeOptions, setDocumentTypeOptions] = useState<any>([]);
  const [documentTypeValue, setDocumentTypeValue] = useState<
    IDropdownOption | ""
  >("");
  const [departmentOptions, setDepartmentOptions] = useState<any>([]);
  const [departmentValue, setDepartmentValue] = useState<IDropdownOption | "">(
    ""
  );

  // First field document name Handler
  const documentTitleChangeHandler = React.useCallback(
    (
      event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
      newValue?: string
    ) => {
      if (!newValue || newValue.length <= 5) {
        setDocumentTitle(newValue || "");
      }
    },
    []
  );

  // docType input options fetcher func
  const getDocType = (): Promise<any> => {
    try {
      let url: string = `${props.context.pageContext.web.absoluteUrl}/_api/web/lists/getByTitle('Drop Off Library')/fields?$filter=EntityPropertyName eq 'Document_x0020_Type'`;
      return props.context.spHttpClient
        .get(url, SPHttpClient.configurations.v1)
        .then((response: SPHttpClientResponse) => {
          if (response.ok) {
            return response.json();
          }
        });
    } catch (error) {
      console.log("Doc Type Error: ", error);
    }
  };

  // docType input options fetcher func
  const getDepartment = (): Promise<any> => {
    try {
      let url: string = `${props.context.pageContext.web.absoluteUrl}/_api/web/lists/getByTitle('Drop Off Library')/fields?$filter=EntityPropertyName eq 'Department'`;
      return props.context.spHttpClient
        .get(url, SPHttpClient.configurations.v1)
        .then((response: SPHttpClientResponse) => {
          if (response.ok) {
            return response.json();
          }
        });
    } catch (error) {
      console.log("Doc Type Error: ", error);
    }
  };

  useEffect(() => {
    // Fetching Doc Type data
    getDocType().then((response) => {
      const values = response.value[0].Choices.map((item, index) => ({
        key: item,
        text: item,
      }));
      setDocumentTypeOptions(values);
    });

    // Fetching Departments data
    getDepartment().then((response) => {
      const values = response.value[0].Choices.map((item, index) => ({
        key: item,
        text: item,
      }));
      setDepartmentOptions(values);
    });
  }, []);
  return (
    <section className="fileUploadingToolWrapper">
      <Container>
        <Row>
          <Col lg={12} md={12} sm={12}>
            <div className="headingWrapper">
              <h1>Document Upload Tool</h1>
            </div>
          </Col>
        </Row>
        <form className="fileUploadingForm">
          <Row>
            <Col lg={6} md={6} sm={12}>
              <div className="inputWrapper">
                <Label htmlFor="documentName" required>
                  Document Name
                </Label>
                <TextField
                  id="documentName"
                  onChange={documentTitleChangeHandler}
                />
              </div>
            </Col>
            <Col lg={6} md={6} sm={12}>
              <div className="inputWrapper">
                <Dropdown
                  label="Document Type"
                  placeholder="Select Doc Type"
                  options={documentTypeOptions}
                  required={true}
                  onChange={(
                    event: React.FormEvent<HTMLDivElement>,
                    item: IDropdownOption
                  ): void => setDocumentTypeValue(item)}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={6} md={6} sm={12}>
              <div className="inputWrapper" style={{ marginTop: "5px" }}>
                <Dropdown
                  label="Department"
                  placeholder="Select Department"
                  options={departmentOptions}
                  required={true}
                  onChange={(
                    event: React.FormEvent<HTMLDivElement>,
                    item: IDropdownOption
                  ): void => setDepartmentValue(item)}
                />
              </div>
            </Col>
            <Col lg={6} md={6} sm={12}>
              <div className="inputWrapper" style={{ marginTop: "5px" }}>
                <Label htmlFor="documentVersion" required>
                  Version
                </Label>
                <TextField id="documentVersion" />
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={6} md={6} sm={12}>
              <div className="inputWrapper" style={{ marginTop: "5px" }}>
                <Label htmlFor="documentOwner">Document Owner</Label>
                <TextField id="documentOwner" />
              </div>
            </Col>
            <Col lg={6} md={6} sm={12}>
              <div className="inputWrapper" style={{ marginTop: "5px" }}>
                <Label htmlFor="bussinessOwner">Bussiness Owner</Label>
                <TextField id="bussinessOwner" />
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={6} md={6} sm={12}>
              <div className="inputWrapper" style={{ marginTop: "5px" }}>
                <Dropdown
                  label="Department"
                  placeholder="Select Department"
                  options={[
                    { key: "A", text: "Option a", title: "I am option a." },
                    { key: "B", text: "Option b" },
                    { key: "C", text: "Option c" },
                    { key: "D", text: "Option d" },
                    { key: "E", text: "Option e" },
                  ]}
                  required={true}
                />
              </div>
            </Col>
            <Col lg={6} md={6} sm={12}>
              <div className="inputWrapper" style={{ marginTop: "5px" }}>
                <Label htmlFor="primaryApprover">Primary Approver</Label>
                <TextField id="primaryApprover" />
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={6} md={6} sm={12}>
              <div className="inputWrapper" style={{ marginTop: "5px" }}>
                <Label htmlFor="secondaryApprover">Secondary Approver</Label>
                <TextField id="secondaryApprover" />
              </div>
            </Col>
            <Col lg={6} md={6} sm={12}>
              <div className="inputWrapper" style={{ marginTop: "5px" }}>
                <DatePicker
                  isRequired
                  label="Date Uploaded"
                  allowTextInput
                  ariaLabel="Select a date. Input format is day slash month slash year."
                  // value={value}
                  // onSelectDate={setValue as (date?: Date) => void}
                  // formatDate={onFormatDate}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={6} md={6} sm={12}>
              <div className="inputWrapper" style={{ marginTop: "5px" }}>
                <DatePicker
                  isRequired
                  label="Expiry Date"
                  allowTextInput
                  ariaLabel="Select a date. Input format is day slash month slash year."
                  // value={value}
                  // onSelectDate={setValue as (date?: Date) => void}
                  // formatDate={onFormatDate}
                />
              </div>
            </Col>
            <Col lg={6} md={6} sm={12}>
              <div className="inputWrapper" style={{ marginTop: "5px" }}>
                <Toggle
                  label={<div>Acknowledgement</div>}
                  // onText="On"
                  // offText="Off"
                  // onChange={(e) => console.log(e)}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={6} md={6} sm={12}>
              <div className="inputWrapper" style={{ marginTop: "5px" }}>
                <Dropdown
                  label="Expiry Timeline"
                  placeholder="Select Expiry Timeline"
                  options={[
                    { key: "A", text: "Option a", title: "I am option a." },
                    { key: "B", text: "Option b" },
                    { key: "C", text: "Option c" },
                    { key: "D", text: "Option d" },
                    { key: "E", text: "Option e" },
                  ]}
                  required={true}
                />
              </div>
            </Col>
            <Col lg={6} md={6} sm={12}>
              <div className="inputWrapper" style={{ marginTop: "5px" }}>
                <Label htmlFor="fileInput">Attachment(Document)</Label>
                <input type="file" id="fileInput" size={20} />
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={12} md={12} sm={12}>
              <div
                className="inputWrapper"
                style={{
                  marginTop: "15px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <button className="cancelBtn">Cancel</button>
                <button className="submitBtn" type="submit">
                  Submit
                </button>
              </div>
            </Col>
          </Row>
        </form>
      </Container>
    </section>
  );
};

export default FileUploadingTool;
