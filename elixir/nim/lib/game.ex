defmodule Nim.Game do
  defstruct(
    board: %{a: [0, 0, 0],
            b: [0, 0, 0, 0],
            c: [0, 0, 0, 0, 0]},
    turn: :one,
    over: false
  )
end
