import * as React from "react";
import "./FileUploadingTool.scss";
import { IFileUploadingToolProps } from "./IFileUploadingToolProps";
import { Container } from "./tinyComponents/Container";
import { Row } from "./tinyComponents/Row";
import { Col } from "./tinyComponents/Col";
import { useState, useEffect } from "react";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import { getSP } from "../pnpjsConfig";
import "@pnp/sp/webs";
import "@pnp/sp/files";
import "@pnp/sp/folders";
import {
  PeoplePicker,
  PrincipalType,
} from "@pnp/spfx-controls-react/lib/PeoplePicker";

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
  const [documentTypeOptions, setDocumentTypeOptions] = useState<
    [] | IDropdownOption[]
  >([]);
  const [documentTypeValue, setDocumentTypeValue] = useState<
    IDropdownOption | string
  >("");
  const [departmentOptions, setDepartmentOptions] = useState<
    [] | IDropdownOption[]
  >([]);
  const [departmentValue, setDepartmentValue] = useState<
    IDropdownOption | string
  >("");
  const [documentVersion, setDocumentVersion] = useState<string>("");
  const [securityLevelOptions, setSecurityLevelOptions] = useState<
    [] | IDropdownOption[]
  >([]);
  const [securityLevelValue, setSecurityLevelValue] = useState<
    IDropdownOption | string
  >("");
  const [uploadedDate, setUploadedDate] = React.useState<Date | undefined>();
  const [expiryDate, setExpiryDate] = React.useState<Date | undefined>();
  const [acknowledgement, setAcknowledgement] = React.useState<boolean>(false);
  const [expiryTimelineOptions, setExpiryTimelineOptions] = useState<
    [] | IDropdownOption[]
  >([]);
  const [expiryTimelineValue, setExpiryTimelineValue] = useState<
    IDropdownOption | string
  >("");

  const [docOwner, setDocOwner] = useState<any[] | string>([]);
  const [businessOwner, setBusinessOwner] = useState<any[] | string>([]);
  const [primaryApprover, setPrimaryApprover] = useState<any[] | string>([]);
  const [secondaryApprover, setSecondaryApprover] = useState<any[] | string>(
    []
  );

  const inputFileRef = React.useRef<HTMLInputElement | null>(null);

  // First field document name Handler
  const documentTitleChangeHandler = React.useCallback(
    (
      event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
      newValue?: string
    ) => setDocumentTitle(newValue || ""),
    []
  );
  // Fourth field document version Handler
  const documentVersionChangeHandler = React.useCallback(
    (
      event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
      newValue?: string
    ) => setDocumentVersion(newValue || ""),
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

  // department input options fetcher func
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

  // security level input options fetcher func
  const getSecurityLevel = (): Promise<any> => {
    try {
      let url: string = `${props.context.pageContext.web.absoluteUrl}/_api/web/lists/getByTitle('Drop Off Library')/fields?$filter=EntityPropertyName eq 'Security_x0020_Level'`;
      return props.context.spHttpClient
        .get(url, SPHttpClient.configurations.v1)
        .then((response: SPHttpClientResponse) => {
          if (response.ok) {
            return response.json();
          }
        });
    } catch (error) {
      console.log("Get Security Level Error: ", error);
    }
  };

  // expiry timeline  input options fetcher func
  const getExpiryTimeline = (): Promise<any> => {
    try {
      let url: string = `${props.context.pageContext.web.absoluteUrl}/_api/web/lists/getByTitle('Drop Off Library')/fields?$filter=EntityPropertyName eq 'Expiry_x0020_Timeline'`;
      return props.context.spHttpClient
        .get(url, SPHttpClient.configurations.v1)
        .then((response: SPHttpClientResponse) => {
          if (response.ok) {
            return response.json();
          }
        });
    } catch (error) {
      console.log("GET Expiry timeline Error: ", error);
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

    // Fetching security level data
    getSecurityLevel().then((response) => {
      const values = response.value[0].Choices.map((item, index) => ({
        key: item,
        text: item,
      }));
      setSecurityLevelOptions(values);
    });

    // Fetching expiry timeline data
    getExpiryTimeline().then((response) => {
      const values = response.value[0].Choices.map((item, index) => ({
        key: item,
        text: item,
      }));
      setExpiryTimelineOptions(values);
    });
  }, []);

  const submitFormHandler = (e) => {
    e.preventDefault();
    const file = inputFileRef.current.files[0];
    if (documentTitle === "") {
      alert("Please fill required fields");
    } else {
      // Upload a file to the SharePoint Library
      var url = props.context.pageContext.web.serverRelativeUrl;
      getSP(props.context)
        .web.getFolderByServerRelativePath(`${url}/gf_dropOffLibrary`)
        .files.addUsingPath(file.name, file, { Overwrite: true })
        .then((data) => {
          const fileObj = data.file.getItem();
          fileObj.then((obj) => {
            console.log("hey...", obj);
            obj
              .update({
                DocumentName: documentTitle,
                Document_x0020_Type: documentTypeValue,
                Department: departmentValue,
                gf_version: documentVersion,
                Security_x0020_Level: securityLevelValue,
                Date_x0020_Uploaded: uploadedDate,
                Expiry_x0020_date: expiryDate,
                Expiry_x0020_Timeline: expiryTimelineValue,
                Acknowledgement: acknowledgement === true ? "Yes" : "No",
                gf_DocumentOwnerId: docOwner,
                Business_x0020_OwnerId: businessOwner,
                Primary_x0020_ApproverId: primaryApprover,
                Secondary_x0020_ApproverId: secondaryApprover,
              })
              .catch((err) => console.log("ress error iss:", err));
          });
        });
    }
  };
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
        <form className="fileUploadingForm" onSubmit={submitFormHandler}>
          <Row>
            <Col lg={6} md={6} sm={12}>
              <div className="inputWrapper">
                <Label htmlFor="documentName" required>
                  Document Name
                </Label>
                <TextField
                  id="documentName"
                  value={documentTitle}
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
                  ): void => setDocumentTypeValue(item.key as string)}
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
                  ): void => setDepartmentValue(item.key as string)}
                />
              </div>
            </Col>
            <Col lg={6} md={6} sm={12}>
              <div className="inputWrapper" style={{ marginTop: "5px" }}>
                <Label htmlFor="documentVersion" required>
                  Version
                </Label>
                <TextField
                  id="documentVersion"
                  value={documentVersion}
                  onChange={documentVersionChangeHandler}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={6} md={6} sm={12}>
              <div className="inputWrapper" style={{ marginTop: "5px" }}>
                <PeoplePicker
                  context={props.context}
                  titleText="Document Owner"
                  personSelectionLimit={1}
                  // Leave this blank in case you want to filter from all users
                  groupName={""}
                  showtooltip={true}
                  onChange={(items: any[]) => {
                    setDocOwner(items[0].id as string);
                  }}
                  showHiddenInUI={false}
                  principalTypes={[PrincipalType.User]}
                  resolveDelay={1000}
                  ensureUser={true}
                />
              </div>
            </Col>
            <Col lg={6} md={6} sm={12}>
              <div className="inputWrapper" style={{ marginTop: "5px" }}>
                <PeoplePicker
                  context={props.context}
                  titleText="Business Owner"
                  personSelectionLimit={1}
                  // Leave this blank in case you want to filter from all users
                  groupName={""}
                  showtooltip={true}
                  onChange={(items: any[]) => {
                    setBusinessOwner(items[0].id as string);
                  }}
                  showHiddenInUI={false}
                  principalTypes={[PrincipalType.User]}
                  resolveDelay={1000}
                  ensureUser={true}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={6} md={6} sm={12}>
              <div className="inputWrapper" style={{ marginTop: "5px" }}>
                <Dropdown
                  label="Security Level"
                  placeholder="Select Security Level"
                  options={securityLevelOptions}
                  required={true}
                  onChange={(
                    event: React.FormEvent<HTMLDivElement>,
                    item: IDropdownOption
                  ): void => setSecurityLevelValue(item.key as string)}
                />
              </div>
            </Col>
            <Col lg={6} md={6} sm={12}>
              <div className="inputWrapper" style={{ marginTop: "5px" }}>
                <PeoplePicker
                  context={props.context}
                  titleText="Primary Approver"
                  personSelectionLimit={1}
                  // Leave this blank in case you want to filter from all users
                  groupName={""}
                  showtooltip={true}
                  onChange={(items: any[]) => {
                    setPrimaryApprover(items[0].id as string);
                  }}
                  showHiddenInUI={false}
                  principalTypes={[PrincipalType.User]}
                  resolveDelay={1000}
                  ensureUser={true}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={6} md={6} sm={12}>
              <div className="inputWrapper" style={{ marginTop: "5px" }}>
                <PeoplePicker
                  context={props.context}
                  titleText="Secondary Approver"
                  personSelectionLimit={1}
                  // Leave this blank in case you want to filter from all users
                  groupName={""}
                  showtooltip={true}
                  onChange={(items: any[]) => {
                    setSecondaryApprover(items[0].id as string);
                  }}
                  showHiddenInUI={false}
                  principalTypes={[PrincipalType.User]}
                  resolveDelay={1000}
                  ensureUser={true}
                />
              </div>
            </Col>
            <Col lg={6} md={6} sm={12}>
              <div className="inputWrapper" style={{ marginTop: "5px" }}>
                <DatePicker
                  isRequired
                  label="Date Uploaded"
                  allowTextInput
                  ariaLabel="Select a date. Input format is day slash month slash year."
                  value={uploadedDate}
                  onSelectDate={setUploadedDate as (date?: Date) => void}
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
                  value={expiryDate}
                  onSelectDate={setExpiryDate as (date?: Date) => void}
                />
              </div>
            </Col>
            <Col lg={6} md={6} sm={12}>
              <div className="inputWrapper" style={{ marginTop: "5px" }}>
                <Toggle
                  label={<div>Acknowledgement</div>}
                  onText="Yes"
                  offText="No"
                  onChange={(
                    ev: React.MouseEvent<HTMLElement>,
                    checked?: boolean
                  ): void => setAcknowledgement(checked)}
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
                  options={expiryTimelineOptions}
                  required={true}
                  onChange={(
                    event: React.FormEvent<HTMLDivElement>,
                    item: IDropdownOption
                  ): void => setExpiryTimelineValue(item.key as string)}
                />
              </div>
            </Col>
            <Col lg={6} md={6} sm={12}>
              <div className="inputWrapper" style={{ marginTop: "5px" }}>
                <Label htmlFor="fileInput">Attachment(Document)</Label>
                <input
                  type="file"
                  id="fileInput"
                  size={20}
                  ref={inputFileRef}
                />
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
