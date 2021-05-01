defmodule HomeWeb.Router do
  use HomeWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", HomeWeb do
    pipe_through :browser

    get "/", AboutController, :index
    get "/projects", ProjectsController, :index
    get "/resume", ResumeController, :index
    get "/contact", ContactController, :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", HomeWeb do
  #   pipe_through :api
  # end
end
