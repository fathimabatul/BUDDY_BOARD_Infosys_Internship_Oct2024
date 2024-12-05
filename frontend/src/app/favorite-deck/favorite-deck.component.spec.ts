import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteDeckComponent } from './favorite-deck.component';

describe('FavoriteDeckComponent', () => {
  let component: FavoriteDeckComponent;
  let fixture: ComponentFixture<FavoriteDeckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoriteDeckComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoriteDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
