import * as React from "react";
import "./FileUploadingTool.scss";
import { IFileUploadingToolProps } from "./IFileUploadingToolProps";
import { Container } from "./tinyComponents/Container";
import { Row } from "./tinyComponents/Row";
import { Col } from "./tinyComponents/Col";

// office ui components
import {
  Label,
  TextField,
  Dropdown,
  DatePicker,
  Toggle,
} from "office-ui-fabric-react";

const FileUploadingTool: React.FC<IFileUploadingToolProps> = (props) => {
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
                <TextField id="documentName" />
              </div>
            </Col>
            <Col lg={6} md={6} sm={12}>
              <div className="inputWrapper">
                <Dropdown
                  label="Document Type"
                  placeholder="Select Doc Type"
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
