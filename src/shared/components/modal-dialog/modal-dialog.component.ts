import {
  Component,
  EventEmitter,
  Inject,
  OnInit,
  Output,
  ViewChild,
  inject,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { VehicleService } from 'src/app/services/vehicle.service';
import { ModalDialogSucessOrErrorComponent } from '../modal-dialog-sucess-or-error/modal-dialog-sucess-or-error.component';

import * as moment from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.scss'],
})
export class ModalDialogComponent implements OnInit {
  vehicleForm!: FormGroup;
  btnAction: string = 'Salvar';

  constructor(
    public dialogRef: MatDialogRef<ModalDialogComponent>,
    public dialogRefErrorOrSucess: MatDialog,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editVehicle: any,
    private vehicleService: VehicleService
  ) {}

  ngOnInit() {
    this.vehicleForm = this.formBuilder.group({
      plate: ['', Validators.required],
      chassi: ['', Validators.required],
      renavam: ['', Validators.required],
      model: ['', Validators.required],
      brand: ['', Validators.required],
      year: ['', Validators.required],
    });
    this.editInfo();
  }

  editInfo() {
    if (this.editVehicle) {
      this.btnAction = 'Editar';
      this.vehicleForm.controls['plate'].setValue(this.editVehicle.plate);
      this.vehicleForm.controls['chassi'].setValue(this.editVehicle.chassi);
      this.vehicleForm.controls['renavam'].setValue(this.editVehicle.renavam);
      this.vehicleForm.controls['brand'].setValue(this.editVehicle.brand);
      this.vehicleForm.controls['model'].setValue(this.editVehicle.model);
      this.vehicleForm.controls['year'].setValue(this.editVehicle.year);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  save() {
    if (!this.editVehicle) {
      if (this.vehicleForm.valid) {
        this.vehicleService.postVehicle(this.vehicleForm.value).subscribe({
          next: (res) => {
            this.dialogRef.close('save');
            this.vehicleForm.reset();
            this.openModalErrorOrSucess('sucess');
          },
          error: (err) => {
            this.openModalErrorOrSucess('error');
          },
        });
      }
    } else {
      this.updateInfo();
    }
  }

  openModalErrorOrSucess(sucesseOrError: string) {
    const dialogRef = this.dialogRefErrorOrSucess.open(
      ModalDialogSucessOrErrorComponent,
      {
        width: '382px',
        height: '286px',
        data: sucesseOrError,
        panelClass: 'dialog-sucess-error',
      }
    );

    dialogRef.afterClosed();
  }

  updateInfo() {
    this.vehicleService
      .putVehicle(this.vehicleForm.value, this.editVehicle.id)
      .subscribe({
        next: (res) => {
          this.dialogRef.close('edit');
          this.vehicleForm.reset();
          this.openModalErrorOrSucess('edit');
        },
        error: (err) => {
          this.openModalErrorOrSucess('error');
        },
      });
  }
}
