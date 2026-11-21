package com.miAula.miAula.dtos.evento;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
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
public class EventoCreateDTO {

    @NotBlank
    @Pattern(regexp = CodigoUtils.PATRON_ENTRADA, message = "El código debe tener exactamente 6 caracteres alfanuméricos, sin espacios")
    private String codigo;

    @NotBlank
    @Size(max = 50)
    private String nombre;

    @Size(max = 500)
    private String descripcion;

    @NotNull
    @Positive
    private Integer participantesMaximos;

    @NotNull
    private Long organizadorId;
}