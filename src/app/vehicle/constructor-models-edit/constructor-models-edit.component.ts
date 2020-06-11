import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {VehicleModelService} from "../../services/vehicle-model.service";
import {VehicleModelDto} from "../../models/vehicleModelDto";
import {UserMasterDataService} from "../../services/user-master-data.service";
import {
  CreateUserMasterDataCommand,
  TypeUserMasterDataDto, UserMasterDataDto,
  UserMasterDataFieldCommand
} from "../../models/userMasterDataDto";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {Observable} from "rxjs";


@Component({
  selector: 'app-constructor-models-edit',
  templateUrl: './constructor-models-edit.component.html',
  styleUrls: ['./constructor-models-edit.component.scss']
})
export class ConstructorModelsEditComponent implements OnInit {

  vehicleModels: VehicleModelDto[]= [];
  types: TypeUserMasterDataDto[]= [];
  models: any = [];
  form: FormGroup;
  userMasterData$: Observable<UserMasterDataDto>;

  constructor(
    public formBuilder: FormBuilder,
    private userMasterDataService: UserMasterDataService,
    private vehicleModelService: VehicleModelService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    this.userMasterDataService.getTypesUserMasterData()
      .subscribe(data=>{
        this.types = data
      });

    this.userMasterData$ = this.route.params
      .pipe(switchMap((params: Params) => {
        return this.userMasterDataService
          .getUserMasterDataById(params['id']);
      }));

    this.vehicleModelService.getAllModels()
      .subscribe(data => {
        this.vehicleModels = data;
      });

    this.createForm();

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

    this.userMasterData$.subscribe(data=>{

      this.form.controls['name'].setValue(data.name);
      this.form.controls['model'].setValue(data.vehicleModel.id);

      for (let item of data.userMasterDataFields){

        let newFiled = this.formBuilder.group({
          nameField: new FormControl(''),
          typeData: new FormControl('')
        });
        newFiled.controls['nameField'].setValue(item.nameField);
        newFiled.controls['typeData'].setValue(item.typeUserMasterDataId);

        this.fields.push(newFiled);
      }
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
      this.router.navigate(['/vehicle/constructor-models']);
    });

  }
}
