package com.learndesk.ams.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.io.Serializable;
import java.time.Instant;

/**
 * A AttendenceEntry.
 */
@Entity
@Table(name = "attendance_entry")
public class AttendanceEntry implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "created_date")
    private Instant createdDate;

    @Column(name = "machine_id")
    private String machineId;

    @ManyToOne
    @JsonIgnoreProperties("attendenceEntries")
    private AccessCard accessCard;

    @ManyToOne
    @JsonIgnoreProperties("attendenceEntries")
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getCreatedDate() {
        return createdDate;
    }

    public AttendanceEntry createdDate(Instant createdDate) {
        this.createdDate = createdDate;
        return this;
    }

    public void setCreatedDate(Instant createdDate) {
        this.createdDate = createdDate;
    }

    public String getMachineId() {
        return machineId;
    }

    public AttendanceEntry machineId(String machineId) {
        this.machineId = machineId;
        return this;
    }

    public void setMachineId(String machineId) {
        this.machineId = machineId;
    }

    public AccessCard getAccessCard() {
        return accessCard;
    }

    public AttendanceEntry accessCard(AccessCard accessCard) {
        this.accessCard = accessCard;
        return this;
    }

    public void setAccessCard(AccessCard accessCard) {
        this.accessCard = accessCard;
    }


    public AttendanceEntry user(User user) {
        this.user = user;
        return this;
    }

    public User getUser() {
        return user;
    }

    public AttendanceEntry setUser(User user) {
        this.user = user;
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AttendanceEntry)) {
            return false;
        }
        return id != null && id.equals(((AttendanceEntry) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "AttendanceEntry{" +
            "id=" + getId() +
            ", createdDate='" + getCreatedDate() + "'" +
            ", machineId='" + getMachineId() + "'" +
            "}";
    }
}
