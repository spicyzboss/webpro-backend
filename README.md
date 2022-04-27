# Patty's Backend

เป็นหลังบ้านของโปรเจ็ค Patty ซึ่งจะเป็นจำพวก service ที่เกี่ยวกับระบบ CRUD ซะเป็นส่วนใหญ่

## Installation

via npm

```bash
npm i
```

via yarn

```bash
yarn
```

## Development

via npm

```bash
npm run dev
```

via yarn

```bash
yarn dev
```

## Docker

โปรเจ็คนี้สามารถรันผ่าน Docker ได้ด้วยเช่นกัน

pull image มาจาก docker hub

```bash
docker pull spicyzboss/webpro-backend
```

สร้าง container ด้วยคำสั่งด้านล่าง โดยใส่ข้อมูล environment ตามนี้

- DATABASE_URL: เป็น url ของ database
- MAIL_SENDER_USER: เป็น email ของ gmail
- MAIL_SENDER_PASS: เป็น password ของ gmail

```bash
docker run -d --name webpro-backend \
      --env DATABASE_URL={mysql://username:password@example.com/databasename} \
      --env HOST=http://localhost \
      --env MAIL_SENDER_USER={gmailuser} \
      --env MAIL_SENDER_PASS={gmailpass} \
      -p 3001:3001 \
      spicyzboss/webpro-backend
```

backend process จะไปรันบน `http://localhost:3001`
