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
