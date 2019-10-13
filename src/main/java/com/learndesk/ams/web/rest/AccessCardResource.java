package com.learndesk.ams.web.rest;

import com.learndesk.ams.domain.AccessCard;
import com.learndesk.ams.service.AccessCardService;
import com.learndesk.ams.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.learndesk.ams.domain.AccessCard}.
 */
@RestController
@RequestMapping("/api")
public class AccessCardResource {

    private final Logger log = LoggerFactory.getLogger(AccessCardResource.class);

    private static final String ENTITY_NAME = "accessCard";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AccessCardService accessCardService;

    public AccessCardResource(AccessCardService accessCardService) {
        this.accessCardService = accessCardService;
    }

    /**
     * {@code POST  /access-cards} : Create a new accessCard.
     *
     * @param accessCard the accessCard to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new accessCard, or with status {@code 400 (Bad Request)} if the accessCard has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/access-cards")
    public ResponseEntity<AccessCard> createAccessCard(@RequestBody AccessCard accessCard) throws URISyntaxException {
        log.debug("REST request to save AccessCard : {}", accessCard);
        if (accessCard.getId() != null) {
            throw new BadRequestAlertException("A new accessCard cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AccessCard result = accessCardService.save(accessCard);
        return ResponseEntity.created(new URI("/api/access-cards/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /access-cards} : Updates an existing accessCard.
     *
     * @param accessCard the accessCard to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated accessCard,
     * or with status {@code 400 (Bad Request)} if the accessCard is not valid,
     * or with status {@code 500 (Internal Server Error)} if the accessCard couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/access-cards")
    public ResponseEntity<AccessCard> updateAccessCard(@RequestBody AccessCard accessCard) throws URISyntaxException {
        log.debug("REST request to update AccessCard : {}", accessCard);
        if (accessCard.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AccessCard result = accessCardService.save(accessCard);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, accessCard.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /access-cards} : get all the accessCards.
     *

     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of accessCards in body.
     */
    @GetMapping("/access-cards")
    public List<AccessCard> getAllAccessCards(@RequestParam(required = false) String filter) {
        if ("employee-is-null".equals(filter)) {
            log.debug("REST request to get all AccessCards where employee is null");
            return accessCardService.findAllWhereEmployeeIsNull();
        }
        log.debug("REST request to get all AccessCards");
        return accessCardService.findAll();
    }

    /**
     * {@code GET  /access-cards/:id} : get the "id" accessCard.
     *
     * @param id the id of the accessCard to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the accessCard, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/access-cards/{id}")
    public ResponseEntity<AccessCard> getAccessCard(@PathVariable Long id) {
        log.debug("REST request to get AccessCard : {}", id);
        Optional<AccessCard> accessCard = accessCardService.findOne(id);
        return ResponseUtil.wrapOrNotFound(accessCard);
    }

    /**
     * {@code DELETE  /access-cards/:id} : delete the "id" accessCard.
     *
     * @param id the id of the accessCard to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/access-cards/{id}")
    public ResponseEntity<Void> deleteAccessCard(@PathVariable Long id) {
        log.debug("REST request to delete AccessCard : {}", id);
        accessCardService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
