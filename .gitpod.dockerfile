FROM gitpod/workspace-full-vnc

RUN sudo apt-get update && \
    sudo apt-get install -y libasound2-dev libgtk-3-dev libnss3-dev && \
    sudo rm -rf /var/lib/apt/lists/*

# Install MongoDB
# Source: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu-tarball/#install-mongodb-community-edition
RUN mkdir -p /tmp/mongodb && \
    cd /tmp/mongodb && \
    wget -qOmongodb.tgz https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-ubuntu2004-4.4.2.tgz && \
    tar xf mongodb.tgz && \
    cd mongodb-* && \
    sudo cp bin/* /usr/local/bin/ && \
    rm -rf /tmp/mongodb && \
    sudo mkdir -p /data/db && \
    sudo chown gitpod:gitpod -R /data/db

# Install mongodb compass on ubuntu
# Source: https://docs.mongodb.com/compass/current/install/
RUN sudo apt-get update && \
    sudo DEBIAN_FRONTEND=noninteractive apt-get -y install libnotify4 libnss3 xdg-utils libgconf-2-4 libsecret-1-0 gnome-keyring&& \
    wget https://downloads.mongodb.com/compass/mongodb-compass_1.26.0_amd64.deb && \
    sudo dpkg -i mongodb-compass_1.26.0_amd64.deb