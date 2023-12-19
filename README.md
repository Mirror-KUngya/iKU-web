# iKU
독거노인을 위한 스마트미러 (라즈베리파이, 미디어파이프 활용 )<br/>
건국대학교 2023년 SW 경진대회 장려상 수상작 🥉 


## 🖥️ 프로젝트 소개
자세 추정 인공지능과 라즈베리파이를 활용한 치매 예방 및 건강 증진 스마트미러/웹/앱


## 🕰️ 프로젝트 기간
* 23.09.07 - 23.11.14

## 🧑‍🤝‍🧑 맴버구성 및 주요역할
| 이름   | 구분              | 주요 역할     |
|--------|------------------|----------|
| 이승현 | 팀장             | 전체 프로젝트 관리, 인공지능, 하드웨어 |
| 김지은 | 팀원    | UI/UX 디자인, 인공지능  |
| 신채은 | 팀원           | 백엔드, 프론트엔드(앱), 인공지능  |
| 최정윤 | 팀원  |  프론트엔드(웹,앱), 백엔드        |

## 🖥️ 설치 및 실행 방법

23년 12월 20일 기준, 해당 프로젝트는 윈도우 및 Mac 환경에서 모든 기능이 정상작동되도록 코드를 수정한 상태이며,
라즈베리파이 환경에서는 작동하지 않습니다. 

만약, 라즈베리파이 환경에서 작동해야 할 경우
server/routes/detect.js 파일의 line 25-28 을 수정해야합니다.
```js
// 기존 코드

  let targetFile = "";
  if (mission === "smile") targetFile = "smile.py";
  else if (mission === "clap") targetFile = "clap.py";
  else if (mission === "side") targetFile = "side.py";

// 수정 후 코드

  let targetFile = "";
  if (mission === "smile") targetFile = "smile_pi.py";
  else if (mission === "clap") targetFile = "clap_pi.py";
  else if (mission === "side") targetFile = "side_pi.py";

```

### 테스트 계정
```
ID : aaa111
PW : 1111
```

### 앱 실행방법
- 앱 레포지토리 다운로드
<br/>https://github.com/Mirror-KUngya/iKu-app
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
<br/>https://iku.netlify.app/


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
![Python](https://img.shields.io/badge/-Python-3776AB?style=flat-square&logo=Python&logoColor=white)
![OpenCV](https://img.shields.io/badge/-OpenCV-5C3EE8?style=flat-square&logo=OpenCV&logoColor=white)


- 하드웨어 ![Raspberry Pi](https://img.shields.io/badge/-Raspberry%20Pi-A22846?style=flat-square&logo=Raspberry-Pi&logoColor=white)

- 배포환경 ![Netlify](https://img.shields.io/badge/-Netlify-00C7B7?style=flat-square&logo=Netlify&logoColor=white)
![CloudType](https://img.shields.io/badge/-CloudType-0A0A0A?style=for-the-badge&logo=data:image/png;base64,[BASE64_ENCODED_IMAGE])

- 협업
![GitHib](https://img.shields.io/badge/-GitHub-181717?style=flat-square&logo=GitHub&logoColor=white)
![Notion](https://img.shields.io/badge/-Notion-black?style=flat-square&logo=Notion&logoColor=white)
![Pigma](https://img.shields.io/badge/-Figma-F24E1E?style=flat-square&logo=Figma&logoColor=white)

## 📌 주요 기능
#### 일일미션
1. 박수 3회 치기
2. 옆구리 스트레칭 양쪽 2회
3. 웃음짓기 5초
4. 끝말잇기 게임 3회 
#### 외출 체크리스트
사용자가 외출 하기 전 확인하고 갈 수 있도록 가스 불 끄기, 약 챙기기 등 어플리케이션을 통해 사용자화 가능
#### 보호자 알림 서비스
하루 이상 사용자(노인)이 일일미션을 하나라도 하지 않으면 보호자가 사용하는 애플리케이션에 푸시 알림
#### 정보 제공
디스플레이에 날짜, 시간, 날씨 등의 기본 정보 상시 출력
#### 조작 방법
터치, 마우스, 키보드 등의 조작이 어려운 노인들을 대상으로 하기 때문에 음성인식으로 조작


## 📁 관련 자료 및 결과
- 웹 메인페이지 및 실제 구현 사진

  
<img height="400" alt="image" src="https://github.com/Mirror-KUngya/iKU-web/assets/33516975/b13e01c3-93d7-4cc9-9e53-eb3e83e82f0a">
<img height="400" src="https://github.com/Mirror-KUngya/iKU-web/assets/33516975/7edf07d0-96aa-4c90-b997-8ac2a2eff9ed"/>
<img height="400" src="https://github.com/Mirror-KUngya/iKU-web/assets/33516975/c7903298-cb35-4cb9-8d37-ad3ae8a4d797"/>
<img height="400" src="https://github.com/Mirror-KUngya/iKU-web/assets/33516975/33556edd-bda4-4b82-a737-4525d2c2660d"/>

- 대회 포스터 및 수상결과 
  
<img src="https://github.com/Mirror-KUngya/iKU-web/assets/33516975/c3efed96-fd3e-42ee-8de1-035a8a38d5f4" height="500"/>

<img height="500" src="https://github.com/Mirror-KUngya/iKU-web/assets/33516975/b75ad2b8-14ad-4a0b-9539-638f8467db96"/>


- 시연영상링크
  : https://youtu.be/fi_D4ZUQ8h8?si=crZi9viAKyG9lQSW

- 웹, 앱 피그마 링크
: https://www.figma.com/file/wSCoTdKG7Qy3zknYdyhyH3/Untitled?type=design&node-id=0%3A1&mode=design&t=jx8eOJmIj7aMLiYD-1
