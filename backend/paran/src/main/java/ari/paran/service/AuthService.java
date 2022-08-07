package ari.paran.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class AuthService {
    private Map<String, String> errors;

    // 유효성 검사 메서드
    @Transactional
    public Map<String, String> validHandling(BindingResult result){

        if(errors == null)
            errors = new HashMap<>();
        else
            errors.clear();

        for(FieldError error : result.getFieldErrors()){
            errors.put("valid_"+error.getField(), error.getDefaultMessage());
        }

        return errors;
    }
}
