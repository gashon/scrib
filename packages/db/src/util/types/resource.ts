export interface Resource {
  _id: string;
  created_at: Date | number;
  updated_at: Date | number;
  deleted_at?: Date | number;
}
