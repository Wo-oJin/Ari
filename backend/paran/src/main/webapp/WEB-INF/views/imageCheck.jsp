<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>사진 확인</title>
</head>
<body>
<div>
    <img src="data:image/jpg;base64, ${storeImg[0]}">
    <img src="data:image/jpg;base64, ${storeImg[1]}">
    <img src="data:image/jpg;base64, ${storeImg[2]}">
</div>
</body>
</html>