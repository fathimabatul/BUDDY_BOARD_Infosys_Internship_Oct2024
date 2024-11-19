import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupFollowUpComponent } from './signup-follow-up.component';

describe('SignupFollowUpComponent', () => {
  let component: SignupFollowUpComponent;
  let fixture: ComponentFixture<SignupFollowUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupFollowUpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupFollowUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
