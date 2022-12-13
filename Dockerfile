FROM node:16-alpine as dependencies
WORKDIR /expense-system-ui
COPY package.json package-lock.json ./
RUN npm install

FROM node:16-alpine as builder
WORKDIR /expense-system-ui
COPY . .
COPY --from=dependencies /expense-system-ui/node_modules ./node_modules
RUN npm run build

FROM node:16-alpine as runner
WORKDIR /expense-system-ui
ENV NODE_ENV dev

COPY --from=builder /expense-system-ui/components ./components
COPY --from=builder /expense-system-ui/pages ./pages
COPY --from=builder /expense-system-ui/public ./public
COPY --from=builder /expense-system-ui/styles ./styles

COPY --from=builder /expense-system-ui/next.config.js ./
COPY --from=builder /expense-system-ui/tailwind.config.js ./
COPY --from=builder /expense-system-ui/postcss.config.js ./
COPY --from=builder /expense-system-ui/public ./public
COPY --from=builder /expense-system-ui/.next ./.next
COPY --from=builder /expense-system-ui/node_modules ./node_modules
COPY --from=builder /expense-system-ui/package.json ./package.json

EXPOSE 3000
CMD ["npm", "run" ,"dev"]