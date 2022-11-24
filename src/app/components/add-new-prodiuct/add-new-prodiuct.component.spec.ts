import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewProdiuctComponent } from './add-new-prodiuct.component';

describe('AddNewProdiuctComponent', () => {
  let component: AddNewProdiuctComponent;
  let fixture: ComponentFixture<AddNewProdiuctComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewProdiuctComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewProdiuctComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
