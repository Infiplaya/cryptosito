# Cryptosito - Crypto API app

[https://cryptosito.vercel.app/](https://cryptosito.vercel.app/)

## Description

Hello crypto freaks! I don't know much about this world, I wasn't too interested in cryptocurrencies. So in order to learn a little bit about the realities of cryptocurrencies, and at the same time brush up on my web dev skills, I decided that I would build an app to help me learn about crypto!

My application displays the market situations of the most popular cryptocurrencies. The home page consists of two elements:
3 tabs that display successively the most popular recent cryptocurrencies, the most recently added cryptocurrencies, and the last tab, which perhaps in the future will display information about the community.

The second element is a table of cryptocurrencies, which displays the most important information about them. I recently added a sorting option and pagination to the table. If you click on the name of the cryptocurrency then you will be taken to a dynamically created page, which contains more information about the selected crypto. In addition, I added the option to register, so you can add to the watchlist the crypto that catches your eye or if you want - buy some! Of course, this is only a simulation and will not allow you to buy real crypto, unfortunately....

My application is made on the basis of T3Stack, which is a super way to create fullstack applications. It uses NextAuth for sign in system, Prisma which is a great databases ORM, TRPC for making fully typesafe APIs. For frontend UI I use React, specifically NextJS, which is something I truly love and it's my go to choice for web apps. I styled the whole thing using tailwindCSS. The design is simple but neat and readable, which is exactly what I wanted.

The hardest challenge for me was undoubtedly learning TRPC (including adding your favorite cryptocurrencies to the database), at first the setup and code may seem a bit cryptic, but once you get the basics down, the rest is smooth sailing. I have no doubt that this application is not perfect and I probably find some bugs in it, but I am trying to improve it all the time. If you have any ideas - write to me ;)

## Getting started

If you want to run this project on your local machine:
- Install dependencies
```
npm install
```
- Create .env file based on .env-example file
- Connect your database with Prisma (check out T3 stack docs, they are great)
- Create database schema
```
npx prisma db push
```
- Start the development server!
```
npm run dev
```


## Stack & Credits

- [T3Stack](https://init.tips/) - Interactive CLI to quickly set up an opinionated, full-stack, typesafe Next.js project.
- [Next.js](https://nextjs.org/) - A React framework that supports hybrid static & server rendering, TypeScript support, smart bundling, route pre-fetching, and more.
- [NextAuth.js](https://next-auth.js.org/) - Authentication for NextJS.
- [TailwindCSS](https://tailwindcss.com/) - A utility-first CSS framework. My go to for CSS.
- [Prisma](https://www.prisma.io/) - Next-generation Node.js and TypeScript ORM.
- [TRPC](https://www.trpc.io/) - allows you to easily build & consume fully typesafe APIs.
- [Tanstack Table](https://tanstack.com/table/v8) - great way for building powerful tables.


## Additional stuff
Feel free to tell me what can I add or improve! I am still learning web development, and I realize that this app is not perfect. Feedback is greatly appreciated. 

## Todo
- improve redirecting when no session
- style the community
- ?? 