export interface Reserva {
  id: string;
  activo?: boolean;
  dia: string;
  fecha_inicio: string;
  fecha_fin: string;
  hora_inicio: string;
  hora_fin: string;
  comision_id: number;
  aula_id: number;
  comision_nombre?: string;
  materia_nombre?: string;
  carrera_id?: number;
  carrera_nombre?: string;
  profesor_id?: number;
  profesor_nombre?: string;
  espacio_nombre?: string;
  capacidad?: number;
}
