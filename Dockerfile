FROM ruby:2.5.3

ENV APP_ROOT /app

WORKDIR $APP_ROOT

# 最低限のものをinstall
RUN apt-get update && apt-get install -y nodejs build-essential --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

RUN mkdir -p /usr/local/share/mkcert

RUN gem install bundler
# image内にbundle installするためGemfileをコピーする
COPY Gemfile $WORKDIR
COPY Gemfile.lock $WORKDIR

# docker image内にbundle install
RUN echo 'gem: --no-document' > ~/.gemrc && cp ~/.gemrc /etc/gemrc
RUN chmod uog+r /etc/gemrc
RUN bundle config --global build.nokogiri --use-system-libraries
RUN bundle config --global jobs 4
RUN bundle install && \
    rm -rf ~/.gem

# ポートのエクスポート
EXPOSE  3000

