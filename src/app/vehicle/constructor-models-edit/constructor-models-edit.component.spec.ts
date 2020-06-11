import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstructorModelsEditComponent } from './constructor-models-edit.component';

describe('ConstructorModelsEditComponent', () => {
  let component: ConstructorModelsEditComponent;
  let fixture: ComponentFixture<ConstructorModelsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConstructorModelsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstructorModelsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
