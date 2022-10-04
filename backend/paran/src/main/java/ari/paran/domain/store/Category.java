package ari.paran.domain.store;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;

@AllArgsConstructor
@Getter
public enum Category {

    KOREAN("01", "한식"),
    WESTERN("02", "양식"),
    JAPANESE("03", "일식"),
    CHINESE("04", "중식"),
    FASTFOOD("05", "패스트푸드"),
    CAFE("06", "카페"),
    HAIRSHOP("07", "헤어"),
    BAR("08", "술집"),
    PLAY("09", "놀이시설"),
    STUDYCAFE("10", "스터디카페"),
    ALL("11", "전체");

    private final String code;
    private final String name;

    @JsonCreator
    public static Category fromString(String inputName){

        return Arrays.stream(Category.values())
                .filter(c -> c.getName().equals(inputName))
                .findAny()
                .orElseThrow(() -> new IllegalArgumentException(String.format("가게 카테고리에 %s가 존재하지 않습니다.", inputName)));

    }
}
