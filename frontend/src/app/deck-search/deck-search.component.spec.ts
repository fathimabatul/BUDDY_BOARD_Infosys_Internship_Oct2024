import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DeckSearchComponent } from './deck-search.component';

describe('DeckSearchComponent', () => {
  let component: DeckSearchComponent;
  let fixture: ComponentFixture<DeckSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeckSearchComponent],
      imports: [FormsModule, CommonModule, RouterModule.forRoot([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeckSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
