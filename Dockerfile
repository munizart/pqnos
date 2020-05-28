FROM node:lts
RUN apt-get update
RUN apt-get install -y git

RUN git config --global user.email "contato@pqnos.com.br"
RUN git config --global user.name "PQnos Updater"

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
#COPY package*.json ./

#RUN npm ci --only=production

COPY . .

RUN /bin/bash -c "source .env"
ENV GIT_REMOTE_FULL_URL=${GIT_REMOTE_USER}:${GIT_REMOTE_PASS}@${GIT_REMOTE_URL}
CMD [ "cat", "my-env" ]
#RUN git remote add updater_origin $GIT_REMOTE_FULL_URL
#
#EXPOSE ${PORT}
#CMD ["git", "remote", "-v", "show"]
#CMD ["node", "updater/web.js"]
#CMD ["env"]