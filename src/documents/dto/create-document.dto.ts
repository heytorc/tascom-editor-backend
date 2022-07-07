export class CreateDocumentDto {
  name: string;
  system_id: string;
  company_id: string;
  version: number;
  size: {
    width: number;
    height: number;
  };
  versions: any[];
}
