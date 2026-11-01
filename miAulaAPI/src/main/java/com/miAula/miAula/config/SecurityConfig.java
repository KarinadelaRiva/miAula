package com.miAula.miAula.config;

import com.miAula.miAula.security.jwt.JwtAuthFilter;
import com.miAula.miAula.service.UsuarioService;
import java.util.List;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;


@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private final String[] rutasSinRestriccion = {
        "/swagger-ui.html",
        "/auth/login",
        "/reservas/cronograma-por-dia",
        "/reservas/cronograma",
        "/usuarios",
        "/espacios", // sin restriccion de manera provisional para tests
        "/recursos" // sin restriccion de manera provisional para tests
    };
    
    private final String[] rutasSinRestriccionPOST = {
        "/usuarios"
    };

    // Bean para codificar y verificar contraseñas con BCrypt
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:4200"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("Authorization", "Content-Type"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }



    // Proveedor de autenticación que conecta al servicio de usuarios y al codificador
    @Bean
    public AuthenticationProvider authenticationProvider(UsuarioService userDetailsService) {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    // AuthenticationManager usando directamente el AuthenticationProvider
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationProvider authenticationProvider) {
        return new ProviderManager(authenticationProvider);
    }

    // Configuración del filtro de seguridad para proteger rutas y validar JWT
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http,
                                                    JwtAuthFilter jwtAuthFilter,
                                                    AuthenticationProvider authenticationProvider
                                                    ) throws Exception {
        return http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(rutasSinRestriccion).permitAll()
                        .requestMatchers(HttpMethod.POST, rutasSinRestriccionPOST).permitAll()
                        .requestMatchers(HttpMethod.PUT, "/espacios/**").permitAll()
                        .requestMatchers(HttpMethod.PATCH, "/espacios/**").permitAll()
                        .requestMatchers(HttpMethod.PUT, "/recursos/*").permitAll()
                        .requestMatchers(HttpMethod.PATCH, "/recursos/*").permitAll()
                        .requestMatchers(
                                "/swagger-ui/**",
                                "/v3/api-docs/**",
                                "/swagger-ui.html"
                        ).permitAll()
                        .anyRequest().authenticated()
                )
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

}