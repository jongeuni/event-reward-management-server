# event-reward-management-server
실행 방법 (Docker Compose)<br>
docker-compose build --no-cache
docker-compose up

version<br>
Node.js 18<br>
NestJS 최신<br>
<br><br>
과제 내용<br>
실무에서 자주 사용되는 패턴을 학습하고, 실제 서비스에 적용 가능한 이벤트 및 보상 관리 시스템을 직접 설계하고 구현합니다.<br>
<br><br>
요구사항<br>
유저 대상 이벤트가 많은데, 조건 확인 및 보상 지급이 수작업임.<br>
* 현재 조건 달성 여부를 엑셀로 수작업 중<br>
-> 조건 검증 로직과 보상 지급 자동화 필요<br>
운영자: 이벤트 생성 및 보상 설정 / 유저 요청 시 자동 지급 (or 검토)<br>
유저: 조건 만족 후 직접 요청<br>
감사 담당자: 지급 내역만 조회 가능<br>
* 인증과 권한 시스템 필요<br>

<br><br>

서버 구성<br>
gateway server : 모든 API 요청의 진입점, 인증, 권한 검사 및 라우팅<br>
- 모든 요청을 받아 라우팅 수행<br>
- JWT 토큰 검증 및 Role 검사<br>
- NestJS의 @nestjs/passport , AuthGuard , RolesGuard 사용<br>

auth server : 유저 정보 관리, 로그인, 역할 관리, JWT 발급<br>
- 유저 등록 / 로그인 / 역할 관리<br>
- JWT 관리<br>

event server : 이벤트 생성, 보상 정의, 보상 요청 처리, 지급 상태 저장<br>
- 이벤트 등록 / 조회 API<br>
- 보상 등록 / 조회 API (각 보상은 어떤 이벤트와 연결되는지 명확해야 함)<br>
- 보상 요청 API (요청 상태 로그 필요)<br>
- 보상 요청 내역 확인 (필터링 기능 선택적 구현)<br>

### 고민 지점
#### Event 서버의 인증<br>
Gateway에서 Event서버에 접근하지만 Event 서버의 인증을 풀어놓으면 불안정하다는 생각이 들었습니다.<br>
그러나 인증을 한 번 더 거치면, 중복 코드와 불필요한 의존성 문제가 생기게 된다고 생각하였습니다.<br>
보안 수준과 복잡도 간의 트레이드 오프 상황이라고 생각하였고,<br>
현재 수준에서는 Event 서버에서는 최소한의 체크만 하도록 구현하였습니다.<br>
Event 서버의 포트를 외부에 노출하지 않고 Gateway만 접근하도록 구성하여 Event가 내부 요청만 처리하도록 함으로써 외부 노출 위험을 방지하였습니다.<br>
결론적으로 Gateway에서만 JWT 검증하고, Event 서버는 Gateway만 신뢰하는 구조로 Event 내부에서 인증을 한 번 더 거치지는 않지만 내부 호출에 대한 제한을 설정해 보안성을 유지했습니다.<br>

### 추후 고도화 방향
1. 각 서버 간 중복 제거 (rq rs 모델이 gateway랑 중복됨)<br>
2. kafka를 통한 이벤트 통신 (더 복잡한 이벤트들이 들어왔을 경우)<br>
3. 