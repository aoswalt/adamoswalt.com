ARG ELIXIR_VER=1.11.4
ARG OTP_VER=23.3.2
ARG OS=alpine
ARG OS_VER=3.13.3

FROM hexpm/elixir:${ELIXIR_VER}-erlang-${OTP_VER}-${OS}-${OS_VER} AS builder

RUN apk update && \
  apk add --no-cache --update \
    git && \
  mix local.rebar --force && \
  mix local.hex --force

WORKDIR /opt/app

COPY mix.exs mix.lock ./

ARG MIX_ENV=prod
ENV MIX_ENV=${MIX_ENV}

RUN mix do deps.get, deps.compile

COPY . .

RUN mix compile && mix phx.digest assets -o priv/static

RUN mix release && \
  mv _build/${MIX_ENV}/rel/home /opt/release


FROM ${OS}:${OS_VER}

RUN apk add --no-cache ncurses-libs

WORKDIR /opt/app

COPY --from=builder /opt/release .

CMD ["/opt/app/bin/home", "start"]
