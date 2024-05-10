import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSideLinksComponent } from './admin-side-links.component';

describe('AdminSideLinksComponent', () => {
  let component: AdminSideLinksComponent;
  let fixture: ComponentFixture<AdminSideLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSideLinksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminSideLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
