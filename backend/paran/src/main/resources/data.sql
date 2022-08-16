INSERT INTO MEMBER (MEMBER_ID, USERNAME, PASSWORD, EMAIL, AGE, NICKNAME, GENDER, AUTHORITY) VALUES (1, 'admin', '$2a$08$lDnHPz7eUkSi6ao14Twuau08mzhWrL4kyZGGU5xfiGALO/Vxd5DOi', 'abc123@cdf.com', 20,'admin', 'M', 'ROLE_ADMIN');
INSERT INTO MEMBER (MEMBER_ID, USERNAME, PASSWORD, EMAIL, AGE, NICKNAME, GENDER, AUTHORITY) VALUES (2, 'user', '$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC', 'cdf456@efg.com', 30 ,'user', 'M', 'ROLE_USER');

INSERT INTO store (road_address, detail_address, store_name, owner_name, phone, private_event, stamp)
    VALUES ("경기 수원시 팔달구 아주로 47번길 16", "1층", "미스터쉐프", "우영우", "010-1234-5678", true, false);

INSERT INTO store (road_address, detail_address, store_name, owner_name, phone, private_event, stamp)
    VALUES ("경기 수원시 팔달구 아주로 13번길 19 골든파크", "1층", "아맛집", "동그라미", "010-5678-1234", false, true);

INSERT INTO event (finish_date, start_date, store_name) VALUES ("2022-09-01","2022-08-01", "미스터쉐프");
INSERT INTO event (finish_date, start_date, store_name) VALUES ("2022-10-01","2022-09-01", "아맛집");

INSERT INTO event_info (event_id, info) VALUES (1, "미스터쉐프 할인 행사1");
INSERT INTO event_info (event_id, info) VALUES (1, "미스터쉐프 할인 행사2");
INSERT INTO event_info (event_id, info) VALUES (2, "아맛집 할인 행사1");
INSERT INTO event_info (event_id, info) VALUES (2, "아맛집 할인 행사2");

INSERT INTO partnership (to_store_name, store_id, from_store_name) VALUES ("아맛집", 1, "미스터쉐프");
INSERT INTO partnership (to_store_name, store_id, from_store_name) VALUES ("미스터쉐프", 2, "아맛집");

INSERT INTO partnership_info (partnership_id, info) VALUES (1, "아맛집에서 10000원 이상 구매 시 전 메뉴 500원 할인");
INSERT INTO partnership_info (partnership_id, info) VALUES (1, "아맛집에서 5000원 이상 구매 시 전 메뉴 100원 할인");
INSERT INTO partnership_info (partnership_id, info) VALUES (2, "미스터쉐프에서 10000원 이상 구매 시 전 메뉴 500원 할인");
INSERT INTO partnership_info (partnership_id, info) VALUES (2, "미스터쉐프에서 5000원 이상 구매 시 전 메뉴 100원 할인");