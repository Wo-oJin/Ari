INSERT INTO member (member_id, password, email, from_oauth, age, nickname, gender, authority) VALUES (1, '$2a$10$Pqli0r4TwDdi7Fd2RPL9SOKTvmTru121x6loQryHplGMuKg8wWnJu', 'dnwls813@ajou.ac.kr', 0, 20, '우진', 'male', 'ROLE_OWNER');
INSERT INTO member (member_id, password, email, from_oauth, age, nickname, gender, authority) VALUES (2, '$2a$10$AzLul68qfPEi8KhC96AW8ucB8oMP.a5iSl21DGuWC6FNt5YpWeoli', 'cdf456@efg.com', 0, 30,'user', 'female', 'ROLE_USER');
INSERT INTO member (member_id, password, email, from_oauth, age, nickname, gender, authority) VALUES (3, '$2a$10$AzLul68qfPEi8KhC96AW8ucB8oMP.a5iSl21DGuWC6FNt5YpWeoli', 'ghi789@efg.com', 0, 30, '닉네임3', 'female', 'ROLE_OWNER');
INSERT INTO member (member_id, password, email, from_oauth, age, nickname, gender, authority) VALUES (4, '$2a$10$AzLul68qfPEi8KhC96AW8ucB8oMP.a5iSl21DGuWC6FNt5YpWeoli', 'jkl101@efg.com', 0, 30, '닉네임4', 'male', 'ROLE_OWNER');

INSERT INTO store (road_address, member_id, detail_address, open_time, sub_text, store_name, owner_name, phone, private_event)
    VALUES ("경기 수원시 팔달구 아주로 47번길 16", 1, "1층", "오전 9시 ~ 오후 9시", "미스터쉐프 한 줄 소개", "미스터쉐프", "우영우", "010-1234-5678", 1);

INSERT INTO store (road_address, member_id, detail_address, open_time, sub_text, store_name, owner_name, phone, private_event)
    VALUES ("경기 수원시 팔달구 아주로 13번길 19 골든파크", 2, "1층", "오전 9시 ~ 오후 9시", "아맛집 한 줄 소개", "아맛집", "동그라미", "010-5678-1234", 0);

INSERT INTO store (road_address, member_id, detail_address, open_time, sub_text, store_name, owner_name, phone, private_event)
    VALUES ("경기 수원시 영통구 아주로 46", 3, "아록빌딩 1층", "오전 9시 ~ 오후 9시", "맥도날드 한 줄 소개", "맥도날드 아주대점", "정명석", "010-5678-1234", 1);

INSERT INTO store (road_address, member_id, detail_address, open_time, sub_text, store_name, owner_name, phone, private_event)
    VALUES ("경기 수원시 영통구 아주로 18", 4, "1층", "오전 9시 ~ 오후 9시", "카리스마 한 줄 소개", "카리스마 아주대점", "한수연", "010-5678-1234", 0);

INSERT INTO signup_code (id, code) VALUES (1, '11111');
INSERT INTO signup_code (id, code) VALUES (2, '22222');
INSERT INTO signup_code (id, code) VALUES (3, '33333');
INSERT INTO signup_code (id, code) VALUES (4, '44444');

INSERT INTO event (store_id, info, start_date, finish_date) VALUES (1, "미스터쉐프 할인 행사1", "2022-08-01","2022-09-01");
INSERT INTO event (store_id, info, start_date, finish_date) VALUES (1, "미스터쉐프 할인 행사2", "2022-09-01","2022-10-01");
INSERT INTO event (store_id, info, start_date, finish_date) VALUES (2, "아맛집 할인 행사1", "2022-08-01","2022-09-01");
INSERT INTO event (store_id, info, start_date, finish_date) VALUES (2, "아맛집 할인 행사2", "2022-09-01","2022-10-01");
INSERT INTO event (store_id, info, start_date, finish_date) VALUES (3, "맥도날드 할인 행사1", "2022-08-01","2022-09-01");
INSERT INTO event (store_id, info, start_date, finish_date) VALUES (3, "맥도날드 할인 행사2", "2022-09-01","2022-10-01");
INSERT INTO event (store_id, info, start_date, finish_date) VALUES (4, "카리스마 할인 행사1", "2022-08-01","2022-09-01");
INSERT INTO event (store_id, info, start_date, finish_date) VALUES (4, "카리스마 할인 행사2", "2022-09-01","2022-10-01");

INSERT INTO board(article_id, author, is_completed, title, content, writer_id, partnership_period, create_date, update_date) VALUES(1, "미스터쉐프", 0, "제목1", "내용1", 1, "3달", now(), now());
INSERT INTO board(article_id, author, is_completed, title, content, writer_id, partnership_period, create_date, update_date) VALUES(2, "아맛집", 0, "제목2", "내용2", 2, "3달", now(), now());
INSERT INTO board(article_id, author, is_completed, title, content, writer_id, partnership_period, create_date, update_date) VALUES(3, "맥도날드 아주대점", 0, "제목3", "내용3", 3, "3달", now(), now());
INSERT INTO board(article_id, author, is_completed, title, content, writer_id, partnership_period, create_date, update_date) VALUES(4, "카리스마 아주대점", 0, "제목4", "내용4", 4, "3달", now(), now());
INSERT INTO board(article_id, author, is_completed, title, content, writer_id, partnership_period, create_date, update_date) VALUES(5, "미스터쉐프", 0, "제목5","내용5", 1, "3달", now(), now());
INSERT INTO board(article_id, author, is_completed, title, content, writer_id, partnership_period, create_date, update_date) VALUES(6, "아맛집", 0, "제목6","내용6", 2, "3달", now(), now());
INSERT INTO board(article_id, author, is_completed, title, content, writer_id, partnership_period, create_date, update_date) VALUES(7, "맥도날드 아주대점", 0, "제목7", "내용7", 3, "3달", now(), now());
INSERT INTO board(article_id, author, is_completed, title, content, writer_id, partnership_period, create_date, update_date) VALUES(8, "카리스마 아주대점", 0, "제목8", "내용8", 4, "3달", now(), now());
INSERT INTO board(article_id, author, is_completed, title, content, writer_id, partnership_period, create_date, update_date) VALUES(9, "미스터쉐프", 0, "제목9", "내용9", 1, "3달", now(), now());
INSERT INTO board(article_id, author, is_completed, title, content, writer_id, partnership_period, create_date, update_date) VALUES(10, "아맛집", 0, "제목10", "내용10", 2, "2달", now(), now());
INSERT INTO board(article_id, author, is_completed, title, content, writer_id, partnership_period, create_date, update_date) VALUES(11, "맥도날드 아주대점", 0, "제목11", "내용11", 3, "2달", now(), now());
INSERT INTO board(article_id, author, is_completed, title, content, writer_id, partnership_period, create_date, update_date) VALUES(12, "카리스마 아주대점", 0, "제목12", "내용12", 4, "2달", now(), now());
INSERT INTO board(article_id, author, is_completed, title, content, writer_id, partnership_period, create_date, update_date) VALUES(13, "미스터쉐프", 0, "제목13", "내용13", 1, "2달", now(), now());
INSERT INTO board(article_id, author, is_completed, title, content, writer_id, partnership_period, create_date, update_date) VALUES(14, "아맛집", 0, "제목14", "내용14", 2, "2달", now(), now());
INSERT INTO board(article_id, author, is_completed, title, content, writer_id, partnership_period, create_date, update_date) VALUES(15, "맥도날드 아주대점", 0, "제목15", "내용15", 3, "2달", now(), now());

INSERT INTO chat_message (content, create_date, create_time, sender, type) VALUES ("안녕하세요~", "2022-10-15", "2022-10-15 18:15:41", "여인수", 0);
INSERT INTO chat_message (content, create_date, create_time, sender, type) VALUES ("안녕하세요!", "2022-10-15", "2022-10-15 17:15:41", "정세창", 0);
INSERT INTO chat_message (content, create_date, create_time, sender, type) VALUES ("안녕하세요~", "2022-10-16", "2022-10-16 08:30:32", "봉지수", 0);
INSERT INTO chat_message (content, create_date, create_time, sender, type) VALUES ("안녕하세요!", "2022-10-16", "2022-10-16 13:53:45", "김우진", 0);
INSERT INTO chat_message (content, create_date, create_time, sender, type) VALUES ("안녕하세요~", "2022-10-17", "2022-10-17 16:41:32", "김지수", 0);
INSERT INTO chat_message (content, create_date, create_time, sender, type) VALUES ("안녕하세요!", "2022-10-17", "2022-10-17 21:53:45", "홍서희", 0);

INSERT INTO favorite_store (favorite_id, member_id, store_id) VALUES (1, 1, 2);
INSERT INTO favorite_store (favorite_id, member_id, store_id) VALUES (2, 2, 1);

INSERT INTO favorite_article (favorite_id, member_id, article_id) VALUES (1, 1, 2);
INSERT INTO favorite_article (favorite_id, member_id, article_id) VALUES (2, 2, 1);

INSERT INTO partnership (store_name, counterpart_id, finish_date, info, is_finish, is_from, is_read,
                         partner_id, partner_name, partnership_state, start_date, article_id, store_id)
VALUES ("미스터쉐프", 2, "2022-10-05", "협약 정보1", 0, 1, 0, 2, "아맛집", "APPROVED", "2022-10-02", 14, 1);

INSERT INTO partnership (store_name, counterpart_id, finish_date, info, is_finish, is_from, is_read,
                         partner_id, partner_name, partnership_state, start_date, article_id, store_id)
VALUES ("아맛집", 1, "2022-10-05", "협약 정보1", 0, 0, 0, 1, "미스터쉐프", "APPROVED", "2022-10-02", 14, 2);

INSERT INTO partnership (store_name, counterpart_id, finish_date, info, is_finish, is_from, is_read,
                         partner_id, partner_name, partnership_state, start_date, article_id, store_id)
VALUES ("맥도날드 아주대점", 4, "2022-10-15", "협약 정보2", 0, 1, 0, 4, "카리스마 아주대점", "APPROVED", "2022-10-12", 15, 3);

INSERT INTO partnership (store_name, counterpart_id, finish_date, info, is_finish, is_from, is_read,
                         partner_id, partner_name, partnership_state, start_date, article_id, store_id)
VALUES ("카리스마 아주대점", 3, "2022-10-15", "협약 정보2", 0, 0, 0, 3, "맥도날드 아주대점", "APPROVED", "2022-10-12", 15, 4);
