package com.yar.boighor.boighor.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.yar.boighor.boighor.entity.Book;

public interface BookRepository extends JpaRepository<Book,Long> {

}
