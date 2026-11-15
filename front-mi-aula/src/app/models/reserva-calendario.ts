export interface ReservaCalendario {
  id: string | number;
  title: string;
  start: string;
  end: string;
  color?: string;
  resourceId?: string;
  extendedProps?: {
    asignatura?: string;
    aula?: string;
    comision?: string;
    profesor?: string;
    dia?: string;
    capacidad?: number;
    tipoEspacio?: string;
    profesorId?: number | null;
    comisionId?: number;
    estado?: string;
  };
}
