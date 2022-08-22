INSERT INTO MEMBER (MEMBER_ID, PASSWORD, EMAIL, AGE, NICKNAME, GENDER, AUTHORITY) VALUES (1, '$2a$08$lDnHPz7eUkSi6ao14Twuau08mzhWrL4kyZGGU5xfiGALO/Vxd5DOi', 'abc123@cdf.com', 20,'admin', 'M', 'ROLE_ADMIN');
INSERT INTO MEMBER (MEMBER_ID, PASSWORD, EMAIL, AGE, NICKNAME, GENDER, AUTHORITY) VALUES (2, '$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC', 'cdf456@efg.com', 30,'user', 'F', 'ROLE_USER');
INSERT INTO MEMBER (MEMBER_ID, PASSWORD, EMAIL, AGE, NICKNAME, GENDER, AUTHORITY) VALUES (3, '$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC', 'ghi789@efg.com', 30, null, 'F', 'ROLE_OWNER');
INSERT INTO MEMBER (MEMBER_ID, PASSWORD, EMAIL, AGE, NICKNAME, GENDER, AUTHORITY) VALUES (4, '$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC', 'jkl101@efg.com', 30, null, 'M', 'ROLE_OWNER');
INSERT INTO MEMBER (MEMBER_ID, PASSWORD, EMAIL, AGE, NICKNAME, GENDER, AUTHORITY) VALUES (5, '$2a$10$Pqli0r4TwDdi7Fd2RPL9SOKTvmTru121x6loQryHplGMuKg8wWnJu', 'dnwls813@ajou.ac.kr', 20, null, 'M', 'ROLE_USER');

INSERT INTO store (road_address, member_id, detail_address, open_time, sub_text, store_name, owner_name, phone, private_event, stamp)
    VALUES ("경기 수원시 팔달구 아주로 47번길 16", 3, "1층", "오전 9시 ~ 오후 9시", "미스터쉐프 한 줄 소개", "미스터쉐프", "우영우", "010-1234-5678", true, false);

INSERT INTO store (road_address, member_id, detail_address, open_time, sub_text, store_name, owner_name, phone, private_event, stamp)
    VALUES ("경기 수원시 팔달구 아주로 13번길 19 골든파크", 4, "1층", "오전 9시 ~ 오후 9시", "미스터쉐프 한 줄 소개", "아맛집", "동그라미", "010-5678-1234", false, true);

INSERT INTO store (road_address, member_id, detail_address, open_time, sub_text, store_name, owner_name, phone, private_event, stamp)
    VALUES ("경기 수원시 영통구 아주로 46", 3, "아록빌딩 1층", "오전 9시 ~ 오후 9시", "맥도날드 한 줄 소개", "맥도날드 아주대점", "정명석", "010-5678-1234", false, true);

INSERT INTO store (road_address, member_id, detail_address, open_time, sub_text, store_name, owner_name, phone, private_event, stamp)
    VALUES ("경기 수원시 영통구 아주로 18", 4, "1층", "오전 9시 ~ 오후 9시", "카리스마 한 줄 소개", "카리스마 아주대점", "한수연", "010-5678-1234", false, true);

INSERT INTO SIGNUP_CODE (ID, CODE) VALUES (1, '11111');
INSERT INTO SIGNUP_CODE (ID, CODE) VALUES (2, '22222');

INSERT INTO event (store_id, info, start_date, finish_date) VALUES (1, "미스터쉐프 할인 행사1", "2022-08-01","2022-09-01");
INSERT INTO event (store_id, info, start_date, finish_date) VALUES (1, "미스터쉐프 할인 행사2", "2022-09-01","2022-10-01");
INSERT INTO event (store_id, info, start_date, finish_date) VALUES (2, "아맛집 할인 행사1", "2022-08-01","2022-09-01");
INSERT INTO event (store_id, info, start_date, finish_date) VALUES (2, "아맛집 할인 행사2", "2022-09-01","2022-10-01");

INSERT INTO partnership (from_store_id, to_store_name, info, start_date, finish_date) VALUES (1, "아맛집", "아맛집에서 10000원 이상 구매 시 전 메뉴 500원 할인", "2022-08-01","2022-09-01");
INSERT INTO partnership (from_store_id, to_store_name, info, start_date, finish_date) VALUES (2, "미스터쉐프", "미스터쉐프에서 10000원 이상 구매 시 전 메뉴 500원 할인", "2022-08-01","2022-09-01");
INSERT INTO partnership (from_store_id, to_store_name, info, start_date, finish_date) VALUES (1, "아맛집", "아맛집에서 5000원 이상 구매 시 전 메뉴 100원 할인", "2022-09-01","2022-10-01");
INSERT INTO partnership (from_store_id, to_store_name, info, start_date, finish_date) VALUES (2, "미스터쉐프", "미스터쉐프에서 5000원 이상 구매 시 전 메뉴 100원 할인", "2022-09-01","2022-10-01");
INSERT INTO partnership (from_store_id, to_store_name, info, start_date, finish_date) VALUES (1, "맥도날드", "미스터쉐프에서 7000원 이상 구매 시 전 메뉴 500원 할인", "2022-08-01","2022-09-01");

INSERT INTO favorite (favorite_id, member_id, store_id) VALUES (1, 1, 2);
INSERT INTO favorite (favorite_id, member_id, store_id) VALUES (2, 2, 1);
INSERT INTO favorite (favorite_id, member_id, store_id) VALUES (3, 1, 2);
INSERT INTO favorite (favorite_id, member_id, store_id) VALUES (4, 2, 1);
INSERT INTO favorite (favorite_id, member_id, store_id) VALUES (5, 5, 1);
INSERT INTO favorite (favorite_id, member_id, store_id) VALUES (6, 5, 2);