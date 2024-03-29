package com.learndesk.ams.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A AccessCard.
 */
@Entity
@Table(name = "access_card")
public class AccessCard implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "card_number")
    private String cardNumber;

    @OneToMany(mappedBy = "accessCard")
    private Set<AttendanceEntry> attendanceEntries = new HashSet<>();

    @OneToOne(mappedBy = "accessCard")
    @JsonIgnore
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public AccessCard cardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
        return this;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public Set<AttendanceEntry> getAttendanceEntries() {
        return attendanceEntries;
    }

    public AccessCard attendanceEntries(Set<AttendanceEntry> attendanceEntries) {
        this.attendanceEntries = attendanceEntries;
        return this;
    }

    public AccessCard addAttendanceEntry(AttendanceEntry attendanceEntry) {
        this.attendanceEntries.add(attendanceEntry);
        attendanceEntry.setAccessCard(this);
        return this;
    }

    public AccessCard removeAttendanceEntry(AttendanceEntry attendanceEntry) {
        this.attendanceEntries.remove(attendanceEntry);
        attendanceEntry.setAccessCard(null);
        return this;
    }

    public void setAttendanceEntries(Set<AttendanceEntry> attendanceEntries) {
        this.attendanceEntries = attendanceEntries;
    }

    public AccessCard user(User user) {
        this.user = user;
        return this;
    }

    public User getUser() {
        return user;
    }

    public AccessCard setUser(User user) {
        this.user = user;
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AccessCard)) {
            return false;
        }
        return id != null && id.equals(((AccessCard) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "AccessCard{" +
            "id=" + getId() +
            ", cardNumber='" + getCardNumber() + "'" +
            "}";
    }
}
