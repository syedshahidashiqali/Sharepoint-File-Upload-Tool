import * as React from "react";
import {
  PeoplePicker,
  PrincipalType,
} from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IPersonPickerProps {
  LabelText: string;
  context: WebPartContext;
  setterFunc: React.Dispatch<React.SetStateAction<string>>;
}

export const PersonPicker: React.FC<IPersonPickerProps> = (props) => {
  return (
    <PeoplePicker
      context={props.context}
      titleText={props.LabelText}
      personSelectionLimit={1}
      // Leave this blank in case you want to filter from all users
      groupName={""}
      showtooltip={true}
      onChange={(items: any[]) => {
        props.setterFunc(items[0].id as string);
      }}
      showHiddenInUI={false}
      principalTypes={[PrincipalType.User]}
      resolveDelay={1000}
      ensureUser={true}
    />
  );
};
