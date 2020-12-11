FROM node:latest

COPY /movie-service /src

WORKDIR /src

RUN npm install
RUN npm install -g @angular/cli #added

EXPOSE 4200

CMD ng serve --host 0.0.0.0 #added