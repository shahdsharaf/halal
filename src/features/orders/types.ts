export interface Order {
  id: string;
  halalOrderNo: string;
  importerCompany: string;
  requestedProducts: number;
  startDate: string;
  endDate: string;
  status:
    | "Active"
    | "New"
    | "Payment Settlement"
    | "Completed"
    | "Awaiting Document"
    | "Ready for Shipment"
    | "Under Review";
}
