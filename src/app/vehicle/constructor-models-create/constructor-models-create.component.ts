import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {VehicleModelService} from "../../services/vehicle-model.service";
import {VehicleModelDto} from "../../models/vehicleModelDto";
import {formatNumber} from "@angular/common";

@Component({
  selector: 'app-constructor-models-create',
  templateUrl: './constructor-models-create.component.html',
  styleUrls: ['./constructor-models-create.component.scss']
})
export class ConstructorModelsCreateComponent implements OnInit {

  vehicleModels: VehicleModelDto[];
  models: any = [];
  form: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private vehicleModelService: VehicleModelService) {
    this.createForm();
  }

  createForm() {
    this.form  = this.formBuilder.group({
      name: new FormControl(null, [
        Validators.required
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.maxLength(255)
      ]),
      numbers: new FormArray([
        new FormControl(''),
        new FormControl('')]
      )
    });
  }
  getControls(frmGrp: FormGroup, key: string) {
    return (<FormArray>frmGrp.controls[key]).controls;
  }
  // public get childrens() {
  //   return this.form.get('childrens') as FormArray;
  // }


  addField(){

    (this.form.get('numbers') as FormArray).push(new FormControl());

    //this.form.addControl('sdcsd',  new FormControl())
    //this.childrens.push(new FormControl('', [Validators.required]));
  }

  ngOnInit(): void {
    this.vehicleModelService.getAllModels()
      .subscribe(data => {
        this.vehicleModels = data;
      });
  }

  onInputChange(event){
    alert(event.target.value);
  }
  onSubmit() {
    alert(this.form.value.name);
    //alert(JSON.stringify(this.modelConstructorForm.value))
  }
}
