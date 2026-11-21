package com.miAula.miAula.dtos.recurso;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import com.miAula.miAula.util.CodigoUtils;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecursoUpdateDTO {

    @Schema(description = "ID único del recurso", example = "1")
    @NotNull(message = "El ID del recurso no puede ser nulo")
    private Long id;

    @Schema(description = "Código único del recurso", example = "PROY01")
    @NotBlank(message = "El código del recurso no puede estar vacío")
    @Pattern(regexp = CodigoUtils.PATRON_ENTRADA, message = "El código debe tener exactamente 6 caracteres alfanuméricos, sin espacios")
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
