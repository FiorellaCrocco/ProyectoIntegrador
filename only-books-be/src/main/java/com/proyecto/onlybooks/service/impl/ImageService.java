package com.proyecto.onlybooks.service.impl;

import com.proyecto.onlybooks.entity.Categoria;
import com.proyecto.onlybooks.entity.Image;
import com.proyecto.onlybooks.entity.User;
import com.proyecto.onlybooks.exceptions.ResourceNotFoundException;
import com.proyecto.onlybooks.repository.IImageRepository;
import com.proyecto.onlybooks.service.IImageService;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ImageService implements IImageService {

    private static final Logger logger = Logger.getLogger(User.class);

    IImageRepository iImageRepository;

    public ImageService(IImageRepository iImageRepository) {
        this.iImageRepository = iImageRepository;
    }

    @Override
    public Long guardar(Image image) {
        logger.info("Image - guardar: Se va a guardar la imagen");
        iImageRepository.save(image);
        return image.getId();
    }

    @Override
    public void modificar(Image image) {
        logger.info("Image - actualizar: Se va a actualizar la imagen");
        guardar(image);
    }

    @Override
    public void eliminar(Long id) throws ResourceNotFoundException {
        Optional<Image> found = iImageRepository.findById(id);
        if (found.isPresent()) {
            iImageRepository.deleteById(id);
            logger.warn("Image - eliminar: Se ha eliminado la imagen");
        } else {
            logger.error("No se ha encontrado ninguna imagen con id " + id);
            throw new ResourceNotFoundException("No se ha encontrado la imagen");
        }
    }

    @Override
    public void guardarTodas(List<Image> images) {
        iImageRepository.saveAll(images);
    }
}
