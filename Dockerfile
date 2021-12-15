FROM princemendiratta/arcee:latest

WORKDIR /

COPY . /Arcee

WORKDIR /Arcee

RUN git init --initial-branch=main

RUN git remote add origin https://github.com/Logic232/Arcee.git

RUN git fetch origin main

RUN git reset --hard origin/main

RUN npm install

RUN cp -r /root/Baileys/lib /Arcee/node_modules/@adiwajshing/baileys/

CMD [ "npm", "start"]