import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AppointmentService } from '../../core/services/appointment.service';
import { Appointment, AppointmentStatus } from '../../core/models/appointment.model';

@Component({ selector: 'app-admin', standalone: true, imports: [CommonModule, RouterLink], templateUrl: './admin.component.html', styleUrl: './admin.component.css' })
export class AdminComponent {
  private readonly service = inject(AppointmentService);
  readonly appointments = this.service.appointments;
  readonly search = signal('');
  readonly filter = signal('Todas');
  readonly filteredAppointments = computed(() => {
    const term = this.search().toLowerCase().trim();
    return this.appointments().filter(item => (this.filter() === 'Todas' || item.status === this.filter()) &&
      [item.patientName, item.phone, item.service, item.email].some(value => value.toLowerCase().includes(term)));
  });
  readonly pendingCount = computed(() => this.appointments().filter(item => item.status === 'Pendiente').length);
  readonly confirmedCount = computed(() => this.appointments().filter(item => item.status === 'Confirmada').length);
  readonly todayCount = computed(() => this.appointments().filter(item => item.date === new Date().toISOString().slice(0, 10)).length);
  readonly statuses: AppointmentStatus[] = ['Pendiente', 'Confirmada', 'Atendida', 'Cancelada'];
  setSearch(value: string): void { this.search.set(value); }
  setFilter(value: string): void { this.filter.set(value); }
  changeStatus(item: Appointment, value: string): void { this.service.updateStatus(item.id, value as AppointmentStatus); }
  deleteAppointment(item: Appointment): void {
    if (globalThis.confirm(`¿Eliminar la solicitud de ${item.patientName}?`)) this.service.remove(item.id);
  }
  formatDate(value: string): string { return new Date(`${value}T12:00:00`).toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' }); }
}
