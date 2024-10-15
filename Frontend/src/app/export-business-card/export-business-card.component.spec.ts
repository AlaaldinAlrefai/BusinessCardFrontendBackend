import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportBusinessCardComponent } from './export-business-card.component';

describe('ExportBusinessCardComponent', () => {
  let component: ExportBusinessCardComponent;
  let fixture: ComponentFixture<ExportBusinessCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExportBusinessCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExportBusinessCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
