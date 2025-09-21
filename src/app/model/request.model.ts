export interface Request {
    assetId?: number;
    assetTypeId: number;
    requesterId: number;
    requestType: string;
}

export interface RequestView {
  id: number;
  requester: string;
  requestType: 'NEW' | 'MAINTENANCE';
  asset?: { name: string };
  assetTypeName: string; // Added field
  status: 'PENDING' | 'APPROVED' | 'REJECTED'; // Updated type
  requestDate: string;
}