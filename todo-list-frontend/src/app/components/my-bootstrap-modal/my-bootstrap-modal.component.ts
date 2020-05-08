import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-my-bootstrap-modal',
  templateUrl: './my-bootstrap-modal.component.html',
  styleUrls: ['./my-bootstrap-modal.component.css']
})

export class MyBootstrapModalComponent {
  title: '';
  body: '';

  constructor( public activeModal: NgbActiveModal ) { }

  closeModal() {
    this.activeModal.close();
  }

}
