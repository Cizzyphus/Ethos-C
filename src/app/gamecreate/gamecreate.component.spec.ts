import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamecreateComponent } from './gamecreate.component';

describe('GamecreateComponent', () => {
  let component: GamecreateComponent;
  let fixture: ComponentFixture<GamecreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamecreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamecreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
