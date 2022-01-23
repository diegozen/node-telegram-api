FROM node:14

ARG DEBIAN_FRONTEND=noninteractive

RUN cd / \ 
&& apt-get -y update \
&& apt-get -y upgrade \
&& apt-get -y install make git zlib1g-dev libssl-dev gperf php-cli cmake clang libc++-dev \
&& git clone --depth 1 -b v1.7.0 https://github.com/tdlib/td.git \
&& cd td \
&& rm -rf build \
&& mkdir build \
&& cd build \
&& CXXFLAGS="-stdlib=libc++" CC=/usr/bin/clang CXX=/usr/bin/clang++ cmake -DCMAKE_BUILD_TYPE=Release -DCMAKE_INSTALL_PREFIX:PATH=../tdlib .. \
&& cmake --build . --target prepare_cross_compiling \
&& cd .. \
&& php SplitSource.php \
&& cd build \
&& cmake --build . --target install \
&& cd .. \
&& php SplitSource.php --undo \
&& cd .. \
&& ls -l td/tdlib

RUN cp /td/build/libtdjson.so /usr/lib/

WORKDIR /home/app

ENV PORT 8080

EXPOSE 8080