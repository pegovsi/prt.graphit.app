import {UserMasterDataValueDto} from "./userMasterDataDto";
import {VehicleModelDto} from "./vehicleModelDto";

export interface Vehicle {
  id:string;
  name:string;
  yearOfIssue:Date;
  isApproved: boolean,
  mileage: number,
  shotsAmount: number,
  operatingTime: number,
  vehicleType:VehicleType,
  vehicleModel:VehicleModelDto,
  vehicleNomberFactory: string,
  vehicleNomberRegister: string,
  vehicleNomberChassis: string,
  manufacturer:Manufacturer,
  city:City,
  garrison: Garrison,
  division:Division,
  subdivision: Subdivision,
  brigade:Brigade,
  condition:Condition,
  vehiclePictures:VehiclePictures[],
  userMasterDataValues:UserMasterDataValueDto[]

}

export interface VehicleShortList {
  id:string;
  name:string;
}

export interface VehiclePictures {
  uri:string;
  uriPreview:string;
  base:boolean;
}
export interface City {
  id:string;
  name:string;
  garrisonId:string
}

export interface Garrison {
  id: string,
  name: string,
  coordinateX: number,
  coordinateY: number,
  rate:number
}
export interface VehicleType {
  id:string,
  name:string;
  iconLink:string|null,
  pictureLink:string|null
}
export interface VehicleModel {
  id: string,
  name: string,
  shortName: string,
  vehicleModelTypeId: string,
  chassiId: string,
  iconLink: string
}

export interface Manufacturer {
  id:string,
  name:string
}
export interface Division {
  id:string,
  name:string
}
export interface Subdivision {
  id:string,
  name:string,
  brigadeId:string
}
export interface Brigade {
  id:string,
  name:string,
  divisionId:string
}
export interface Condition {
  id:string,
  name:string;
  iconLink:string|null,
  readiness:boolean
}
export interface Chassis {
  id:string,
  name:string;
  manufacturerId:string;
}

export interface VehicleShortDto {
  id:string;
  name:string;
}
