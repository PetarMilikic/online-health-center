import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAppointmentEntity } from '../model/appointmentEntity';
import { IAppointmentApproveRequest } from '../model/appointment-approve-request';
import { IAppointmentCancelRequest } from '../model/appoinement-cancel-request';
import { IAppointmentDeleteRequest } from '../model/appointment-delete-request';
import { IApplyDiscuntRequest } from '../model/apply-discount-request';

@Injectable({
  providedIn: 'root'
})

export class AppointmentsService {

  private readonly commonPath: string = "http://localhost:8005/api/v1/Appointments/";

  constructor(private httpClient: HttpClient){ }

  public getAppointmentsByPatientId(patientId: string): Observable<Array<IAppointmentEntity>>
  {
    //TODO: Update the connection string to be like *localhost:8005* after setting up CORS
    const connectionString = this.commonPath + 'GetAppointmentsByPatientId/' + patientId+"?patientId="+patientId;
    return this.httpClient.get<Array<IAppointmentEntity>>(connectionString);
  }
  
  public approveAppointment(patientId: string, appointmentTime: string): Observable<boolean>
  {
    const connectionString = this.commonPath + 'ApproveAppointment';
    const approveRequest: IAppointmentApproveRequest = {patientId: patientId, appointmentTime: appointmentTime};
    
    return this.httpClient.put<boolean>(connectionString, approveRequest);
  }

  public cancelAppointment(patientId: string, appointmentTime: string): Observable<boolean>
  {
    const connectionString = this.commonPath + 'CancelAppointment';
    const cancelRequest: IAppointmentCancelRequest = {patientId: patientId, appointmentTime: appointmentTime};
    
    return this.httpClient.put<boolean>(connectionString, cancelRequest);
  }

  public applyDiscount(patientId: string, specialty: string): Observable<boolean>
  {
    const connectionString = this.commonPath + 'ApplyDiscountAmount/' + patientId + "/" + specialty + "?patientId=" + patientId + "?specialty=" + specialty;
    const applyDiscountRequest: IApplyDiscuntRequest = {patientId: patientId, specialty: specialty};
    
    return this.httpClient.put<boolean>(connectionString, applyDiscountRequest);
  }
}
