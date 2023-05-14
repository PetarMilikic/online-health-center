export interface ICreateAppointmentRequest
{
    patientId : string;
    appointmentTime: string;
    appointmentId: string;
    specialty: string;
    doctorId: string;
    requestCreatedBy: string;
    initialPrice: number;
    requestCreatedTime: string;
    requestStatus: string;
}