package com.yar.boighor.boighor.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.yar.boighor.boighor.entity.Book;
@CrossOrigin("*")
public interface BookRepository extends JpaRepository<Book,Long> {

}
