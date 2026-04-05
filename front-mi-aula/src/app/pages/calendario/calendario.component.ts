import { Component, signal, ViewEncapsulation, ViewChild, AfterViewInit, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventInput, Calendar } from '@fullcalendar/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ReservaService } from '../../services/reserva.service';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './calendario.component.html',
  // styleUrls: ['./calendario.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CalendarioComponent implements AfterViewInit, OnInit {
  
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
  private reservaService = inject(ReservaService);

  // Vista actual
  vistaActual = signal<'diario' | 'semanal' | 'mensual'>('diario');

  // Reservas cargadas desde la API
  reservasAprobadas = signal<EventInput[]>([]);
  
  // Recursos (espacios/aulas) para la vista de recursos
  espaciosRecursos = signal<any[]>([]);

  ngOnInit() {
    // Inicializar con arrays vacíos para evitar datos fantasma
    this.reservasAprobadas.set([]);
    this.espaciosRecursos.set([]);
    
    this.cargarReservas();
  }

  // Cargar reservas desde la API
  cargarReservas() {
    console.log('🔄 Cargando reservas desde la API...');
    this.reservaService.getReservasParaCalendario().subscribe({
      next: (reservas) => {
        console.log('✅ Reservas cargadas:', reservas.length, 'eventos');
        console.log('📋 Primeras 3 reservas:', reservas.slice(0, 3));
        
        if (reservas.length === 0) {
          console.log('⚠️ No se encontraron reservas, cargando fallback...');
          this.cargarDatosFallback();
          return;
        }
        
        // Procesar reservas y crear recursos (espacios)
        const reservasConRecursos = this.procesarReservasConRecursos(reservas);
        this.reservasAprobadas.set(reservasConRecursos);
        
        // Actualizar el calendario con las nuevas reservas y recursos
        this.actualizarCalendario();
      },
      error: (error) => {
        console.error('❌ Error cargando reservas:', error);
        console.log('🔄 Cargando datos de fallback debido a error de API');
        // En caso de error, mantener datos simulados como fallback
        this.cargarDatosFallback();
      }
    });
  }

  // Procesar reservas y extraer espacios únicos para recursos
  private procesarReservasConRecursos(reservas: EventInput[]) {
    console.log('🔄 Procesando', reservas.length, 'reservas para extraer espacios...');
    
    // Limpiar recursos previos
    this.espaciosRecursos.set([]);
    
    // Usar fecha de hoy (2025-11-23)
    const fechaHoy = '2025-11-23';
    console.log('📅 Filtrando reservas para hoy:', fechaHoy);
    
    // Filtrar reservas solo para hoy
    const reservasHoy = reservas.filter(reserva => {
      const fechaReserva = new Date(reserva.start as string).toISOString().split('T')[0];
      const esHoy = fechaReserva === fechaHoy;
      if (esHoy) {
        console.log('✅ Reserva de hoy encontrada:', reserva.title, 'en', reserva.extendedProps?.['aula']);
      }
      return esHoy;
    });
    
    console.log('📊 Reservas de hoy:', reservasHoy.length, 'de', reservas.length, 'totales');
    
    // Extraer espacios únicos solo de las reservas de hoy
    const espaciosUnicos = new Set<string>();
    
    reservasHoy.forEach(reserva => {
      if (reserva.extendedProps?.['aula']) {
        espaciosUnicos.add(reserva.extendedProps['aula']);
        console.log('🏫 Aula ocupada hoy:', reserva.extendedProps['aula']);
      }
    });

    // Crear recursos para FullCalendar
    const recursos = Array.from(espaciosUnicos).map(aula => ({
      id: aula,
      title: aula
    }));

    console.log('🏫 Total de aulas ocupadas HOY:', recursos.length);
    console.log('📋 Aulas ocupadas hoy:', recursos);
    
    this.espaciosRecursos.set(recursos);

    // Agregar resourceId a cada evento (todos los eventos, no solo los de hoy)
    const reservasConRecursos = reservas.map(reserva => ({
      ...reserva,
      resourceId: reserva.extendedProps?.['aula'] || 'sin-aula'
    }));

    console.log('✅ Reservas procesadas:', reservasConRecursos.length);
    console.log('🎯 IMPORTANTE: Solo se mostrarán', recursos.length, 'aulas ocupadas HOY');
    return reservasConRecursos;
  }

  // Actualizar calendario con configuración actual
  private actualizarCalendario() {
    const vistaActual = this.vistaActual();
    const recursos = this.espaciosRecursos();
    
    console.log('📅 Actualizando calendario...');
    console.log('👁️ Vista actual:', vistaActual);
    console.log('🏫 Recursos disponibles:', recursos.length, recursos);
    console.log('📊 Eventos disponibles:', this.reservasAprobadas().length);
    
    // Determinar qué vista usar
    let tipoVista: string;
    switch(vistaActual) {
      case 'diario':
        tipoVista = 'resourceTimeGridDay'; // Siempre con recursos en vista diaria
        break;
      case 'semanal':
        tipoVista = 'timeGridWeek'; // Vista normal en semanal
        break;
      case 'mensual':
        tipoVista = 'dayGridMonth'; // Vista normal en mensual
        break;
      default:
        tipoVista = 'resourceTimeGridDay';
    }

    // Actualizar opciones del calendario
    this.calendarOptions.update(options => ({
      ...options,
      initialView: tipoVista,
      events: this.reservasAprobadas(),
      resources: vistaActual === 'diario' ? recursos : []
    }));

    console.log('📅 Calendario actualizado - Vista:', tipoVista);
    console.log('🏫 Recursos asignados:', vistaActual === 'diario' ? recursos.length : 'Sin recursos (vista normal)');

    // Si el calendario ya está inicializado, cambiar vista
    if (this.calendarComponent) {
      const calendarApi = this.calendarComponent.getApi();
      calendarApi.changeView(tipoVista);
      
      // Forzar actualización de recursos en la vista diaria
      if (vistaActual === 'diario') {
        console.log('🔄 Forzando actualización de recursos:', recursos);
        calendarApi.setOption('resources', recursos);
      }
    }
  }

  // Datos de fallback en caso de error
  private cargarDatosFallback() {
    const reservasFallback: EventInput[] = [
      {
        title: 'Programación I - Aula 101',
        start: '2025-11-25T08:00:00',
        end: '2025-11-25T10:00:00',
        color: '#dc3545',
        resourceId: 'Aula 101',
        extendedProps: {
          asignatura: 'Programación I',
          aula: 'Aula 101',
          comision: 'K1051'
        }
      },
      {
        title: 'Base de Datos - Laboratorio 2',
        start: '2025-11-25T10:00:00',
        end: '2025-11-25T12:00:00',
        color: '#ffc107',
        resourceId: 'Laboratorio 2',
        extendedProps: {
          asignatura: 'Base de Datos',
          aula: 'Laboratorio 2',
          comision: 'K2052'
        }
      },
      {
        title: 'Matemática I - Aula 203',
        start: '2025-11-25T14:00:00',
        end: '2025-11-25T16:00:00',
        color: '#007bff',
        resourceId: 'Aula 203',
        extendedProps: {
          asignatura: 'Matemática I',
          aula: 'Aula 203',
          comision: 'K1053'
        }
      },
      {
        title: 'Física I - Laboratorio 1',
        start: '2025-11-25T16:00:00',
        end: '2025-11-25T18:00:00',
        color: '#28a745',
        resourceId: 'Laboratorio 1',
        extendedProps: {
          asignatura: 'Física I',
          aula: 'Laboratorio 1',
          comision: 'K1054'
        }
      },
      {
        title: 'Algoritmos - Aula 205',
        start: '2025-11-25T09:00:00',
        end: '2025-11-25T11:00:00',
        color: '#dc3545',
        resourceId: 'Aula 205',
        extendedProps: {
          asignatura: 'Algoritmos',
          aula: 'Aula 205',
          comision: 'K2055'
        }
      }
    ];
    
    // Para fallback, también procesamos reservas para extraer recursos
    const reservasConRecursos = this.procesarReservasConRecursos(reservasFallback);
    this.reservasAprobadas.set(reservasConRecursos);
    this.actualizarCalendario();
    
    console.log('⚠️ Usando datos de fallback - JSON server no disponible');
    console.log('📊 Cargadas', reservasFallback.length, 'reservas de demostración');
  }

  // Configuración del calendario
  calendarOptions = signal<CalendarOptions>({
    plugins: [dayGridPlugin, timeGridPlugin, resourceTimeGridPlugin, interactionPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: '' // Quitamos los botones por defecto, usamos nuestros filtros
    },
    initialView: 'resourceTimeGridDay',
    weekends: true,
    editable: false,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    events: this.reservasAprobadas(),
    resources: [], // Sin recursos por defecto, se cargan dinámicamente
    locale: 'es', // Español
    height: 'auto',
    eventClick: this.handleEventClick.bind(this),
    select: this.handleDateSelect.bind(this),
    firstDay: 1, // Lunes como primer día
    slotMinTime: '07:00:00',
    slotMaxTime: '22:00:00',
    eventTimeFormat: {
      hour: 'numeric',
      minute: '2-digit',
      omitZeroMinute: false
    },
    // Configuración específica para recursos
    resourceAreaHeaderContent: 'Aulas/Espacios',
    resourceAreaWidth: '200px',
    resourceOrder: 'title'
  });

  // Cambiar vista
  cambiarVista(vista: 'diario' | 'semanal' | 'mensual') {
    console.log('🔄 Cambiando vista a:', vista);
    console.log('🏫 Recursos actuales antes del cambio:', this.espaciosRecursos());
    
    this.vistaActual.set(vista);
    this.actualizarCalendario();
    
    // Verificación adicional después del cambio
    if (vista === 'diario') {
      console.log('✅ Vista diaria activada. Recursos que se deberían mostrar:', this.espaciosRecursos());
      if (this.espaciosRecursos().length === 0) {
        console.log('⚠️ PROBLEMA: No hay recursos para vista diaria!');
      }
    }
  }

  ngAfterViewInit() {
    // Componente inicializado
  }

  // Manejar click en evento
  handleEventClick(info: any) {
    const evento = info.event;
    const fechaInicio = evento.start.toLocaleDateString('es-ES', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    const horaInicio = evento.start.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    const horaFin = evento.end.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    
    const props = evento.extendedProps;
    
    alert(`
📅 ${evento.title}

� Asignatura: ${props.asignatura || 'Sin asignatura'}
🏫 Aula: ${props.aula || 'Sin aula'}
🎓 Comisión: ${props.comision || 'Sin comisión'}
👥 Capacidad: ${props.capacidad || 'N/A'} personas
🏢 Tipo: ${props.tipoEspacio || 'AULA'}

📆 Fecha: ${fechaInicio}
⏰ Horario: ${horaInicio} - ${horaFin}
📅 Día: ${props.dia || ''}
    `);
  }

  // Manejar selección de fecha
  handleDateSelect(info: any) {
    console.log('Fecha seleccionada:', info.startStr);
  }

  // Devuelve el título de la vista actual
  getTituloVista(): string {
    // Puedes personalizar el texto según la vista
    switch (this.vistaActual()) {
      case 'diario':
        return 'Vista Diario (por Aulas)';
      case 'semanal':
        return 'Vista Semanal';
      case 'mensual':
        return 'Vista Mensual';
      default:
        return 'Calendario';
    }
  }

  // Devuelve un mensaje informativo (puedes personalizarlo)
  getMensajeInfo(): string {
    return 'Solo se muestran las aulas ocupadas para la fecha seleccionada.';
  }
}