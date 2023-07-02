## 2022 11/17

- 개발환경 세팅
- v0.0.0:1
- 키보드 이벤트 적용
- v0.0.0:2
- Phaser.ts background 적용 완.
- v0.0.0:3
- 캐릭터 + 중력은 구현했음. 키 컨트롤 제작 중.
- v0.0.0:4
- FEAT : idle상태 모션 성공
- v0.0.0:5
- CHAR : 추가된 이미지들
- v0.0.0:6
- FEAT : Jump 만들었음!
- v0.0.0:7
- CHAR : prettier 옵션 변경, jump, idle image 변경
- v0.0.0:8
- FEAT : walk 제작
- v0.0.0:9
- FEAT : player 하나로 합침
- v0.0.0:10
- FEAT : 동시 동작 제작중..
- v0.0.0:11
- FEAT : 동시 모션 완
- v0.0.0:12
- CHAR : 쓸모없는 이미지 제거
- v0.0.0:13
- FEAT : JSON import용 ts.config 업데이트
- FEAT : 카메라가 플레이어를 따라다니도록 조정
- v0.0.0:14
- ERROR : 보이는 오류는 전부 제거함. 문제는 tailset이미지가 사이즈가 크다고함
- v0.0.0:15

## 12/5

- FEAT : tiled로 만든 json 드디어 적용 완료.
- v0.0.0:16

## 12/12

- CHAR : 변경사항 저장
- v0.0.0:17

## 12/15

- CHAR : 폴더 구조 변경
- v0.0.0:18
- FEAT : 로딩 적용
- v0.0.0:19
- CHAR : player 코드 정리
- FEAT : zoom에 따라 배경 위치 자동 변경
- v0.0.0:20
- FEAT : 충돌감지 적용
- v0.0.0:21
- FEAT : 이동 중 점프가능, 임시방편으로 제작
- v0.0.0:22
- FEAT : left, right, jump, idle 키이벤트 버그 제거
- v0.0.0:23
- FEAT : walk -> left,right 모션 나눔
- v0.0.0:24
- FEAT: 달리기 적용
- v0.0.0:25

## 2023 1/15

- FEAT : 배경, 컴퓨터 이미지 적용
- v0.0.0:26

## 2023 1/16

- FEAT : permission && getUserMedia 적용.
- v0.0.0:27

## 2023 1/17

- FEAT : 반응형 임시 적용.
- v0.0.0:28
- FEAT : Loading 제작
- v0.0.0:29

## 2023 1/18

- FEAT: 로딩 만들었지만 캐릭터와 같이 떨어짐. 조정해야함.
- v0.0.0:30
- FEAT : 로딩 작동 완료.
- v0.0.0:31
- FEAT : 화면 조정 중
- v0.0.0:32
- FEAT : pc화면 80% 조정한듯.
- v0.0.0:33
- FEAT : camera조정은 하였지만 벽을 인지못함.
- v0.0.0:34
- FEAT : world, cam 위치조정.
- v0.0.0:35
- FEAT : loading 위치 조정
- v0.0.0:36

## 2023 1/21

- FEAT : Characters.ts class 제작 중. - 여러 캐릭터들을 양산하기위한 과정
- v0.0.0:37
- FEAT : animation 추상화 성공.
- v0.0.0:38
- FEAT : 모든 animation 적용 완료
- v0.0.0:39
- FEAT : idle,walk에 left,right 모션 적용
- v0.0.0:40
- FEAT : 테스트 적용
- v0.0.0:41
- FEAT : 추상화 클래스로 새로운 캐릭터 추가.
- v0.0.0:42

## 2023 1/23

- FEAT : 배경 변경
- v0.0.0:43
- FEAT : 마우스 커서 고양이로 변경
- v0.0.0:44
- FEAT : webRTC type 적용 중.
- v0.0.0:45

## 2023 1/28

- offer 생성
- v0.0.0:46
- signalServer golang으로 시작
- v0.0.0:47
- main.go에서 answer를 보내도록 개선
- v0.0.0:48
- offer, answer 전달
  - 보완할 점 : signalServer에서 접속하는 유저들에게 저장해놓은 offer를 매번 쏴주자.
- v0.0.0:49

## 2023 1/29

- golang signal server pub/sub 분해중
- v0.0.0:50
- candidate도 교환
  - 보완할 점 : pub/sub 구조가 아닌 chat서버 구조로 변경해야 할듯.
- v0.0.0:51

## 2023 2/3

- 접속 버튼 제작
- v0.0.0:52
- 게임 관련 파일 추가
- v0.0.0:53

## 2023 2/5

- mac os 9 부팅화면 구현
- v0.0.0:54

## 2023 2/7

- 로딩화면 구현
- v0.0.0:55
- 로딩화면 완성
- v0.0.0:56
- menuBar 제작
- v0.0.0:57
- 반응형 제대로 적용 완료
- 배경 맥배경으로 변경
- v0.0.0:58
- tail 1920x1280으로 변경
- v0.0.0:59
- webRTC 개선, chat 서버 예제 찾음.
- v0.0.0:60

## 2023 2/8

- golang 무조건 전부에게 받은 메세지를 던지도록 구현
- v0.0.0:61
- webRTC ontrack까지 받음. 비디오 안나오는 이유 찾아야함.
- v0.0.0:62
- 유저 접속 시 offer를 던지도록 구현
- v0.0.0:63
- webRTC 완성
- v0.0.0:64
- go 주소 수정
- v0.0.0:65

## 2023 2/10

- 쓰레기통 만듬. 파일을 추상화하기.
- v0.0.0:66

## 2023 2/11

- 시스템 아이콘 추상화완료, 외부 클릭 시 클릭 사라지도록 구현.
- phaser3-rex-plugins/plugins/clickoutside.js
- v0.0.0:67

## 2023 2/12

- phaser3에서 드롭다운 메뉴 구현
- v0.0.0:68
- 모달 구현, 파인더 구현 방법 도출
- v0.0.0:69

## 2023 2/19

- icon 생성 메소드 개선
- v0.0.0:70
- finder 생성 클래스 제작
- v0.0.0:71
- icon 더블 클릭 시 finder 나옴.
- v0.0.0:72
- finder exit 버튼 제작
- v0.0.0:73

## 2023 2/21

- tileObject 분리
- v0.0.0:74
- characters 분리
- v0.0.0:75
- webRTC finder 꾸미는 중, 파인더를 오픈할 경우 캐릭터위치 변경(제작 중)
- v0.0.0:76

## 2023 2/22

- finder열리면 캐릭터 파인더 안으로 이동
- v0.0.0:77
- finder 타일셋크기에 맞게 위치 조정
- v0.0.0:78

## 2023 4/28

- phaserJS 이동을 위해 주석처리.
- v0.0.0:79
- body 제작
- v0.0.0:80
- file 제작
- v0.0.0:81

## 2023 4/29

- cursor mac용으로 변경
- v0.0.0:82

## 2023 5/1

- Finder.Mac resizable finder 외형 제작
- v0.0.0:83
- Finder.Mac header 개선
- v0.0.0:84
- Finder.Mac shadow 적용하여 디테일 개선
- v0.0.0:85

## 2023 5/2

- file 더블 클릭 시 finder 구현
- v0.0.0:86
- finder를 객체로 관리하여 검색이 쉽도록 구현. 클릭 시 가장 위로 보이도록 개선
- v0.0.0:87
- finderClose 구현
- v0.0.0:88
- Icon Component로 통합
- v0.0.0:89
- menubar 제작
- v0.0.0:90

## 2023 5/3

- game finder에 game 적용.
- v0.0.0:91

## 2023 5/4

- webRTC 붙이는 중.
- v0.0.0:92

## 2023 5/5

- ws 포트 수정 9100 => 3000
- go 실행안되는 문제 해결
- v0.0.0:93

## 2023 5/12

- go hub broadcast 완료!
-     c.hub.broadcast <- []byte(string(offerString))
- v0.0.0:94

## 2023 5/15

- log 띄움
- v0.0.0:95
- client를 이용해서 candidate를 지정한 유저에게 줘야함.
- v0.0.0:96

## 2023 5/17

- 브로드 캐스트 시 id를 검사하여 나말고 다른 유저에게만 메세지를 전달.
- clientID를 서버에서 작성
- v0.0.0:97

### 2023 5/18

- addIceCandidate 완료
- v0.0.0:98

### 2023 5/21

- finder 생성 위치 px 변경
- finder 생성될때 위치 조금씩 이동
- v0.0.0:99

### 2023 5/22

- finder tab 제작
- v0.0.0:100
- finder tabs 크기변화시 text ... 출력
- v0.0.0:101
- finder tab 클릭 제작
- v0.0.0:102

### 2023 5/24

- projects - main image 제작
- deepLink 대충 구현
- v0.0.0:103

### 2023 5/25

- projects 작업
  - 내용 작성 중, 파인더를 줄이고 늘려도 문제없도록 제작
  - daisy ui 적용
  - v0.0.0:104
  - scrollbar 디자인 적용
  - v0.0.0:105

### 2023 5/26

- project 반응형 제외하고 완성
- v0.0.0:106

### 2023 5/27

- Home 추가하여 제작 중
- v0.0.0:107

### 2023 5/28

- keepAlive 사용해서 finder 캐쉬
- v0.0.0:108
- Home 제작
- v0.0.0:109
- home skillset hover animation 제작
- v0.0.0:110

### 2023 5/29

- Finder가 nav와 겹치지 않게 개선
- menu absolute -> fixed로 변경
- finder 크기 피드백 받고 개선
- about, contact 빈공간 추가
- v0.0.0:111

### 2023 5/30

- tootip 컴포넌트화 진행
- v0.0.0:112
- fullscreen 기능 적용
- v0.0.0:113
- about pdf 적용
- v0.0.0:114
- deepLink 모듈화 + 앱이 없을 경우 웹으로 대체
- v0.0.0:115
- About 완성
- v0.0.0:116
- About 내용 변경
- v0.0.0:117
- About pdf 로딩 제작
- v0.0.0:118

### 2023 5/31

- Contact nav 제작
- v0.0.0:119
- Contact 제작 완료
- v0.0.0:120

### 2023 6/2

- tsconfig 제대로 잡음
- v0.0.0:121
- phaserJS type 잡음
- v0.0.0:122
- type error 다 잡음
- v0.0.0:123
- go server에서 client 폴더 index.html 띄움
- v0.0.0:124
- 이미지 용량 체크 후 용량 개선
- cursor-selector 적용
- loading 개선
- v0.0.0:125

### 2023 6/4

- type error 제거
- build 문제로 인한 Url 경로 변경
- v0.0.0:126
- mobile 대응 - pdf, finder, navbar, contact
- alert 추가, game 막음.
- v0.0.0:127

### 2023 6/5

- link 길이 줄이기. pc는 Deep link 제거
- v0.0.0:128
- 모바일 딥링크 대응
- v0.0.0:129
- 시간 실시간으로 변경
- navbar 폴더 링크로 변경
- v0.0.0:130

### 2023 6/6

- 각종 버그 제거
- v0.0.0:131
- 이력서 개선
- v0.0.0:132

### 2023 6/7

- finder game 제작 중
- 파인더 화면 꽉차게 변경
- 배경 새로 제작 중.
- v0.0.0:133
- tileObject class Character class와 병합함. zoom을 사용할려면 하나의 scene에서 사용해야함.
- 배경크기에 맞게 구현하고 움직임까지 구현
- v0.0.0:134

### 2023 6/9

- 배경 적용 테스트
- v0.0.0:135
- object 충돌 옵션 변경..안됌
- v0.0.0:136

### 2023 6/15

- tile 있어보이게 개선 , 충돌 안되는 버그 개선
- v0.0.0:137
- 노멀맨 제작 중
- v0.0.0:138

### 2023 6/21

- normalMan 제작
- 바닥 충돌 감지 적용
- v0.0.0:139
- 좌우 반전 적용하여 이미지 줄임.
- v0.0.0:140

### 2023 6/25
- 이력서 업데이트
- developic 추가
- v0.0.1:141
- project 이미지 최대 크기 조정
- v0.0.1:142

### 2023 6/26
-  SEO : vue-meta, vite-plugin-pages-sitemap, robot.txt 적용
- v0.0.1:143
- sitemap 생성
- v0.0.1:144
- readme, 이력서, about 글귀 수정
- v0.0.2:145

### 2023 7/1

- 캐릭터 바닥에 닿지 않아 캐릭터 사이즈 조절
- v0.0.2:146
- 점프 리팩토링
- v0.0.2:147
- 맵 변경
- v0.0.2:148
- game finder를 끌 경우 destroy 메소드 실행
- v0.0.2:149

### 2023 7/2

- 벽짚기 제작
- v0.0.2:150