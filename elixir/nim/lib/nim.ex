defmodule Nim do
  @moduledoc """
  Nim is a game where players alternate taking any number of tokens from
  one row at a time. This is a misere version, meaning the player to
  take the last token loses.
  """

  def start do
    play_turn(%Nim.Game{})
  end

  defp play_turn(%Nim.Game{over: over} = game) do
    display_board(game)

    case over do
      false ->
        handle_response(game, String.trim(IO.gets("What's your move?\n")))
      true ->
        IO.puts("Game over")
    end
  end

  defp handle_response(game, move) do
    game
    |> make_move(move)
    |> switch_players
    |> play_turn
  end

  @doc """
    Takes `game` and `move` arguments. Move specifies amount of tokens
    to remove and the row to remove them from.

  ## Examples

      iex> Nim.make_move(%Nim.Game{}, "a 2")
      %Nim.Game{board: %{a: [0],
                         b: [0, 0, 0, 0],
                         c: [0, 0, 0, 0, 0]},
                         over: false, turn: :one}

  """
  def make_move(%Nim.Game{board: board} = game, move) do
    [row_key, qty] = String.split(move, ~r{,\s+|,|\s+})

    row_key = String.to_atom(row_key)
    row = board[row_key]
    next_row = Enum.take(row, length(row) - String.to_integer(qty))
    new_board = %{board | row_key => next_row}

    %Nim.Game{game | board: new_board}
  end

  @doc """
    Switches players and checks to see if game is won.

  ## Examples

      iex> Nim.switch_players(%Nim.Game{board: %{a: [], b: [], c: []}})
      %Nim.Game{board: %{a: [], b: [], c: []}, over: true, turn: :two}

  """
  def switch_players(%Nim.Game{board: board, turn: turn} = game) do
    next_player =
      case turn do
        :one -> :two
        :two -> :one
      end

    over = Enum.all? board, fn({_key, tokens}) ->
      length(tokens) == 0
    end

    %Nim.Game{game | over: over, turn: next_player}
  end

  defp display_board(game) do
  end
end
