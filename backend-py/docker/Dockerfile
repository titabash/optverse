# FROM ubuntu:20.04
FROM python:3.11-slim

RUN ln -sf /usr/share/zoneinfo/Asia/Tokyo /etc/localtime

# RUN apt -y update && apt -y upgrade && apt -y install gcc g++ make curl python3 tzdata python3-venv libedit2
RUN apt -y update && apt -y upgrade && apt -y install gcc g++ make curl tzdata libedit2 nodejs npm
RUN npm install n -g
RUN n stable
RUN apt purge -y nodejs npm
RUN apt autoremove -y

RUN curl -s https://get.modular.com | sh -

RUN modular install mojo

SHELL ["/bin/bash", "-l", "-c"]

RUN MOJO_PATH=$(modular config mojo.path) \
    && BASHRC=$( [ -f "$HOME/.bash_profile" ] && echo "$HOME/.bash_profile" || echo "$HOME/.bashrc" ) \
    && echo 'export MODULAR_HOME="'$HOME'/.modular"' >> "$BASHRC" \
    && echo 'export PATH="'$MOJO_PATH'/bin:$PATH"' >> "$BASHRC" \
    && source "$BASHRC"

RUN apt -y install modular

COPY ./backend-py/app/requirements.txt /tmp/requirements.txt

RUN pip install --upgrade pip && pip install -r /tmp/requirements.txt
RUN prisma -v
