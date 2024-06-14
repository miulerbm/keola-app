import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from '../schedule/schedule.component';
import { Router } from '@angular/router';

interface Package {
  id: number;
  name: string;
  codeMembership: string;
  description: string;
  idFamilyPackage: number;
  estatus: number;
  legalDocuments: any;
  listPackageDetails: any;
}

interface PackageDetailResponse {
  numberSharesLetters: string;
  idPackageDetail: number;
  price: number;
  numberQuotas: number;
  initialPrice: number;
  quotaPrice: number;
  priceLetters: string;
  namePackage: string;
  nameFamilyPackage: string;
  familyPackageId: number;
  membershipVersionId: number;
  numberShares: number;
  membershipmaintenance: number;
  membershipmaintenanceletter: string;
  volume: number;
  desiredAmount: number;
  desiredAmountletter: string;
}

interface Suscription {
  id: number;
  idUser: number;
  package: Package;
  packageDetailResponse: PackageDetailResponse;
  creationDate: string;
  observation: string;
  status: number;
  discountPriceUpgrade: number;
  payment: any;
  statusName: string;
  schedule: any;
  datePendingFee: any;
  pendingFee: number;
  descriptionPendingFee: any;
  lastDatePaidFee: any;
  quotaDescription: string;
  scoreActiveCompuesto: number;
  scoreActiveResidual: number;
  nextExpiration: any;
  allowGracePeriod: boolean;
  countSuscriptionByFamily: number;
  typeShares: string;
  codeComany: string;
  beneficiaries: string;
  numberGuests: number;
}

@Component({
  selector: 'app-memberships',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ScheduleComponent],
  templateUrl: './memberships.component.html',
  styleUrls: ['./memberships.component.css'],
})
export class MembershipsComponent implements OnInit {
  suscriptions: Suscription[] = [];
  selectedSuscriptionId: number | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchMemberships();
  }

  fetchMemberships(): void {
    const userId = 12853;
    const url = `https://inclubtest.com:2053/api/suscription/payment/${userId}`;
    this.http.get<any>(url).subscribe(
      (response) => {
        if (response.status === 1) {
          this.suscriptions = response.objModel.suscriptions;
        } else {
          alert('Error al obtener las membresías');
        }
      },
      (error) => {
        console.error('Error fetching memberships:', error);
        alert(
          'Error al obtener las membresías. Por favor, inténtelo de nuevo.'
        );
      }
    );
  }

  goToSchedule(suscriptionId: number): void {
    this.router.navigate(['schedule', suscriptionId]);
  }
}
