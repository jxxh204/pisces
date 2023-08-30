# Pisces

# Pisces

## **Description**

- 프로젝트 이름은 별자리 중 물고기자리를 의미합니다. 의미는 딱히 없고 해당 기간 쯤에 본격적으로 포트폴리오를 기획 하고 제작해서 지었습니다.
- 컨셉은 macOS 9을 컨셉으로 하고있습니다.
- golang으로 websocket서버를 만들어서 webRTC 시그널 서버로 사용 중입니다. webRTC를 어떻게 사용할지는 기획 중에 있습니다.
- PhaserJS를 사용하여 간단히 움직이는 캐릭터를 제작했습니다. 본격적으로 어떻게 사용할 지 기획 중에 있습니다.

**Skills**

- PhaserJS
- Vue3 & Pinia
- tailwindcss
- golang
- vite

## **Environment**

### **Installation**

```jsx
yarn && npm i
```

**Run**

```jsx
yarn dev && npm run dev
```

**build**

```bash
yarn build && npm run build
```

- 빌드 시 /src/server/client 폴더 내부로 결과물이 생성됩니다.

### **Prerequisite**

node version v18.16.0 사용 중.

### **Files**

src/media/webRTCsample.ts

- 제작 중인 webRTC 샘플입니다.

src/server

- golang 서버가 작성되어있습니다

### **Usage**

- src/server
  - 해당 폴더를 터미널로 접근 후 아래 코드를 실행하면 [localhost:3000](http://localhost:3000)으로 실행됩니다.
  ```bash
  go run .
  ```
  - localhost:3000은 /src/server/client 내부의 빌드 결과물을 로드합니다.
  - 빌드 결과물과 시그널 서버가 통신합니다.
