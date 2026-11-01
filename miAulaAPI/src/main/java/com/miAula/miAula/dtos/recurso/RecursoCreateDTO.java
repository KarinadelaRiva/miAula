package com.miAula.miAula.dtos.recurso;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RecursoCreateDTO {

    @Schema(description = "Código único del recurso", example = "PROY01")
    @NotBlank(message = "El código del recurso no puede estar vacío")
    @Size( min=6, max = 6, message = "El código del recurso debe tener exactamente 6 caracteres")
    private String codigo;

    @Schema(description = "Nombre del recurso", example = "Proyector")
    @NotBlank(message = "El nombre del recurso no puede estar vacío")
    @Size(max = 30, message = "El nombre del recurso no puede superar los 30 caracteres")
    private String nombre;

    @Schema(description = "Descripción del recurso", example = "Proyector HDMI")
    @Size(max = 250, message = "La descripción no puede superar los 250 caracteres")
    private String descripcion;

    @Schema(description = "Cantidad disponible del recurso", example = "5")
    @NotNull(message = "La cantidad del recurso no puede ser nula")
    @Min(value = 0, message = "La cantidad no puede ser negativa")
    private Integer cantidad;
}
