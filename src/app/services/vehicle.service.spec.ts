import { TestBed, inject } from '@angular/core/testing';

import { VehicleService } from './vehicle.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Vehicle } from 'src/shared/models/vehicle.interface';

const environment = {
  production: false,
  base_url_home: 'http://localhost:5000',
};
describe('ApiService', () => {
  let httpTestingController: HttpTestingController;
  let vehicles: Vehicle = {
    plate: 'teste',
    chassi: 'novo',
    renavam: '656.655.545-0',
    model: 'ka',
    brand: 'ford',
    year: '2009',
  };

  let service: VehicleService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        VehicleService,
        {
          provide: 'env',
          useValue: environment,
        },
      ],
      imports: [HttpClientTestingModule],
    });

    httpTestingController = TestBed.inject(HttpTestingController);

    service = TestBed.inject(VehicleService);
  });

  it('should service toBeTruthy', inject(
    [VehicleService],
    (service: VehicleService) => {
      expect(service).toBeTruthy();
    }
  ));

  it('should post a vehicle', () => {
    service.postVehicle(vehicles).subscribe((res) => {
      expect(res).toEqual(vehicles);
    });

    const req = httpTestingController.expectOne(
      'http://localhost:3000/vehicleList'
    );
    expect(req.request.method).toEqual('POST');
    req.flush(vehicles);
  });

  it('should get vehicles', () => {
    let vehicles: Vehicle[] = [
      {
        plate: 'teste',
        chassi: 'novo',
        renavam: '656.655.545-0',
        model: 'ka',
        brand: 'ford',
        year: '2009',
      },
    ];
    service.getVehicle().subscribe((res) => {
      expect(res).toEqual(vehicles);
    });

    const req = httpTestingController.expectOne(
      'http://localhost:3000/vehicleList'
    );
    expect(req.request.method).toEqual('GET');
    req.flush(vehicles);
  });

  it('should put a vehicle', () => {
    const id = 1;

    service.putVehicle(vehicles, id).subscribe((res) => {
      expect(res).toEqual(vehicles);
    });

    const req = httpTestingController.expectOne(
      'http://localhost:3000/vehicleList/1'
    );
    expect(req.request.method).toEqual('PUT');
    req.flush(vehicles);
  });

  it('should delete a vehicle', () => {
    const id = 1;

    service.deleteVehicle(id).subscribe((res) => {});

    const req = httpTestingController.expectOne(
      'http://localhost:3000/vehicleList/1'
    );
    expect(req.request.method).toEqual('DELETE');
    req.flush({});
  });
});
