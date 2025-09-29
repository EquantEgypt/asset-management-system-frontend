export interface AssetFilter {
  category?: string;
  type?: string;
  status?: string;
  department?: string;
  assignedUser?: string;
  page: number;
  size: number;
  myAssetsFlag?: boolean;
}
