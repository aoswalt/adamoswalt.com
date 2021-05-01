defmodule Home.Project do
  defstruct [
    :title,
    :thumbnail,
    :image,
    :description,
    :short_description,
    :technologies,
    :source_url,
    :live_url,
    :last_update
  ]

  @json "assets/data/projects.json" |> File.read!() |> Jason.decode!()

  def read!() do
    @json
    |> Enum.map(&map_to_struct!/1)
    |> Enum.sort_by(& &1.last_update, {:desc, Date})
  end

  defp map_to_struct!(exp) do
    atomized = Enum.map(exp, fn {k, v} -> {String.to_existing_atom(k), v} end)
    struct!(__MODULE__, atomized)
    |> Map.update!(:last_update, &Date.from_iso8601!/1)
  end
end
