import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuIscrizioniComponent } from './menu-iscrizioni.component';

describe('MenuIscrizioniComponent', () => {
  let component: MenuIscrizioniComponent;
  let fixture: ComponentFixture<MenuIscrizioniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuIscrizioniComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuIscrizioniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
