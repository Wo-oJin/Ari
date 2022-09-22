package ari.paran.dto.response.chat;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Result<T>{
    private T data;
}
