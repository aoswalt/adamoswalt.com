defmodule Home.Experience do
  defstruct [:title, :dates, :location, :summary, :highlights]

  @json "assets/data/experience.json" |> File.read!() |> Jason.decode!()

  def read!() do
    @json
    |> Enum.map(&map_to_struct!/1)
  end

  defp map_to_struct!(exp) do
    atomized = Enum.map(exp,fn {k, v} -> {String.to_existing_atom(k), v} end)
    struct!(__MODULE__, atomized)
  end
end
