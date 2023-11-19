package com.proyecto.onlybooks.service.impl;



import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.proyecto.onlybooks.dto.BookDTO;
import com.proyecto.onlybooks.dto.UserDTO;
import com.proyecto.onlybooks.entity.Book;
import com.proyecto.onlybooks.entity.Resenia;
import com.proyecto.onlybooks.entity.User;
import com.proyecto.onlybooks.exceptions.ResourceNotFoundException;
import com.proyecto.onlybooks.repository.IReseniaRepository;
import com.proyecto.onlybooks.service.IBookService;
import com.proyecto.onlybooks.service.IReseniaService;
import com.proyecto.onlybooks.service.IUserService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ReseniaService implements IReseniaService {

    private static final Logger logger = Logger.getLogger(Resenia.class);

    private final IReseniaRepository iReseniaRepository;
    private final IUserService iUserService;
    private final IBookService iBookService;
    private ObjectMapper objectMapper;

    @Autowired
    public ReseniaService(IReseniaRepository iReseniaRepository, IUserService iUserService, ObjectMapper objectMapper, IBookService iBookService){
        this.iReseniaRepository=iReseniaRepository;
        this.objectMapper = objectMapper;
        this.iUserService=iUserService;
        this.iBookService=iBookService;
    }

    @Override
    public Long guardar(Resenia resenia) throws ResourceNotFoundException {
        logger.info("Reseña - guardar: Se va a guardar la reseña");
        objectMapper.registerModule(new JavaTimeModule());
        Long bookId = resenia.getBook().getId();
        Long userId= resenia.getUser().getId();
        UserDTO u = iUserService.buscarPorId(userId);
        BookDTO b = iBookService.buscarPorId(bookId);
        User user = objectMapper.convertValue(u,User.class);
        Book book = objectMapper.convertValue(b, Book.class);

        if(book.getCantResenias()==null){
            book.setQualification(0d);
            book.setCantResenias(0);
        }
        book.setQualification(((book.getQualification()*book.getCantResenias())+resenia.getPuntuacion())/(book.getCantResenias()+1));
        book.setCantResenias(book.getCantResenias()+1);

        resenia.setBook(book);
        resenia.setUser(user);
        if(book.getResenias()==null){
            List<Resenia> listaNueva = new ArrayList<>();
            listaNueva.add(resenia);
            book.setResenias(listaNueva);
        }else {
            List<Resenia> listaResenias = book.getResenias();
            listaResenias.add(resenia);
            book.setResenias(listaResenias);
        }


        iBookService.modificar(book);
        iReseniaRepository.save(resenia);
        return resenia.getId();
    }
    @Override
    public List<Resenia> mostrarTodos() {
        return iReseniaRepository.findAll();
    }

    @Override
    public Resenia buscarPorId(Long id)throws ResourceNotFoundException{
        Optional<Resenia> found = iReseniaRepository.findById(id);
        if(found.isPresent()) {
            logger.info("Reseña - buscarPorId: Se encontro la reseña");
            return found.get();
        }else{
            logger.warn("Reseña - buscarPorId: No se encontreo ninguna reseña con id: "+id);
            throw new ResourceNotFoundException("Reseña no existe");
        }
    }

    @Override
    public void modificar(Resenia resenia) throws ResourceNotFoundException {
        logger.info("Reseña - actualizar: se va a actualizar la reseña");
        guardar(resenia);
    }

    @Override
    public void eliminar(Long id) throws ResourceNotFoundException{
        Optional<Resenia> found = iReseniaRepository.findById(id);
        if(found.isPresent()){
            iReseniaRepository.deleteById(id);
            logger.warn("Reseña - eliminar: Se ha eliminado la reseña");
        }else{
            logger.warn("No se ha encontrado ninguna reseña con id "+ id);
            throw new ResourceNotFoundException("No se ha encontrado la reseña");
        }
    }

    @Override
    public List<Resenia> buscarReseniaPorBookId(Long id) throws ResourceNotFoundException{
        List<Resenia> lista = iReseniaRepository.buscarReseniaPorBookId(id);
        if(lista!=null){
            return lista;
        }
        throw new ResourceNotFoundException("No existen reseñas para el libro");

    }


}
