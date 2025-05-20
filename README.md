MSA 환경에서의 이벤트 프로젝트입니다.
<br>
### 실행 방법

프로젝트 루트에서 명령어를 실행합니다.

`docker-compose up --build --force-recreate`
<br><br>

### <mark style='background-color: #f6f8fa'>1. 프로젝트 구성</mark>

#### - 개발환경

✅ Node.js 18 (고정)

✅ NesetJS 최신버전

#### - 프로젝트 구성
<img width="725" alt="image" src="https://github.com/user-attachments/assets/5fa4ff52-2278-4a4a-b250-64b2646ca91f" />
<br><br>

### <mark style='background-color: #f6f8fa'>2. 테스트 설명 & 초기 데이터</mark>

#### 📋 스웨거: http://localhost:3000/api-docs

- 스웨거에 각 API별 설명이 들어있습니다.

#### ⚙️ 초기 데이터 세팅

- 어드민 계정, 아이템, 칭호, 이벤트가 테스트를 위한 초기 데이터로 세팅됩니다. `init-dummy.ts`
- **기본 어드민 계정**
    - email: admin01 / password: admin01
<br><br>
### <mark style='background-color: #f6f8fa'>3. API 목록</mark>

- **요구 API** (필수 API)
    - 회원가입 API / 로그인 API / 어드민 사용자 생성 API (역할 관리)
    - 이벤트 생성 API / 이벤트 목록 조회 API / 이벤트 보상 추가 API / 사용자 보상 요청 API / 보상 요청 이력 확인 API (사용자) / 보상 요청 이력 확인 API (관리자)
- **추가 API** (이벤트를 위한 추가 API)
    - 캐시 충전 API / 아이템 구매 API / 아이템 생성 API / 출석 체크 API / 인벤토리 조회 API
- 테스트
    - 이벤트 보상 조건 테스트 작성 `event-condition.spec.ts`
<br><br>
### <mark style='background-color: #f6f8fa'>4. 이벤트 종류 설명</mark>
#### - 이벤트 조건
현재 이벤트는 ‘출석일’, ‘특정 아이템 구매’, ‘캐시 사용’의 조건을 등록할 수 있습니다.
- **출석일**(ATTENDANCE): n일 이상의 출석일 이벤트 조건
- **아이템 구매**(ITEM_PURCHASE): 특정 아이템 구매 이벤트 조건
- **캐시 사용**(USE_CASH): n원 이상의 캐시 사용 이벤트 조건

#### - 이벤트 보상

이벤트 보상으로 등록할 수 있는 보상은 다음과 같습니다.
- **아이템**(ITEM)
- **캐시**(CASH)
- **칭호**(TITLE)
<br>

### <mark style='background-color: #f6f8fa'>5. 고민 지점</mark>
<details>
<summary>사용자 캐시(돈) 관리 방안</summary>

  둘이 동작이 함께 일어나야함. repository단에서 묶어도 
  
</details>

<details>
<summary><b>Gateway → 타 서버 요청 시 2차 인증 필요성</b></summary>

Gateway Server에서 Auth/Event Server로 요청을 보낼 시 유저 인증 정보를 어떻게 넘겨줄지에 대하여 고민하였습니다.

1)사용자의 Access Token을 그대로 넘기는 방식

2)토큰의 Payload에서 필요한 정보만 추출하여 넘기는 방식

Auth/Event 서버에서 토큰을 따로 검증하지 않고 **헤더 정보만을 신뢰해도 되는지** 확신이 없었습니다. 하지만 포트를 개방하지 않으면서 **내부 네트워크에서만 접근이 되도록 구성**한다면 요청 헤더를 충분히 신뢰할 수 있는 구조가 된다고 생각하였습니다.

그래서 최종적으로 인증된 사용자의 정보를 헤더에 담아 요청하는 방식으로 구현하였고, HTTP 요청 시마다 헤더를 꺼내오는 공수를 줄이기 위하여 아래와 같은 구조를 만들었습니다.

```ts
export interface RequestHeader extends Record<string, string> {
  readonly user_id: string;
  readonly role: UserRole;
}
```
Gateway에서는 인증된 유저 정보를 context에 저장하고, 이 값을 `@CurrentUserHeader()` 데코레이터를 통해 `RequestHeader` 타입에 맞춰서 바로 헤더를 구성할 수 있도록 하였습니다.

헤더 정보를 받는 Event 서버에서는 아래와같은 데코레이터를 사용하여 헤더에서 유저 정보를 쉽게 꺼낼 수 있게 처리했습니다.

```ts
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): CurrentUser => {
    const request = ctx.switchToHttp().getRequest();
    const userId = request.headers['user_id'];
    const role = request.headers['role'];

    if (!userId || !role) {
      throw new UnauthorizedException('확인할 수 없는 사용자입니다.');
    }

    return { userId, role };
  },
);
```

</details>

<details>
<summary>mongoose populate 사용 vs 단일 조회</summary>

</details>

<details>
<summary>Role과 Guard 중복 사용</summary>

```tsx
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@Get('test')
getTest() {
return 'test';
    }
```

</details>
<br>

### <mark style='background-color: #f6f8fa'>6. 기타</mark>

👇 **Event ERD**

<img width="700" alt="image" src="https://github.com/user-attachments/assets/841f089d-f906-4f7e-a9ea-2ce371d83712" />
