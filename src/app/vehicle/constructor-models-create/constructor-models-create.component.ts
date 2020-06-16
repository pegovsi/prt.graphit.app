import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {VehicleModelService} from "../../services/vehicle-model.service";
import {VehicleModelDto} from "../../models/vehicleModelDto";
import {UserMasterDataService} from "../../services/user-master-data.service";
import {
  CreateUserMasterDataCommand,
  TypeUserMasterDataDto,
  UserMasterDataFieldCommand
} from "../../models/userMasterDataDto";
import {Router} from "@angular/router";
import {AlertService} from "../../services/alert.service";


@Component({
  selector: 'app-constructor-models-create',
  templateUrl: './constructor-models-create.component.html',
  styleUrls: ['./constructor-models-create.component.scss']
})
export class ConstructorModelsCreateComponent implements OnInit {

  vehicleModels: VehicleModelDto[]= [];
  types: TypeUserMasterDataDto[]= [];
  models: any = [];
  form: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private userMasterDataService: UserMasterDataService,
    private vehicleModelService: VehicleModelService,
    private router: Router,
    private alertService: AlertService) {
    this.createForm();
    this.addField();

    this.userMasterDataService.getTypesUserMasterData()
      .subscribe(data=>{
      this.types = data
    });
  }

  createForm() {
    this.form  = this.formBuilder.group({
      name: new FormControl(null, [
        Validators.required
      ]),
      model: new FormControl(null, [
        Validators.required
      ]),
      fields: new FormArray([])
    });
  }

  public get fields() {
    return this.form.get('fields') as FormArray;
  }


  addField(){

    this.fields.push(
      this.formBuilder.group({
         nameField: new FormControl(''),
         typeData: new FormControl('')
        })
    );
  }

  removeField(i:number){
    this.fields.removeAt(i);
  }

  ngOnInit(): void {
    this.vehicleModelService.getAllModels()
      .subscribe(data => {
        this.vehicleModels = data;
      });
  }

  onInputChange(event){
    //alert(event.target.value);
  }
  onSubmit() {

    let modelId = this.vehicleModels.find(x=>x.name === this.form.value['model']);

    let fields: UserMasterDataFieldCommand[] = [];
    for (let item of this.form.value['fields']){
      let typeUserMasterData = this.types.find(x=>x.description === item['typeData']);
      fields.push({
        name:item['nameField'],
        typeUserMasterDataId: typeUserMasterData.id
      })
    }

    let command:CreateUserMasterDataCommand = {
      name:  this.form.value['name'],
      vehicleModelId: modelId?.id,
      userMasterDataFields:fields
    }

    this.userMasterDataService.create(command).subscribe(data=>{
      this.alertService.success('Title', `Запись по справочнику ${ this.form.controls['name'].value} обновилась`,'' );
      this.router.navigate(['/vehicle/constructor-models']);
    });

  }
}
