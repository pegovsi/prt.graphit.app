import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstructorModelsCreateComponent } from './constructor-models-create.component';

describe('ConstructorModelsCreateComponent', () => {
  let component: ConstructorModelsCreateComponent;
  let fixture: ComponentFixture<ConstructorModelsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConstructorModelsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstructorModelsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
