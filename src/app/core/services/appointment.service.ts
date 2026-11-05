import { Injectable, signal } from '@angular/core';
import { Appointment, AppointmentStatus } from '../models/appointment.model';

const STORAGE_KEY = 'biozone_appointments_v1';

@Injectable({ providedIn: 'root' })
export class AppointmentService {
  private readonly appointmentsState = signal<Appointment[]>(this.load());
  readonly appointments = this.appointmentsState.asReadonly();

  create(data: Omit<Appointment, 'id' | 'status' | 'createdAt'>): Appointment {
    const appointment: Appointment = {
      ...data, id: this.createId(), status: 'Pendiente', createdAt: new Date().toISOString()
    };
    this.commit([appointment, ...this.appointmentsState()]);
    return appointment;
  }

  updateStatus(id: string, status: AppointmentStatus): void {
    this.commit(this.appointmentsState().map(item => item.id === id ? { ...item, status } : item));
  }

  remove(id: string): void { this.commit(this.appointmentsState().filter(item => item.id !== id)); }

  private commit(items: Appointment[]): void {
    this.appointmentsState.set(items);
    // Persistencia provisional local: sustituir por HttpClient/API cuando exista backend.
    if (typeof localStorage !== 'undefined') localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }

  private load(): Appointment[] {
    if (typeof localStorage === 'undefined') return [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) as Appointment[] : [];
    } catch { return []; }
  }

  private createId(): string { return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`; }
}
