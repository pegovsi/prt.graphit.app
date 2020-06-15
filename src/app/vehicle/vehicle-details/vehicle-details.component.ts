import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {HttpServiceService} from "../../services/http-service.service";
import {Vehicle} from "../../models/Vehicle";
import {Observable} from "rxjs";
import {switchMap} from "rxjs/operators";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.scss']
})
export class VehicleDetailsComponent implements OnInit {

  @Input() vehicleId: string;
  vehicle$: Observable<Vehicle>;
  myColor:string = '#ffc000';
  form: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private httpClient: HttpServiceService) { }

  ngOnInit(): void {
    this.vehicle$ = this.route.params
      .pipe(switchMap((params: Params) => {
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
      this.form.controls['name'].setValue(data.name);
      this.form.controls['model'].setValue(data.vehicleModel.name);
      this.form.controls['factoryNumber'].setValue(data.vehicleNomberFactory);
      this.form.controls['chassis'].setValue(data.vehicleNomberChassis);

      for (let item of data.vehicleModel.userMasterDatas){

        for (let field of item.userMasterDataFields){
           let newFiled = this.formBuilder.group({
             nameField: new FormControl(''),
             valueData: new FormControl('')
          });
          newFiled.controls['nameField'].setValue(field.nameField);
          //newFiled.controls['valueData'].setValue(field.nameField);
          this.fields.push(newFiled);
        }
      }
    });

  }

  ngSubmit(){
    for (let item of this.form.value['fields']){
      console.log(item);
    }
  }
}
