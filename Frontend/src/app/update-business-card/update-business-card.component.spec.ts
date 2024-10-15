import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBusinessCardComponent } from './update-business-card.component';

describe('UpdateBusinessCardComponent', () => {
  let component: UpdateBusinessCardComponent;
  let fixture: ComponentFixture<UpdateBusinessCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateBusinessCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateBusinessCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
