package com.proyecto.onlybooks.service.impl;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.proyecto.onlybooks.entity.*;
import com.proyecto.onlybooks.repository.IUserRepository;
import lombok.RequiredArgsConstructor;

import java.util.Optional;


@Service
@RequiredArgsConstructor
public class AuthService {

    private final IUserRepository iUserRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        UserDetails user=iUserRepository.findByEmail(request.getEmail()).orElseThrow();
        String token=jwtService.getToken(user);
        return AuthResponse.builder()
                .token(token)
                .build();
    }

    public AuthResponse register(RegisterRequest request) throws Exception {
        Optional<User> found = iUserRepository.findByEmail(request.getEmail());
        if(found.isEmpty()){
            User user = User.builder()
                    .lastname(request.getLastname())
                    .name(request.getName())
                    .dni(request.getDni())
                    .email(request.getEmail())
                    .password(passwordEncoder.encode( request.getPassword()))
                    .rol(Rol.USER)
                    .build();
            iUserRepository.save(user);
            return AuthResponse.builder()
                    .token(jwtService.getToken(user))
                    .build();
        }else {
            throw new Exception("Email esta en uso");
        }
    }
}
