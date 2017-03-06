defmodule Nim do
  @moduledoc """
  Documentation for Nim.
  """

  def play do
    play_turn(%Nim.Game{})
  end

  def play_turn(%Nim.Game{board: board, turn: turn, over: over} = game) do
    case over do
      false ->
        move = IO.gets("What's your move?\n")
        handle_response(move)
      true ->
        IO.puts("Game over")
    end
  end

  def handle_response(move) do
    move
    |> make_move
    |> play_turn
  end

  def make_move(move) do
    %Nim.Game{}
  end
end
