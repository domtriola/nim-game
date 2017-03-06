defmodule Nim do
  @moduledoc """
  Nim is a game where players alternate taking any number of tokens from
  one row at a time. This is a misere version, meaning the player to
  take the last token loses.
  """

  def play do
    play_turn(%Nim.Game{})
  end

  def play_turn(%Nim.Game{over: over} = game) do
    case over do
      false ->
        handle_response(game, IO.gets("What's your move?\n"))
      true ->
        IO.puts("Game over")
    end
  end

  def handle_response(game, move) do
    game
    |> make_move(move)
    |> handle_state
    |> play_turn
  end

  def make_move(%Nim.Game{board: board} = game, move) do
    [row_key, qty] = String.split(move, ~r{,\s+|,|\s+})

    row_key = String.to_atom(row_key)
    row = board[row_key]
    next_row = Enum.take(row, length(row) - String.to_integer(qty))
    new_board = %{board | row_key => next_row}

    %Nim.Game{game | board: new_board}
  end

  def handle_state(game) do

  end
end
