# Mailing Scheduling Feature

## Next.JS and Python - Flask

Sample work for the demtech.ai

client and server contains the client and server codes

- client: Next app running on next@14
- server: Flask - Python server to handle the mockapi for the data requirements

### Server

Steps to run

- pip install -r requirements.txt
- python app.py

### Client

Steps to run:

- npm install
- npm run dev

## Next.JS Prisma SQLite

### new*client_server => \_folder*

It contains both server and client as full using Next.JS app, implemented using Prisma, SQLite, and sample cronjob request handler in api.

Steps to run:

- npm install
- npm run dev

#### Test Api

```
http://localhost:3000/api/email-campaign?campaignId={campaignId}
```
