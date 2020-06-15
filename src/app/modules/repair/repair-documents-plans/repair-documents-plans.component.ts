import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-repair-documents-plans',
  templateUrl: './repair-documents-plans.component.html',
  styleUrls: ['./repair-documents-plans.component.scss']
})
export class RepairDocumentsPlansComponent implements OnInit {

  documents:string[];

  constructor() { }

  ngOnInit(): void {
  }

}
