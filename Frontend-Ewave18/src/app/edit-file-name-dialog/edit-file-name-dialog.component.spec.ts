import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFileNameDialogComponent } from './edit-file-name-dialog.component';

describe('EditFileNameDialogComponent', () => {
  let component: EditFileNameDialogComponent;
  let fixture: ComponentFixture<EditFileNameDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditFileNameDialogComponent]
    });
    fixture = TestBed.createComponent(EditFileNameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
