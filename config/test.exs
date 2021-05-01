use Mix.Config

config :home, HomeWeb.Endpoint,
  http: [port: 4002],
  server: false

config :logger, level: :warn
