import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VehicleService } from 'src/app/services/vehicle.service';
import { ModalDialogComponent } from 'src/shared/components/modal-dialog/modal-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalDialogSucessOrErrorComponent } from 'src/shared/components/modal-dialog-sucess-or-error/modal-dialog-sucess-or-error.component';
import { Vehicle } from 'src/shared/models/vehicle.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'plate',
    'chassi',
    'renavam',
    'model',
    'brand',
    'action',
  ];
  dataSource: MatTableDataSource<Vehicle>;
  color = '#fcb900';
  radiusInit = '40px 0px 0px 40px';
  radiusFinal = ' 0px 0px 200px 0px';
  radiusBorder = '50px';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    public dialog: MatDialog,
    private vehicleService: VehicleService,
    public dialogRefErrorOrSucess: MatDialog
  ) {}

  ngOnInit() {
    this.getAllVehicle();
  }

  openDialog() {
    this.dialog
      .open(ModalDialogComponent, {
        width: '40%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') {
          this.getAllVehicle();
        }
      });
  }

  getAllVehicle() {
    this.vehicleService.getVehicle().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {},
    });
  }

  editProdut(row: any) {
    this.dialog
      .open(ModalDialogComponent, {
        width: '40%',
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'edit') {
          this.getAllVehicle();
        }
      });
  }

  searchVehicle(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openModalErrorOrSucess(sucesseOrError: string) {
    const dialogRef = this.dialogRefErrorOrSucess.open(
      ModalDialogSucessOrErrorComponent,
      {
        width: '382px',
        height: '286px',
        data: sucesseOrError,
      }
    );

    dialogRef.afterClosed();
  }

  deleteVehicle(id: number) {
    this.vehicleService.deleteVehicle(id).subscribe({
      next: (res) => {
        this.openModalErrorOrSucess('delete');
        this.getAllVehicle();
      },
      error: (err) => {},
    });
  }
}
