
### การติดตั้งโปรเจกต์

```bash
git clone https://github.com/phonsing-Hub/app.git
```
## app

```bash
cd app
bun install
```
หรือจะใช้ yarn or npm 

### 1. การรันแอปพลิเคชันในโหมด Development

เมื่อคุณติดตั้งโปรเจกต์เรียบร้อยแล้ว ให้รันแอปพลิเคชันในโหมด development ด้วยคำสั่ง:

```bash
bun run dev
```
การรันนี้จะใช้ Vite หรือเครื่องมือที่กำหนดไว้ในไฟล์ `package.json` 

### 2. การสร้างและสร้าง Production Build

เมื่อคุณพร้อมที่จะสร้าง Production Build ของแอปพลิเคชัน เพื่อนำไปใช้งานจริงหรือติดตั้งบนเซิร์ฟเวอร์ ใช้คำสั่ง:

```bash
bun run build
```

คำสั่งนี้จะใช้ Vite หรือเครื่องมือที่กำหนดไว้ใน `package.json` เพื่อสร้าง Production Build ซึ่งจะถูกเก็บไว้ในโฟลเดอร์ที่กำหนดไว้ (`dist`).


## backEnd

```bash
cd backEnd
bun install

npx prisma migrate dev --name init
npx prisma migrate dev
```
### 1. การรันแอปพลิเคชันในโหมด Development

ในโหมด development, คุณสามารถใช้ nodemon เพื่อรันแอปพลิเคชันโดยอัตโนมัติเมื่อมีการเปลี่ยนแปลงในโค้ด:

```bash
bun run dev
```
หรือจะใช้ yarn or npm

### 2. การรันแอปพลิเคชันในโหมด Production

เมื่อคุณพร้อมที่จะนำแอปพลิเคชันไปใช้งานจริงบนเซิร์ฟเวอร์ ให้สร้าง Production Build และรันด้วยคำสั่ง:

```bash
bun start
```

### 3. การจัดการ Dependencies และ DevDependencies

- **Dependencies**: เป็นโมดูลที่จำเป็นสำหรับการทำงานของแอปพลิเคชัน ต้องติดตั้งและระบุใน `package.json` ด้วยคำสั่ง `bun install` หรือ `npm install`.

### 4. การจัดการกับไฟล์และโครงสร้างโปรเจกต์

- **โครงสร้างของโปรเจกต์**: ประกอบด้วยไฟล์หลัก เช่น `index.js` หรือ `bin/www` และไดเร็กทอรี่อื่นๆ ที่เกี่ยวข้อง เช่น `routes`, `controllers`, `models` ซึ่งเป็นสิ่งที่คุณสามารถปรับแต่งตามความต้องการของแอปพลิเคชันได้.

- **การเข้าถึงแอปพลิเคชัน**: หลังจากที่รันแอปพลิเคชันในโหมด development หรือ production คุณสามารถเข้าถึงผ่าน URL ที่กำหนดไว้ (เช่น `http://localhost:3000`).

---
