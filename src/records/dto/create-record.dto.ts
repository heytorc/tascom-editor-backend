export class CreateRecordDto {
  document_id: string;
  system_id: string;
  company_id: string;
  version: number;
  external_data?: Record<string, unknown>;
  fields: any[];
  status?: string;
  created_by: string;
  update_by: string;
}
