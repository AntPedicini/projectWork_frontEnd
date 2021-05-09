import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuEventiComponent } from './menu-eventi.component';

describe('MenuEventiComponent', () => {
  let component: MenuEventiComponent;
  let fixture: ComponentFixture<MenuEventiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuEventiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuEventiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
