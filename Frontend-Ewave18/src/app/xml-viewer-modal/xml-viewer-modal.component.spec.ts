import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XmlViewerModalComponent } from './xml-viewer-modal.component';

describe('XmlViewerModalComponent', () => {
  let component: XmlViewerModalComponent;
  let fixture: ComponentFixture<XmlViewerModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [XmlViewerModalComponent]
    });
    fixture = TestBed.createComponent(XmlViewerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
