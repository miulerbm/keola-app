import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

interface PaymentSchedule {
  idPayment: number;
  quoteDescription: string;
  nextExpiration: string;
  dollarExchange: number;
  quoteUsd: number;
  quote: number;
  amortization: number;
  capitalBalance: number;
  porcentaje: number;
  interested: number;
  verif: number;
  obs: string;
  isQuoteInitial: number;
  payDate: string;
  pts: number;
  numberQuotePay: number;
  idSuscription: number;
  positionOnSchedule: number;
  amortizationUsd: number;
  capitalbalanceUsd: number;
  percentOverdueDetailId: number | null;
  verifText: string;
  totalPay: number;
  totalOverdue: number;
  daysOverdue: number;
  paymentVouchers: any[];
}

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatProgressSpinner],
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
})
export class ScheduleComponent implements OnInit {
  @Input() suscriptionId!: number;
  @Output() close = new EventEmitter<void>();
  schedule: PaymentSchedule[] = [];
  isLoading: boolean = false;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const subscriptionId = +params['id'];
      this.fetchSchedule(subscriptionId);
    });
  }

  fetchSchedule(subscriptionId: number): void {
    this.isLoading = true;

    const url = `https://inclubtest.com:2053/api/payment/schedule/vouchers/${subscriptionId}/1`;

    this.http.get<any>(url).subscribe(
      (response) => {
        if (response.status === 1) {
          this.schedule = response.objModel;
          console.log('response', this.schedule);
        } else {
          alert('Error al obtener el cronograma');
        }
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching schedule:', error);
        alert('Error al obtener el cronograma. Por favor, inténtelo de nuevo.');
        this.isLoading = false;
      }
    );
  }

  validatePayment(idSuscription: number, idPayment: number) {
    const payload = {
      IdSuscription: idSuscription,
      ListIdPaymentsValidate: [idPayment],
      IsAcceptedPayment: 1,
      ReasonRejection: {
        id: idPayment,
        Detalle: '',
      },
    };

    this.http
      .post('https://inclubtest.com:2053/api/payment/validate', payload)
      .subscribe(
        (response) => {
          this.updatePaymentStatus(idPayment, 1);
        },
        (error) => {
          console.error('Error validating payment:', error);
        }
      );
  }

  updatePaymentStatus(idPayment: number, newStatus: number) {
    const payment = this.schedule.find((item) => item.idPayment === idPayment);
    if (payment) {
      payment.verif = newStatus;
      payment.verifText = newStatus === 1 ? 'Activo' : 'Inactivo';
    }
  }
}
