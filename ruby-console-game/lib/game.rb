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
    current_player.display(board)
  end

  def play_turn
  end

  def switch_players!
  end

  def over?
  end

  def winner
  end
end
