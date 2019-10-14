package com.learndesk.ams.web.rest;

import com.learndesk.ams.domain.AttendanceEntry;
import com.learndesk.ams.security.SecurityUtils;
import com.learndesk.ams.service.AttendanceEntryService;
import com.learndesk.ams.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link AttendanceEntry}.
 */
@RestController
@RequestMapping("/api")
public class AttendanceEntryResource {


    private static class AttendanceResourceException extends RuntimeException {
        private AttendanceResourceException(String message) {
            super(message);
        }
    }

    private final Logger log = LoggerFactory.getLogger(AttendanceEntryResource.class);

    private static final String ENTITY_NAME = "attendanceEntry";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AttendanceEntryService attendanceEntryService;

    public AttendanceEntryResource(AttendanceEntryService attendanceEntryService) {
        this.attendanceEntryService = attendanceEntryService;
    }

    /**
     * {@code POST  /attendance-entries} : Create a new attendanceEntry.
     *
     * @param attendanceEntry the attendanceEntry to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new attendanceEntry, or with status {@code 400 (Bad Request)} if the attendanceEntry has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/attendance-entries")
    public ResponseEntity<AttendanceEntry> createAttendanceEntry(@RequestBody AttendanceEntry attendanceEntry) throws URISyntaxException {
        log.debug("REST request to save AttendanceEntry : {}", attendanceEntry);
        if (attendanceEntry.getId() != null) {
            throw new BadRequestAlertException("A new attendanceEntry cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AttendanceEntry result = attendanceEntryService.save(attendanceEntry);
        return ResponseEntity.created(new URI("/api/attendance-entries/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /attendance-entries} : Updates an existing attendanceEntry.
     *
     * @param attendanceEntry the attendanceEntry to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated attendanceEntry,
     * or with status {@code 400 (Bad Request)} if the attendanceEntry is not valid,
     * or with status {@code 500 (Internal Server Error)} if the attendanceEntry couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/attendance-entries")
    public ResponseEntity<AttendanceEntry> updateAttendanceEntry(@RequestBody AttendanceEntry attendanceEntry) throws URISyntaxException {
        log.debug("REST request to update AttendenceEntry : {}", attendanceEntry);
        if (attendanceEntry.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AttendanceEntry result = attendanceEntryService.save(attendanceEntry);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, attendanceEntry.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /attendance-entries} : get all the attendanceEntries.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of attendanceEntries in body.
     */
    @GetMapping("/attendance-entries")
    public ResponseEntity<List<AttendanceEntry>> getAllAttendanceEntries(Pageable pageable) {
        log.debug("REST request to get a page of AttendanceEntries");
        String userLogin = SecurityUtils.getCurrentUserLogin().orElseThrow(() -> new AttendanceResourceException("user login not found"));
        Page<AttendanceEntry> page = attendanceEntryService.findAll(pageable, userLogin);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /attendance-entries/:id} : get the "id" attendanceEntry.
     *
     * @param id the id of the attendanceEntry to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the attendanceEntry, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/attendance-entries/{id}")
    public ResponseEntity<AttendanceEntry> getAttendanceEntry(@PathVariable Long id) {
        log.debug("REST request to get AttendanceEntry : {}", id);
        Optional<AttendanceEntry> attendanceEntry = attendanceEntryService.findOne(id);
        return ResponseUtil.wrapOrNotFound(attendanceEntry);
    }

    /**
     * {@code DELETE  /attendance-entries/:id} : delete the "id" attendanceEntry.
     *
     * @param id the id of the attendanceEntry to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/attendance-entries/{id}")
    public ResponseEntity<Void> deleteAttendanceEntry(@PathVariable Long id) {
        log.debug("REST request to delete AttendanceEntry : {}", id);
        attendanceEntryService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
