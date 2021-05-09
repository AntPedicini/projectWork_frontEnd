import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSociComponent } from './menu-soci.component';

describe('MenuSociComponent', () => {
  let component: MenuSociComponent;
  let fixture: ComponentFixture<MenuSociComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuSociComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuSociComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
