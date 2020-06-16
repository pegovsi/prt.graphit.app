export interface UpdateVehicleCommand {
  vehicleId:string,
  factoryNumber:string,
  chassis:string,
  fields:UpdateVehicleField[]

}
export interface UpdateVehicleField {
  userMasterDataId:string,
  userMasterDataFieldId:string,
  value:any
}
