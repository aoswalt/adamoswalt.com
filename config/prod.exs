use Mix.Config

config :home, HomeWeb.Endpoint,
  url: [host: "adamoswalt.com", port: 80],
  cache_static_manifest: "priv/static/cache_manifest.json",
  http: [
    port: String.to_integer(System.get_env("PORT") || "80"),
    transport_options: [socket_opts: [:inet6]]
  ],
  server: true

config :logger, level: :info
