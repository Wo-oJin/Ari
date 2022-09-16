package ari.paran.domain.repository;

import ari.paran.domain.Event;
import ari.paran.domain.store.Store;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Long> {
    Long countByStore(Store store);
}
