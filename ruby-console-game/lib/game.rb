require_relative 'board'
require_relative 'human_player'
require_relative 'computer_player'

class Game
  attr_accessor :board, :player_one, :player_two, :current_player

  def initialize(rows = [3,4,5])
    @board = Board.new(rows)
    @player_one = HumanPlayer.new
    @player_two = ComputerPlayer.new
    @current_player = player_one
  end

  def play
    until over?
      play_turn
    end
    if winner == player_one
      puts "You win!"
    else
      puts "You lose"
    end
  end

  def play_turn
    current_player.display(board)
    board.remove_from_row(current_player.get_move)
    switch_players!
  end

  def switch_players!
    if current_player == player_one
      current_player = player_two
    else
      current_player = player_one
    end
  end

  def over?
    board.rows.all? { |row| row == 0 }
  end

  def winner
    return current_player if over?
    nil
  end
end
