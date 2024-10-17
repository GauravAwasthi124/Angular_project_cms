import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoryformComponent } from './subcategoryform.component';

describe('SubcategoryformComponent', () => {
  let component: SubcategoryformComponent;
  let fixture: ComponentFixture<SubcategoryformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubcategoryformComponent]
    });
    fixture = TestBed.createComponent(SubcategoryformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
