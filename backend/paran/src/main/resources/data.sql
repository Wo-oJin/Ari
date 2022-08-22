INSERT INTO member (MEMBER_ID, PASSWORD, EMAIL, AGE, NICKNAME, GENDER, AUTHORITY) VALUES (1, '$2a$08$lDnHPz7eUkSi6ao14Twuau08mzhWrL4kyZGGU5xfiGALO/Vxd5DOi', 'abc123@cdf.com', 20,'admin', 'male', 'ROLE_ADMIN');
INSERT INTO member (MEMBER_ID, PASSWORD, EMAIL, AGE, NICKNAME, GENDER, AUTHORITY) VALUES (2, '$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC', 'cdf456@efg.com', 30,'user', 'female', 'ROLE_USER');
INSERT INTO member (MEMBER_ID, PASSWORD, EMAIL, AGE, NICKNAME, GENDER, AUTHORITY) VALUES (3, '$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC', 'ghi789@efg.com', 30, null, 'female', 'ROLE_OWNER');
INSERT INTO member (MEMBER_ID, PASSWORD, EMAIL, AGE, NICKNAME, GENDER, AUTHORITY) VALUES (4, '$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC', 'jkl101@efg.com', 30, null, 'male', 'ROLE_OWNER');

INSERT INTO store (road_address, member_id, detail_address, open_time, sub_text, store_name, owner_name, phone, private_event, stamp)
    VALUES ("경기 수원시 팔달구 아주로 47번길 16", 3, "1층", "오전 9시 ~ 오후 9시", "미스터쉐프 한 줄 소개", "미스터쉐프", "우영우", "010-1234-5678", true, false);

INSERT INTO store (road_address, member_id, detail_address, open_time, sub_text, store_name, owner_name, phone, private_event, stamp)
    VALUES ("경기 수원시 팔달구 아주로 13번길 19 골든파크", 4, "1층", "오전 9시 ~ 오후 9시", "미스터쉐프 한 줄 소개", "아맛집", "동그라미", "010-5678-1234", false, true);

INSERT INTO signup_code (ID, CODE) VALUES (1, '11111');
INSERT INTO signup_code (ID, CODE) VALUES (2, '22222');


INSERT INTO event (store_id, info, start_date, finish_date) VALUES (1, "미스터쉐프 할인 행사1", "2022-08-01","2022-09-01");
INSERT INTO event (store_id, info, start_date, finish_date) VALUES (1, "미스터쉐프 할인 행사2", "2022-09-01","2022-10-01");
INSERT INTO event (store_id, info, start_date, finish_date) VALUES (2, "아맛집 할인 행사1", "2022-08-01","2022-09-01");
INSERT INTO event (store_id, info, start_date, finish_date) VALUES (2, "아맛집 할인 행사2", "2022-09-01","2022-10-01");

INSERT INTO partnership (from_store_id, to_store_name, info, start_date, finish_date) VALUES (1, "아맛집", "아맛집에서 10000원 이상 구매 시 전 메뉴 500원 할인", "2022-08-01","2022-09-01");
INSERT INTO partnership (from_store_id, to_store_name, info, start_date, finish_date) VALUES (2, "미스터쉐프", "미스터쉐프에서 10000원 이상 구매 시 전 메뉴 500원 할인", "2022-08-01","2022-09-01");
INSERT INTO partnership (from_store_id, to_store_name, info, start_date, finish_date) VALUES (1, "아맛집", "아맛집에서 5000원 이상 구매 시 전 메뉴 100원 할인", "2022-09-01","2022-10-01");
INSERT INTO partnership (from_store_id, to_store_name, info, start_date, finish_date) VALUES (2, "미스터쉐프", "미스터쉐프에서 5000원 이상 구매 시 전 메뉴 100원 할인", "2022-09-01","2022-10-01");
INSERT INTO partnership (from_store_id, to_store_name, info, start_date, finish_date) VALUES (1, "맥도날드", "미스터쉐프에서 7000원 이상 구매 시 전 메뉴 500원 할인", "2022-08-01","2022-09-01");
