FROM node:13.3.0 AS compile-image

EXPOSE 4200

RUN npm install -g @angular/cli

WORKDIR /opt/ng
COPY package.json package-lock.json ./
RUN npm install

ENV PATH="./node_modules/.bin:$PATH" 

COPY . ./
RUN ng build --prod

ENTRYPOINT [ "ng", "serve" ]