use Mix.Config

config :home, HomeWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "QCkY4MTR+lxMMmw6BYnDznkFArZMwvXiElCtOND9klIYx/WkwjI6Tqdw3dEYO7oL",
  render_errors: [view: HomeWeb.ErrorView, accepts: ~w(html json), layout: false],
  pubsub_server: Home.PubSub,
  live_view: [signing_salt: "fVvxKCym"]

config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

config :phoenix, :json_library, Jason

import_config "#{Mix.env()}.exs"
