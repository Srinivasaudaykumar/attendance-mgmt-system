package com.learndesk.ams.service;

import com.learndesk.ams.domain.AttendanceEntry;
import com.learndesk.ams.domain.User;
import com.learndesk.ams.repository.AttendanceEntryRepository;
import com.learndesk.ams.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


@Service
@Transactional
public class AttendanceEntryService {

    private final Logger log = LoggerFactory.getLogger(AttendanceEntryService.class);

    private final AttendanceEntryRepository attendanceEntryRepository;

    private final UserRepository userRepository;

    public AttendanceEntryService(AttendanceEntryRepository attendanceEntryRepository, UserRepository userRepository) {
        this.attendanceEntryRepository = attendanceEntryRepository;
        this.userRepository = userRepository;
    }

    /**
     * Save a attendenceEntry.
     *
     * @param attendanceEntry the entity to save.
     * @return the persisted entity.
     */
    public AttendanceEntry save(AttendanceEntry attendanceEntry) {
        log.debug("Request to save AttendenceEntry : {}", attendanceEntry);
        return attendanceEntryRepository.save(attendanceEntry);
    }

    /**
     * Get all the attendenceEntries.
     *
     * @param pageable the pagination information.
     * @param userLogin
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<AttendanceEntry> findAll(Pageable pageable, String userLogin) {
        log.debug("Request to get all AttendenceEntries");
        Optional<User> user = userRepository.findOneByLogin(userLogin);
        return attendanceEntryRepository.findAllByUser(user.get(), pageable);
    }


    /**
     * Get one attendenceEntry by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<AttendanceEntry> findOne(Long id) {
        log.debug("Request to get AttendenceEntry : {}", id);
        return attendanceEntryRepository.findById(id);
    }

    /**
     * Delete the attendenceEntry by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete AttendenceEntry : {}", id);
        attendanceEntryRepository.deleteById(id);
    }
}
