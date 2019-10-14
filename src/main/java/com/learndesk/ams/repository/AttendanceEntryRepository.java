package com.learndesk.ams.repository;

import com.learndesk.ams.domain.AttendanceEntry;
import com.learndesk.ams.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



/**
 * Spring Data  repository for the AttendenceEntry entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AttendanceEntryRepository extends JpaRepository<AttendanceEntry, Long> {

    Page<AttendanceEntry> findAllByUser(User user, Pageable pageable);

}
