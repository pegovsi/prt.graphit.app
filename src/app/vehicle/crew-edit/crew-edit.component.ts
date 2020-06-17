import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {CrewService} from "../../services/crew.service";
import {Vehicle, VehicleShortDto} from "../../models/Vehicle";
import {HttpClient} from "@angular/common/http";
import {HttpServiceService} from "../../services/http-service.service";
import {MilitaryFormationService} from "../../services/military-formation.service";
import {MilitaryFormationDto, TypeOrder} from "../../models/militaryFormationDto";
import {User} from "../../models/user";
import {VehicleModelService} from "../../services/vehicle-model.service";
import {VehicleModelPositionDto} from "../../models/vehicleModelDto";
import {UsersService} from "../../services/users.service";
import {AddCrewCommand, CrewPositionCommand} from "../../models/crewDto";

@Component({
  selector: 'app-crew-edit',
  templateUrl: './crew-edit.component.html',
  styleUrls: ['./crew-edit.component.scss']
})
export class CrewEditComponent implements OnInit {

  form: FormGroup;
  vehicles: VehicleShortDto[] = [];
  militaryFormations: MilitaryFormationDto[];
  typeOrders:TypeOrder[] = [
    {id:'1', name:'Формирование экипажа'},
    {id:'2', name:'Расформирование экипажа'},
    {id:'2', name:'Временное расформирование экипажа'}
  ];

  users: User[] = [];

  positions: VehicleModelPositionDto[] = [];
  vehicleSelectedId:string;
  militaryFormationIdSelected:string;
  isCanCreate: boolean = false;

  constructor(public formBuilder: FormBuilder,
              private router: Router,
              private httpClient: HttpServiceService,
              private militaryService: MilitaryFormationService,
              private vehicleModelService: VehicleModelService,
              private  userService: UsersService,
              private crewService: CrewService) {

    this.createForm();

  }

  createForm() {
    this.form  = this.formBuilder.group({
      number: new FormControl(null, [
        Validators.required
      ]),
      date: new FormControl(null, [
        Validators.required
      ]),
      vehicle: new FormControl(null, [
        Validators.required
      ]),
      militaryFormation: new FormControl(null, [
        Validators.required
      ]),
      TypeOrder: new FormControl(null, [
        Validators.required
      ]),
      fields: new FormArray([])
    });

    this.form.controls['date'].setValue(new Date(Date.now()));
  }

  ngOnInit(): void {
    this.httpClient.getVehiclesForChoose()
      .subscribe(data => {
        this.vehicles = data;
        this.onVehicle(this.vehicles[0].name);
        this.vehicleSelectedId = this.vehicles[0].name;
      });

    this.militaryService.getAll()
      .subscribe(data => {
        this.militaryFormations = data;
        this.militaryFormationIdSelected = data[0].name;
        console.log(this.militaryFormationIdSelected);
      });

    this.userService.getAll().subscribe(data=>{
      this.users = data;
    });

  }
  public get fields() {
    return this.form.get('fields') as FormArray;
  }
  onInputChange(event){
    this.vehicleSelectedId = event.target.value;
    console.log(event.target.value);
    this.onVehicle(event.target.value);

  }

  onVehicle(name:string){
    const vehicleId = this.vehicles.find(x=>x.name === name).id;

    this.vehicleModelService.getModelPositions(vehicleId)
      .subscribe(data => {
        this.positions = data;

        if(data.length> 0){
          this.isCanCreate = true;
        }

        for (let item of data){
          let newFields =  this.formBuilder.group({
            position: new FormControl(''),
            user: new FormControl('')
          });

          newFields.controls['position'].setValue(item.militaryPosition.name);
          newFields.controls['user'].setValue(this.users[0].login);

          this.fields.push(newFields);
        }

      });
  }

  onInputmilitaryFormationsChange(event){
    this.militaryFormationIdSelected = event.target.value;
  }

  onInputTypeOrderChange(event){

  }
  onSubmit() {

    alert('В работе');
    // let vehicleId = this.vehicles.find(x=>x.name == this.vehicleSelectedId).id;
    // let militaryFormationId = this.militaryFormations.find(x=>x.name == this.militaryFormationIdSelected).id;
    //
    // let crewPositions: CrewPositionCommand[] = [];
    //
    // for (let item of this.form.value['fields']) {
    //
    //   const user = this.users.find(x=>x.login == item['user']);
    //   const militaryPosition = this.positions.find(x=>x.militaryPosition.name == item['position']);
    //
    //   crewPositions.push({
    //     accountId: user.id,
    //     militaryPositionId: militaryPosition.militaryPositionId
    //   });
    // }
    //
    // let command: AddCrewCommand = {
    //   orderNumber: this.form.value['number'],
    //   orderDateStart: this.form.value['date'],
    //   orderDateFinish: this.form.value['date'],
    //   typesMilitaryOrderId: "2ce3a4bd-037c-4184-8cfc-415c3f5781a8",
    //   vehicleId: vehicleId,
    //   militaryFormationId: militaryFormationId,
    //   crewPositions: crewPositions
    // };
    //
    //
    //
    // this.crewService.AddCrew(command).subscribe(data=>{
    //   console.log(data);
    //   this.router.navigate(['/vehicle/crew'])
    // });

  }

}
