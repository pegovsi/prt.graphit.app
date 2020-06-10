import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstructorModelsComponent } from './constructor-models.component';

describe('ConstructorModelsComponent', () => {
  let component: ConstructorModelsComponent;
  let fixture: ComponentFixture<ConstructorModelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConstructorModelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstructorModelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
