import {Chassis, VehicleType} from "./Vehicle";
import {UserMasterDataDto} from "./userMasterDataDto";

export interface VehicleModelDto {
  id:string;
  name:string;
  shortName:string;
  vehicleModelType:VehicleType;
  chassi:Chassis;
  iconLink:string,
  vehicleModelPositions:VehicleModelPositionDto[],
  userMasterDatas:UserMasterDataDto[]
}

export interface VehicleModelPositionDto{
  id:string;
  militaryPositionId:string;
  militaryPosition: MilitaryPositionDto
}

export interface MilitaryPositionDto{
  id:string;
  name:string;
  shortName:string;
  ActiveStatus: ActiveStatusDto
}
export interface ActiveStatusDto {
  id:string;
  name:string;
}
