# 오늘의 옷 (TodayClothes)

<img width="125" height="125" alt="Image" src="https://github.com/user-attachments/assets/19913490-52d5-447e-9469-184f362f378d" />

> 날씨와 활동에 맞는 완벽한 옷차림을 추천해드립니다!

## 📋 프로젝트 정보

- **프로젝트명**: 오늘의 옷 (TodayClothes)
- **프로젝트 설명**: 사용자의 위치 기반 날씨 정보와 활동 유형을 분석하여 최적의 옷차림을 추천하는 웹 애플리케이션입니다.
- **개발 기간**: 2024.09 ~ 2024.11

## 🎯 프로젝트 소개

오늘의 옷(TodayClothes)은 실시간 날씨 정보를 기반으로 사용자에게 적절한 옷차림을 추천해주는 서비스입니다. 사용자의 위치, 활동 유형, 스타일 선호도 등을 고려하여 개인화된 옷 추천을 제공합니다.

### 주요 기능

- **날씨 기반 옷 추천**: 실시간 날씨 정보를 분석하여 최적의 옷차림 추천
- **활동 유형별 추천**: 실내/실외 활동, 캐주얼/포멀 스타일 등 다양한 옵션 제공
- **위치 기반 서비스**: 사용자 위치를 기반으로 한 정확한 날씨 정보 제공
- **히스토리 관리**: 과거 추천 내역 확인 및 관리
- **피드 기능**: 다른 사용자들의 옷차림 공유 및 확인
- **리뷰 시스템**: 추천 받은 옷차림에 대한 리뷰 작성
- **다국어 지원**: 한국어/영어 지원
- **반응형 디자인**: 모바일부터 데스크톱까지 모든 기기에서 최적화된 경험

## 🚀 시작 가이드

### 요구 사항

- **Node.js**: v18 이상
- **npm**: v8 이상 (또는 yarn, pnpm)

### 설치 및 실행

```bash
# 레포지토리 클론
git clone https://github.com/KNU-Develop/todayclothes-frontend.git

# 디렉토리 이동
cd frontend

# 패키지 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start
```
## 🛠 기술 스택

### Frontend

- **Framework**: ![Next.js](https://img.shields.io/badge/Next.js-14.2.7-000000?logo=next.js)
- **Language**: ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)
- **UI Library**: ![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
- **Styling**: ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.10-38B2AC?logo=tailwind-css)
- **State Management**: ![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.2.7-764ABC?logo=redux)
- **Data Fetching**: ![React Query](https://img.shields.io/badge/React_Query-5.55.0-FF4154?logo=react-query)
- **Form Management**: ![React Hook Form](https://img.shields.io/badge/React_Hook_Form-7.53.0-EC5990?logo=react-hook-form)
- **UI Components**: ![Material-UI](https://img.shields.io/badge/Material_UI-6.1.1-007FFF?logo=mui)
- **Maps**: ![Google Maps](https://img.shields.io/badge/Google_Maps-API-4285F4?logo=google-maps)

### 개발 도구

- **Testing**: ![Jest](https://img.shields.io/badge/Jest-29.7.0-C21325?logo=jest)
- **Mocking**: ![MSW](https://img.shields.io/badge/MSW-2.4.2-FF6B6B?logo=msw)

## 📱 화면 구성

|메인(여름) | 메인(가을)|
|--|--|
|<img width="400" height="600" alt="Image" src="https://github.com/user-attachments/assets/71582822-1905-463a-9c0f-dcd3751f45c1" />|<img width="400" height="600" alt="Image" src="https://github.com/user-attachments/assets/51dee622-98fb-4956-8f18-b49952304114" />|
| 추천 | 리뷰 |
|<img width="400" height="600" alt="Image" src="https://github.com/user-attachments/assets/b9405375-e78a-450b-b441-4c31332b46b7" />|<img width="400" height="1200" alt="Image" src="https://github.com/user-attachments/assets/c9c78565-7707-4aa7-a75e-2abfbfc60f74" />


## 🏗 아키텍처

<img width="960" height="595" alt="Image" src="https://github.com/user-attachments/assets/a63a54c9-df03-4a5f-b140-bb077dd4b9d1" />

## 📁 디렉토리 구조

```
frontend/
├── src/
│   ├── api/                  # API 관련 코드
│   ├── app/                  # Next.js App Router
│   │   ├── (after)/          # 인증 후 페이지
│   │   ├── (before)/         # 인증 전 페이지
│   │   ├── globals.css       # 전역 스타일
│   │   ├── layout.tsx        # 루트 레이아웃
│   │   └── page.tsx          # 메인 페이지
│   ├── components/           # 재사용 가능한 컴포넌트
│   ├── hooks/                # 커스텀 훅
│   ├── lib/                  # 유틸리티 함수
│   ├── providers/            # Context Provider
│   └── redux/                # Redux 상태 관리
├── public/                   # 정적 파일
├── Dockerfile                # Docker 설정
├── next.config.mjs           # Next.js 설정
├── tailwind.config.ts        # Tailwind CSS 설정
├── tsconfig.json             # TypeScript 설정
├── jest.config.ts            # Jest 설정
└── package.json              # 프로젝트 의존성
```

## 🔧 주요 기능 상세

### 1. 날씨 기반 옷 추천

- 사용자의 현재 위치를 기반으로 실시간 날씨 정보 수집
- 온도, 체감온도, 습도, 강수량, 풍속 등을 종합적으로 분석
- 시간대별 날씨 변화를 고려한 옷차림 추천

### 2. 활동 유형별 추천

- **활동 유형**: 실내/실외 활동 구분
- **스타일**: 캐주얼/포멀 스타일 선택
- **성별**: 남성/여성 옷차림 구분
- **시간대**: 오전/오후/저녁 시간대별 추천

### 3. 위치 기반 서비스

- 브라우저 Geolocation API를 활용한 위치 정보 수집
- Google Maps API를 통한 위치명 변환
- 위치 권한 거부 시 기본 위치(서울) 사용

### 4. 상태 관리

- **Redux Toolkit**: 전역 상태 관리 (로그인 정보, 현재 온도, 언어 설정)
- **React Query**: 서버 상태 관리 및 캐싱
- **Context API**: 날씨 데이터 공유

### 5. 다국어 지원

- 한국어/영어 지원
- Redux를 통한 언어 상태 관리
- 번역 API를 활용한 동적 번역

### 6. MSW를 활용한 API 모킹

- 개발 환경에서 API 모킹을 통한 프론트엔드 독립 개발
- 브라우저 및 서버 환경 모두 지원

### 7. 반응형 디자인

- Tailwind CSS를 활용한 모바일 우선 반응형 디자인
- 다양한 화면 크기에 최적화된 UI/UX
