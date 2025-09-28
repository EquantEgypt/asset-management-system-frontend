export interface Request {
  assetId?: number;
  assetTypeId: number;
  requesterId: number;
  requestType: string;
}

export interface RequestView {
  id: number;
  requester: string;
  requesterId: number;
  requestType: 'NEW' | 'MAINTENANCE';
  assetName: string;
  asset?: { name: string };
  assetTypeName: string;
  assetTypeId: number;
  categoryId: number;
  status: 'APPROVED' | 'REJECTED';
  requestDate: string;
}
export interface AssignPerRequest {
  requestId: number;
  
  userId: number;
  categoryId: number;
  userName: string;
  typeName: string;
  typeId: number;
  requestType: 'NEW' | 'MAINTENANCE';

}
