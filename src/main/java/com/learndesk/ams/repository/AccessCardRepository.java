package com.learndesk.ams.repository;

import com.learndesk.ams.domain.AccessCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the AccessCard entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AccessCardRepository extends JpaRepository<AccessCard, Long> {

}
