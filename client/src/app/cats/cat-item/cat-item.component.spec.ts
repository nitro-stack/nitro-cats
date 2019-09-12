import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatItemComponent } from './cat-item.component';

describe('CatItemComponent', () => {
  let component: CatItemComponent;
  let fixture: ComponentFixture<CatItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
