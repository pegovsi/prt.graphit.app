import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {HttpServiceService} from "../../services/http-service.service";
import {Vehicle} from "../../models/Vehicle";
import {Observable} from "rxjs";
import {switchMap} from "rxjs/operators";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UpdateVehicleCommand, UpdateVehicleField} from "../../models/UpdateVehicleCommand";
import {UserMasterDataDto, UserMasterDataFieldDto} from "../../models/userMasterDataDto";
import {AlertService} from "../../services/alert.service";
import {CrewService} from "../../services/crew.service";
import {CrewDto} from "../../models/crewDto";

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.scss']
})
export class VehicleDetailsComponent implements OnInit {

  @Input() vehicleId: string;
  vehicle$: Observable<Vehicle>;
  myColor:string = '#ffc000';
  imageMain:string = 'assets/backgr.jpg';
  form: FormGroup;
  userMasterData: UserMasterDataDto[]=[];
  _vehicleId:string;
  crews: CrewDto[] = [];

  constructor(
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private httpClient: HttpServiceService,
    private crewService: CrewService) { }

  ngOnInit(): void {
    this.vehicle$ = this.route.params
      .pipe(switchMap((params: Params) => {
        this._vehicleId = params['id'];

        this.crewService.getCrewByVehicle(params['id'])
          .subscribe(data=>{
            this.crews = data;
          });

        return this.httpClient.getVehicleById(params['id']);
      }));


    this.createForm();

     //this.vehicle$ = this.httpClient.getVehicleById(this.vehicleId);
  }
  public get fields() {
    return this.form.get('fields') as FormArray;
  }

  createForm(){
    this.form  = this.formBuilder.group({
      id: new FormControl(null, [
        Validators.required
        ]),
      name: new FormControl(null, [
        Validators.required
      ]),
      model: new FormControl(null, [
        Validators.required
      ]),
      factoryNumber: new FormControl(null, [
        Validators.required
      ]),
      chassis: new FormControl(null, [
        Validators.required
      ]),

      fields: new FormArray([])
    });

    this.vehicle$.subscribe(data=>{
      this.imageMain = data.vehiclePictures[0].uri;

      this.form.controls['id'].setValue(data.id);
      this.form.controls['name'].setValue(data.name);
      this.form.controls['model'].setValue(data.vehicleModel.name);
      this.form.controls['factoryNumber'].setValue(data.vehicleNomberFactory);
      this.form.controls['chassis'].setValue(data.vehicleNomberChassis);

      this.userMasterData = data.vehicleModel.userMasterDatas;

      for (let item of data.vehicleModel.userMasterDatas){

        for (let field of item.userMasterDataFields){
           let newFiled = this.formBuilder.group({
             nameField: new FormControl(''),
             valueData: new FormControl('')
          });
          newFiled.controls['nameField'].setValue(field.nameField);
          newFiled.controls['valueData'].setValue(
            data.userMasterDataValues.find(x=>x.userMasterDataFieldId === field.id)?.content?.value?? 0
          );
          this.fields.push(newFiled);
        }
      }
    });

  }
  setImage(uri:string){
    this.imageMain  = uri;
  }

  ngSubmit(){

    let userMasterDataFields:UpdateVehicleField[] = [];

    for (let item of this.userMasterData) {
      let i = 0;
      for (let field of item.userMasterDataFields){
        let userMasterDataField:UpdateVehicleField ={
          userMasterDataId: item.id,
          userMasterDataFieldId: field.id,
          value: this.fields.at(i).value['valueData']
        }
        console.log('userMasterDataField: ', userMasterDataField);
        i++;
        userMasterDataFields.push(userMasterDataField);
      }
    }

    let command: UpdateVehicleCommand = {
      factoryNumber: this.form.value['factoryNumber'],
      vehicleId: this.form.value['id'],
      chassis: this.form.value['chassis'],
      fields:userMasterDataFields
    }

    this.httpClient.updateVehicle(command).subscribe(data=>{
      this.alertService.success('Title', `Запись по ВВТ ${ this.form.controls['name'].value} обновилась`,'' );
      this.router.navigate(['/vehicle/vehicles']);
    });

  }
}
