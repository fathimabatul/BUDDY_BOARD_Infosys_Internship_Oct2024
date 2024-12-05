import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicDeckComponent } from './public-deck.component';

describe('PublicDeckComponent', () => {
  let component: PublicDeckComponent;
  let fixture: ComponentFixture<PublicDeckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicDeckComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
