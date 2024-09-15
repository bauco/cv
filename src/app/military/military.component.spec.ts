import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MilitaryComponent } from './military.component';

describe('MilitaryComponent', () => {
  let component: MilitaryComponent;
  let fixture: ComponentFixture<MilitaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MilitaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MilitaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
