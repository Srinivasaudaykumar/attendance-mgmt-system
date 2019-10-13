package com.learndesk.ams.service;

import com.learndesk.ams.domain.AccessCard;
import com.learndesk.ams.repository.AccessCardRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;


@Service
@Transactional
public class AccessCardService {

    private final Logger log = LoggerFactory.getLogger(AccessCardService.class);

    private final AccessCardRepository accessCardRepository;

    public AccessCardService(AccessCardRepository accessCardRepository) {
        this.accessCardRepository = accessCardRepository;
    }

    /**
     * Save a accessCard.
     *
     * @param accessCard the entity to save.
     * @return the persisted entity.
     */
    public AccessCard save(AccessCard accessCard) {
        log.debug("Request to save AccessCard : {}", accessCard);
        return accessCardRepository.save(accessCard);
    }

    /**
     * Get all the accessCards.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<AccessCard> findAll() {
        log.debug("Request to get all AccessCards");
        return accessCardRepository.findAll();
    }


    /**
     * Get all the accessCards where Employee is {@code null}.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<AccessCard> findAllWhereEmployeeIsNull() {
        log.debug("Request to get all accessCards where Employee is null");
        return StreamSupport
            .stream(accessCardRepository.findAll().spliterator(), false)
            .filter(accessCard -> accessCard.getUser() == null)
            .collect(Collectors.toList());
    }

    /**
     * Get one accessCard by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<AccessCard> findOne(Long id) {
        log.debug("Request to get AccessCard : {}", id);
        return accessCardRepository.findById(id);
    }

    /**
     * Delete the accessCard by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete AccessCard : {}", id);
        accessCardRepository.deleteById(id);
    }
}
