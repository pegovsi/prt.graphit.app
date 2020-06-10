import {VehicleModelDto} from "./vehicleModelDto";

export interface UserMasterDataDto {
  id:string,
  vehicleModelId:string,
  vehicleModel: VehicleModelDto,
  name:string,
  userMasterDataFields:UserMasterDataFieldDto[]
}

export interface UserMasterDataValueDto {
  id:string;
  userMasterDataId:string;
  userMasterDataFieldId:string;
  userMasterDataField: UserMasterDataFieldDto;
  vehicleId:string;
  content: UserMasterDataContentDto;
}

export interface UserMasterDataFieldDto {
  id:string,
  userMasterDataId:string,
  nameField:string,
  typeUserMasterDataId:string,
  typeUserMasterData:TypeUserMasterDataDto
}

export interface TypeUserMasterDataDto {
  id:string;
  name:string;
  description:string;
}

export interface UserMasterDataContentDto {
  value:any;
}


