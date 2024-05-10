import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowerSideLinksComponent } from './borrower-side-links.component';

describe('BorrowerSideLinksComponent', () => {
  let component: BorrowerSideLinksComponent;
  let fixture: ComponentFixture<BorrowerSideLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BorrowerSideLinksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BorrowerSideLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
