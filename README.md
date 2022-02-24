# Login Test Frontend

## 채용 과제
다음 파일의 압축을 풀고, 주어진 요구사항을 만족하는 로그인 페이지를 제작하세요. 요구사항은 필수 요구사항과 추가 요구사항으로 구성되어 있으며, 필수 요구사항을 만족하지 못하면 추가 요구사항의 구현과 관계 없이 탈락 처리됨을 유념해 주세요. 

추가 요구사항은 최대한 많이 구현할수록 좋은 점수를 얻게 되지만, 시간이 촉박하다면 100% 해낼 필요는 없습니다.

## 파일 내용
파일에는 package.json이 담겨 있습니다. package.json 파일에는 이번 테스트에서 활용하기를 원하는 프론트엔드 패키지의 목록이 담겨 있습니다. 이 목록에서 패키지를 삭제하지도 추가하지도 마시고 테스트를 진행해주시면 되겠습니다. 패키지 목록에 변동이 있으면 탈락 처리됨을 알려드립니다.

## 결과 제출
테스트는 본 파일을 받은 날로부터 7일 안에 완료해주시면 됩니다. 결과물은 개별 github에 퍼블릭 리포지토리로 업로드하신 뒤 링크를 보내주시면 되겠습니다. 채용이 마무리된 후 해당 리포지토리를 삭제해주시기 바랍니다.

## API
로그인을 구현하기 위한 API 사양은 다음과 같습니다.

#### Endpoint
```
https://login-test.lazysociety.co.kr
```

#### 로그인: POST /auth/sign-in
```
요청 예시:
$ curl --location --request POST 'https://login-test.lazysociety.co.kr/auth/sign-in' \
--header 'Content-Type: application/json' \
--data-raw '{
    "id": "lazysociety",
    "password": "lazy1234!"
}'

응답 예시 (정상)
{
    "token_type": "Bearer",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDU0Mjc5MDl9.aTJaDDrPu2-6f293-4ZNRFz4aK8YrlDHWorhcv7XBCY",
    "expires_in": 300,
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDU0Mjk0MDl9.E1wsSiHU6npPhokThcuskMKxaNXNntka8keYnmC3jXc"
}
```

#### 리프레시 토큰: POST /auth/access-token
```
요청 예시:
$ curl --location --request POST 'https://login-test.lazysociety.co.kr/auth/access-token' \
--header 'Content-Type: application/json' \
--data-raw '{
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDU0Mjk0MDl9.E1wsSiHU6npPhokThcuskMKxaNXNntka8keYnmC3jXc"
}'

응답 예시 (정상)
{
    "token_type": "Bearer",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDU0Mjg4OTl9.2X49yCLdejiQDwxRAsDCzsNhiKlNKFLdXP0K69HyEqI",
    "expires_in": 300,
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDU0MzAzOTl9.7sHcaGidByP0lsyFyJS5O3JTwmY6__rStnxxHjlwcSw"
}
```

#### 유저 상세정보 GET /user
```
요청 예시:
$ curl --location --request GET 'https://login-test.lazysociety.co.kr/user' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDU0Mjg4OTl9.2X49yCLdejiQDwxRAsDCzsNhiKlNKFLdXP0K69HyEqI'

응답 예시 (정상)
{
    "address": "서울특별시 마포구 백범로31길 21, 505호",
    "email": "lazy_user@lazysociety.co.kr",
    "phone": "01012345678",
    "thumbnail": "https://lazysociety.co.kr/comma.png",
    "username": "lazy_user"
}
```

### API 참고사항

* 응답이 허용된 origin은 `http://localhost:3000`입니다. 다른 주소에서 요청했을 경우 Preflight 단계에서 거부됩니다.
* access_token은 5분의 수명을 지니며, refresh_token은 30분의 수명을 지닙니다.
* 유저 상세정보 API를 호출하면 응답 헤더에 `Access-Token-Expires-At` 헤더와 함께 현재 토큰이 언제 만료되는지를 나타내는 타임스탬프가 전달됩니다.

## 요구사항
### 필수 요구사항
* 로그인 페이지(Public)와 홈 페이지(Public), 유저의 정보를 조회하기 위한 마이페이지(Private) 제작
* 로그인 프로세스 구현
    * Input Validation
        * id, password는 반드시 입력되어야 하며, 빈칸인 채로 로그인을 시도하면 API에 요청이 들어가기 전에 프론트엔드에서 오류를 출력해야 함
        * 틀린 id, password를 입력해 로그인을 시도하면 API로부터 오류 응답을 받아 프론트엔드에서 적절히 출력해야 함
    * Error Handling
        * API에서 랜덤한 확률로 500 오류가 발생할 시 적절한 방식으로 오류를 출력해야 함
* 토큰 저장
    * 로그인이 성공했을 때 API로부터 반환되는 access_token 및 refresh_token을 적절한 위치에 저장할 것
    * 토큰이 만료되었을 때 혹은 만료되기 전 Refresh API를 호출해 새 access_token을 전달받아 적절한 위치에 저장할 것
    * 참고자료: [https://www.oauth.com/oauth2-servers/making-authenticated-requests/refreshing-an-access-token/](https://www.oauth.com/oauth2-servers/making-authenticated-requests/refreshing-an-access-token/)
* Private 페이지 구현
    * 로그인하지 않으면 들어갈 수 없는 마이페이지 구현
    * 마이페이지에서는 유저 상세정보 API를 통해 유저 상세정보를 출력할 것

### 추가 요구사항
* TypeScript 사용
* API 호출 시 발생하는 에러 핸들링
* 컴포넌트의 로직과 스타일을 분리하여 설계
* 코드 컨벤션을 유지할 방법 고민하기
* 불필요한 파일이 커밋되지 않도록 처리
* 동적 임포트가 필요하다고 판단되는 부분에서 동적 임포트 처리 및 fallback 구현
* 오류 출력 시 커스텀 modal 구현
* 좋은 UI/UX 구상하기 (디자이너가 개입된 수준의 예쁜 디자인을 원하는 게 아니라, CSS 관점에서 일관성을 유지하기 좋은 디자인 설계를 원합니다)
* 홈페이지 내에서 사용되는 color, grid, shadow, typography 등 다양한 전역 스타일 요소를 어떻게 재사용 가능하게 만들 것인지 CSS-In-JS 관점에서 설계
* 인증되지 않은 유저가 private 페이지에 진입하려 했을 때 접근이 거부되었음을 어떻게 나타낼 것인지, 어떤 행동을 해야 private 페이지에 진입할 수 있는지 효율적이고 친절하게 안내하기
* 로그인이 성공했을 시 그 유저가 최초로 진입하려 했던 페이지로 redirect 시키기
* 유저 상세 정보 데이터를 이해하기 편한 형태로 표기해보기
* 모바일, 태블릿 뷰에 따른 반응형 디자인 설계 (어느 사이즈를 모바일, 태블릿, 데스크탑으로 설정할지 본인만의 관점을 보여주었으면 좋겠습니다. 각 break point가 얼마냐를 결정하다보면 grid의 전체 너비, column 및 gutter의 올바를 너비가 어느정도일까를 고민하게 될 것입니다)
* Google Fonts를 이용해 폰트 및 아이콘을 내려받아 구현하되, 어떻게 하면 html 렌더링을 최대한 방해하지 않을 수 있는지 고민하기
* 아래 제시된 이미지를 이용해 favicon을 제작하되, 기기 및 운영체제에 맞는 아이콘을 제공할 수 있도록 다양한 사이즈를 지원하게 해 주고 manifest를 추가하기
* 하나의 기능을 추가할 때마다 git branch를 따로 제작하여 main branch에 merge할 것
* 다른 개발자가 읽었을 때 이해하기 쉽도록 커밋 메시지를 간결하고 정확하게 작성할 것

### favicon 이미지
![favicon](https://lazysociety.co.kr/comma.png)

## 질문이 있다면

질문은 hsseung@lazysociety.co.kr 로 보내주시기 바랍니다.





