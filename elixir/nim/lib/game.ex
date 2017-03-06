defmodule Nim.Game do
  defstruct(
    board: [{0, 0, 0},
            {0, 0, 0, 0},
            {0, 0, 0, 0, 0}],
    turn: 0,
    over: false
  )
end
