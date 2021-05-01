defmodule HomeWeb.Helpers.SvgHelper do
  use Phoenix.HTML

  alias HomeWeb.Router.Helpers, as: Routes

  def svg_icon(conn, name, opts \\ []) do
    classes = Keyword.get(opts, :class, "") <> " icon"

    content_tag(:svg, class: classes, height: 32, width: 32) do
      tag(:use, href: Routes.static_path(conn, "/images/icons.svg#" <> name))
    end
  end
end
