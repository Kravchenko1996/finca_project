import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcknoledgementDialogComponent } from './acknoledgement-dialog.component';

describe('AcknoledgementDialogComponent', () => {
  let component: AcknoledgementDialogComponent;
  let fixture: ComponentFixture<AcknoledgementDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcknoledgementDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcknoledgementDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
