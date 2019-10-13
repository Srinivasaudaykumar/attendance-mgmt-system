package com.learndesk.ams.web.rest;

import com.learndesk.ams.domain.AttendanceEntry;
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

    private final Logger log = LoggerFactory.getLogger(AttendanceEntryResource.class);

    private static final String ENTITY_NAME = "attendenceEntry";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AttendanceEntryService attendanceEntryService;

    public AttendanceEntryResource(AttendanceEntryService attendanceEntryService) {
        this.attendanceEntryService = attendanceEntryService;
    }

    /**
     * {@code POST  /attendence-entries} : Create a new attendenceEntry.
     *
     * @param attendanceEntry the attendenceEntry to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new attendenceEntry, or with status {@code 400 (Bad Request)} if the attendenceEntry has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/attendence-entries")
    public ResponseEntity<AttendanceEntry> createAttendenceEntry(@RequestBody AttendanceEntry attendanceEntry) throws URISyntaxException {
        log.debug("REST request to save AttendenceEntry : {}", attendanceEntry);
        if (attendanceEntry.getId() != null) {
            throw new BadRequestAlertException("A new attendenceEntry cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AttendanceEntry result = attendanceEntryService.save(attendanceEntry);
        return ResponseEntity.created(new URI("/api/attendence-entries/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /attendence-entries} : Updates an existing attendenceEntry.
     *
     * @param attendanceEntry the attendenceEntry to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated attendenceEntry,
     * or with status {@code 400 (Bad Request)} if the attendenceEntry is not valid,
     * or with status {@code 500 (Internal Server Error)} if the attendenceEntry couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/attendence-entries")
    public ResponseEntity<AttendanceEntry> updateAttendenceEntry(@RequestBody AttendanceEntry attendanceEntry) throws URISyntaxException {
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
     * {@code GET  /attendence-entries} : get all the attendenceEntries.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of attendenceEntries in body.
     */
    @GetMapping("/attendence-entries")
    public ResponseEntity<List<AttendanceEntry>> getAllAttendenceEntries(Pageable pageable) {
        log.debug("REST request to get a page of AttendenceEntries");
        Page<AttendanceEntry> page = attendanceEntryService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /attendence-entries/:id} : get the "id" attendenceEntry.
     *
     * @param id the id of the attendenceEntry to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the attendenceEntry, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/attendence-entries/{id}")
    public ResponseEntity<AttendanceEntry> getAttendenceEntry(@PathVariable Long id) {
        log.debug("REST request to get AttendenceEntry : {}", id);
        Optional<AttendanceEntry> attendenceEntry = attendanceEntryService.findOne(id);
        return ResponseUtil.wrapOrNotFound(attendenceEntry);
    }

    /**
     * {@code DELETE  /attendence-entries/:id} : delete the "id" attendenceEntry.
     *
     * @param id the id of the attendenceEntry to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/attendence-entries/{id}")
    public ResponseEntity<Void> deleteAttendenceEntry(@PathVariable Long id) {
        log.debug("REST request to delete AttendenceEntry : {}", id);
        attendanceEntryService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
