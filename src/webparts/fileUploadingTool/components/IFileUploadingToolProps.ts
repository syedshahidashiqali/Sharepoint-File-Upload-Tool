import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IFileUploadingToolProps {
  description: string;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  SiteUrl: string;
  context: WebPartContext;
}
