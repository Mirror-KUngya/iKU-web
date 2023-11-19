# iKU
독거노인을 위한 스마트미러 (라즈베리파이, 미디어파이프 활용 )

## 🖥️ 프로젝트 소개
자세 추정 인공지능과 라즈베리파이를 활용한 치매 예방 및 건강 증진 스마트미러/웹/앱


## 🕰️ 프로젝트 기간
* 23.09.07 - 23.11.14

## 🧑‍🤝‍🧑 맴버구성 및 주요역할
| 이름   | 구분              | 주요 역할     |
|--------|------------------|----------|
| 이승현 | 팀장             | 전체 프로젝트 관리, 인공지능 |
| 김지은 | 팀원    | UI/UX 디자인, 인공지능  |
| 신채은 | 팀원           | 백엔드, 인공지능  |
| 최정윤 | 팀원  |  프론트엔드, 백엔드        |

## 🖥️ 설치 및 실행 방법

23년 11월 15일 기준, 해당 프로젝트는 카메라 기능이 라즈베리파이4.0B 환경에서 정상작동하며, 

윈도우 및 macOS 환경에서도 정상작동되도록 리팩토링 과정에 있습니다. 

카메라가 필요한 일일미션 (박수치기, 활짝 웃기, 옆구리 스트레칭) 외

끝말잇기, 음성인식, 날씨/날짜 정보, 애플리케이션은 정상 작동됩니다. 


### 테스트 계정
```
ID : aaa111
PW : 1111
```

### 앱 실행방법
- 아래 레포지토리 다운로드
https://github.com/Mirror-KUngya/iKu-app
``` 
cd client
npm install
npm start 
```

### 웹 백엔드 로컬 서버 실행방법
- 음성인식과 카메라를 사용하는 서버는 로컬에서 작동하며, 데이터베이스 api 호출용 서버는 배포가 된 상태입니다.
- 해당 레포지토리 다운로드
``` 
cd server
npm install
npm start 
```

### 웹 프론트엔드 
- 아래 링크 접속
- https://iku.netlify.app/


### 하드웨어 
- 24인치 모니터 + 이중필름 + 라즈베리파이 4B본체 + 라즈베리파이 카메라 + 마이크

## ⚙️ 개발 환경
- 웹 프론트엔드 ![React](https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=React&logoColor=white) 
![TypeScript](https://img.shields.io/badge/-TypeScript-007ACC?style=flat-square&logo=TypeScript&logoColor=white)

- 앱 프론트엔드 ![React Native](https://img.shields.io/badge/-React%20Native-61DAFB?style=flat-square&logo=React&logoColor=white)

- 백엔드 
![Node.js](https://img.shields.io/badge/-Node.js-339933?style=flat-square&logo=Node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/-Express.js-000000?style=flat-square&logo=Express&logoColor=white)


- 데이터베이스 ![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?style=flat-square&logo=MongoDB&logoColor=white)

- 인공지능 
![MediaPipe](https://img.shields.io/badge/-MediaPipe-FF6F00?style=flat-square&logo=Google&logoColor=white) 
![Python](https://img.shields.io/badge/-Python-3776AB?style=flat-square&logo=Python&logoColor=white)![OpenCV](https://img.shields.io/badge/-OpenCV-5C3EE8?style=flat-square&logo=OpenCV&logoColor=white)


- 하드웨어 ![Raspberry Pi](https://img.shields.io/badge/-Raspberry%20Pi-A22846?style=flat-square&logo=Raspberry-Pi&logoColor=white)

- 배포환경 ![Netlify](https://img.shields.io/badge/-Netlify-00C7B7?style=flat-square&logo=Netlify&logoColor=white)


## 📌 주요 기능
#### 일일미션
박수 3회 치기, 옆구리 스트레칭 양쪽 2회, 웃음짓기 5초, 끝말잇기 게임 3회 
#### 외출 체크리스트
사용자가 외출 하기 전 확인하고 갈 수 있도록 가스 불 끄기, 약 챙기기 등 어플리케이션을 통해 사용자화 가능
#### 보호자 알림 서비스
하루 이상 사용자(노인)이 일일미션을 하나라도 하지 않으면 보호자가 사용하는 애플리케이션에 푸시 알림
#### 정보 제공
디스플레이에 날짜, 시간, 날씨 등의 기본 정보 상시 출력
#### 조작 방법
터치, 마우스, 키보드 등의 조작이 어려운 노인들을 대상으로 하기 때문에 음성인식으로 조작


## 📁 관련 자료
- 웹 메인페이지 및 실제 구현 사진

  
<img height="500" alt="image" src="https://github.com/Mirror-KUngya/iKU-web/assets/33516975/b13e01c3-93d7-4cc9-9e53-eb3e83e82f0a">
<img height="500" src="https://github.com/Mirror-KUngya/iKU-web/assets/33516975/7edf07d0-96aa-4c90-b997-8ac2a2eff9ed"/>
<img height="500" src="https://github.com/Mirror-KUngya/iKU-web/assets/33516975/c7903298-cb35-4cb9-8d37-ad3ae8a4d797"/>


- 대회 포스터
  
<img src="https://github.com/Mirror-KUngya/iKU-web/assets/33516975/c3efed96-fd3e-42ee-8de1-035a8a38d5f4" width="500"/>


- 시연영상링크
  : https://youtu.be/fi_D4ZUQ8h8?si=crZi9viAKyG9lQSW

- 와이어프레임 링크
: https://www.figma.com/file/wSCoTdKG7Qy3zknYdyhyH3/Untitled?type=design&node-id=0%3A1&mode=design&t=jx8eOJmIj7aMLiYD-1
