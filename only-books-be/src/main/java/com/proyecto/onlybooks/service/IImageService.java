package com.proyecto.onlybooks.service;

import com.proyecto.onlybooks.entity.Image;
import com.proyecto.onlybooks.exceptions.ResourceNotFoundException;

import java.util.List;

public interface IImageService {
    Long guardar(Image image);
    void modificar(Image image);
    void eliminar(Long id) throws ResourceNotFoundException;
    void guardarTodas(List<Image> images);
}
