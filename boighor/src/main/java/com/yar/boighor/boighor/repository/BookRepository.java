package com.yar.boighor.boighor.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RestResource;

import com.yar.boighor.boighor.entity.Book;
//@CrossOrigin("http://localhost:4200") //* when we allow all app
public interface BookRepository extends JpaRepository<Book,Long> {
	
	@RestResource(path="categoryid")
	Page<Book> findByCategoryId(@Param("id") Long id , Pageable pageable);
	
	@RestResource(path="search-keyword")
	Page<Book> findByNameContaining(@Param("name") String keyword , Pageable pageable);
}
