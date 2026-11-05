import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AppointmentService } from '../../core/services/appointment.service';

@Component({
  selector: 'app-home', standalone: true, imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './home.component.html', styleUrl: './home.component.css'
})
export class HomeComponent {
  private readonly fb = inject(FormBuilder);
  private readonly appointments = inject(AppointmentService);
  submitted = false;
  readonly currentYear = new Date().getFullYear();
  successMessage = '';
  readonly minDate = new Date().toISOString().slice(0, 10);
  readonly services = [
    { icon: '✧', title: 'Consulta médica', description: 'Valoración integral y orientación personalizada para cuidar tu salud.' },
    { icon: '❋', title: 'Medicina natural', description: 'Acompañamiento en hábitos y alternativas naturales de bienestar.' },
    { icon: '♡', title: 'Bienestar preventivo', description: 'Estrategias para promover una vida saludable y equilibrada.' },
    { icon: '◈', title: 'Control y seguimiento', description: 'Seguimiento de objetivos y evolución de cada paciente.' }
  ];
  readonly appointmentForm = this.fb.nonNullable.group({
    patientName: ['', [Validators.required, Validators.minLength(3)]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9+()\-\s]{7,20}$/)]],
    email: ['', [Validators.required, Validators.email]],
    service: ['Consulta médica', Validators.required],
    date: ['', Validators.required], time: ['', Validators.required], notes: ['']
  });

  submitAppointment(): void {
    this.submitted = true;
    this.successMessage = '';
    if (this.appointmentForm.invalid) { this.appointmentForm.markAllAsTouched(); return; }
    const value = this.appointmentForm.getRawValue();
    this.appointments.create({ ...value, notes: value.notes.trim() });
    this.successMessage = 'Tu solicitud quedó registrada. El consultorio podrá contactarte para confirmar la cita.';
    this.appointmentForm.reset({ patientName: '', phone: '', email: '', service: 'Consulta médica', date: '', time: '', notes: '' });
    this.submitted = false;
  }
}
