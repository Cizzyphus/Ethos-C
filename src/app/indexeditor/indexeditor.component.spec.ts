import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexeditorComponent } from './indexeditor.component';

describe('IndexeditorComponent', () => {
  let component: IndexeditorComponent;
  let fixture: ComponentFixture<IndexeditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexeditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexeditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
