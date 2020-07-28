import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentHierarchyRecursiveComponent } from './department-hierarchy.component';

describe('DepartmentHierarchyRecursiveComponent', () => {
  let component: DepartmentHierarchyRecursiveComponent;
  let fixture: ComponentFixture<DepartmentHierarchyRecursiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentHierarchyRecursiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentHierarchyRecursiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
