# 성남사랑상품권 가맹점 검색기

## 개발 과정
1. 성남시청에서 가맹점 엑셀 파일 다운로드([링크](https://www.seongnam.go.kr/prgm/slove/sloveAgentList.do?menuIdx=1000329&returnURL=%2Fmain.do))
2. MongoDB Atlas로 DB 구축(Node.js 이용)
3. React(FE) 및 Node.js(BE) 코드 작성
    1. 키워드 검색(React)
    2. axios를 이용, ```/api/find-store```로 GET 요청 전송(React)
    3. Mongoose를 이용, 상호에 검색 키워드가 포함된 document 배열을 응답 객체에 담아 전송(Node.js)
    4. 결과 출력(React)
4. Heroku에 배포