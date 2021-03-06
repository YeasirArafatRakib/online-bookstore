package com.yar.boighor.boighor.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.yar.boighor.boighor.entity.BookCategory;

//@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(path="book-category")
public interface BookCategoryRepository extends JpaRepository<BookCategory,Long> {

}
