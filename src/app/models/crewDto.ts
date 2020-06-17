import {VehicleShortList} from "./Vehicle";
import {ActiveStatusDto} from "./vehicleModelDto";
import {User} from "./user";

export interface CrewDto {
  id:string;
  orderNumber:string;
  orderDateStart: Date;
  orderDateFinish:Date;
  typesMilitaryOrderId:string;
  typesMilitaryOrder:TypesMilitaryOrder,
  vehicleId:string;
  vehicle:VehicleShortList,
  militaryFormationId:string;
  militaryFormation:MilitaryFormation
}

export interface TypesMilitaryOrder {
  id:string;
  name:string;
}
export interface MilitaryFormation {
  id: string,
  parentId: string,
  parent: null,
  name: string,
  shortName: string,
  levelManagementId: string,
  levelManagement: LevelManagement
}

export interface LevelManagement {
  id: string,
  name: string,
  code:string,
  isVCH:boolean,
  independent:boolean,
  activeStatus: ActiveStatusDto
}
export interface CrewPosition {
  id: string,
  militaryPositionId:string,
  militaryPosition: MilitaryPosition,
  accountId:string,
  account: User
}

export interface MilitaryPosition {
  id: string,
  name: string,
  shortName: string,
  activeStatus: ActiveStatusDto
}

export interface AddCrewCommand {
  orderNumber:string;
  orderDateStart: Date;
  orderDateFinish:Date;
  typesMilitaryOrderId:string;
  vehicleId:string;
  militaryFormationId:string;
  crewPositions: CrewPositionCommand[]
}

export interface CrewPositionCommand {
  militaryPositionId: string;
  accountId:string;
}
