import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-repair-documents-working',
  templateUrl: './repair-documents-working.component.html',
  styleUrls: ['./repair-documents-working.component.scss']
})
export class RepairDocumentsWorkingComponent implements OnInit {

  documents:string[];

  constructor() { }

  ngOnInit(): void {
  }

}
