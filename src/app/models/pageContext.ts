export interface PageContext<T> {
  "pageIndex":number,
  "pageSize":number,
  "filter":T,
  "listSort":string[] | null
}

export interface VehiclePageFilter {
  "VehicleId":string,
  "VehicleName":string,
  "Garrison":string,
  "Division":string,
  "Subdivision":string,
  "City":string,
  "Condition":string
}

export interface UserPageFilter {
  "userId":string,
  "firstName":string,
  "lastName":string,
  "middleName":string
}

export interface VehicleModelPageFilter {
  vehicleModelId: string;
  vehicleTypeId:string;
  chassisId:string;
}

export interface CrewPageFilter {
  vehicleId:string;
  militaryFormationId:string
}

export interface MilitaryFormationPageFilter {
  militaryFormationId:string,
  levelManagementId:string
}
export interface MilitaryPositionPageFilter {
  militaryPositionId:string;
}
