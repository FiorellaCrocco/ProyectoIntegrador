package com.proyecto.onlybooks.entity;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static org.springframework.security.config.Customizer.withDefaults;


@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final AuthenticationProvider authProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http

                .csrf(csrf ->
                        csrf
                                .disable())
                .authorizeHttpRequests(authRequest ->
                        authRequest
                          //      .requestMatchers("/**").permitAll()
                                .requestMatchers("/doc/**").permitAll()
                                .requestMatchers("/v3/api-docs/**").permitAll()
                                .requestMatchers("/auth/**").permitAll()
                                .requestMatchers("/book/listar").permitAll()
                                .requestMatchers("/book/{id}").permitAll()
                                .requestMatchers("/categoria/listar").permitAll()
                                .requestMatchers("/categoria/{id}").permitAll()
                                .requestMatchers("/caracteristica/listar").permitAll()
                                .requestMatchers("/caracteristica/{id}").permitAll()

                                .requestMatchers("/book/agregar").hasAuthority("ADMIN")
                                .requestMatchers("/book/eliminar/**").hasAuthority("ADMIN")
                                .requestMatchers("/user/**").hasAuthority("ADMIN")
                                .requestMatchers("/subscription/**").hasAuthority("ADMIN")
                                .requestMatchers("/bookRent/**").hasAuthority("ADMIN")

                                .anyRequest().authenticated()
                )
                .cors(withDefaults())
                .sessionManagement(sessionManager ->
                        sessionManager
                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authProvider)
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)


                .build();


    }


}