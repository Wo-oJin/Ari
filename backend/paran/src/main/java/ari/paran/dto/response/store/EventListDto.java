package ari.paran.dto.response.store;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@Getter
public class EventListDto {
    Long storeId;

    List<String> eventList = new ArrayList<>();
}
