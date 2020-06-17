import {LevelManagement} from "./crewDto";

export interface MilitaryFormationDto {
  id: string,
  parentId: string,
  parent: MilitaryFormationDto,
  name: string,
  shortName: string,
  levelManagementId: string,
  levelManagement: LevelManagement,
}

export interface TypeOrder {
  id:string;
  name:string
}
