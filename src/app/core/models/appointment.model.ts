export type AppointmentStatus = 'Pendiente' | 'Confirmada' | 'Atendida' | 'Cancelada';
export interface Appointment {
  id: string;
  patientName: string;
  phone: string;
  email: string;
  service: string;
  date: string;
  time: string;
  notes: string;
  status: AppointmentStatus;
  createdAt: string;
}
