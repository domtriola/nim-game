require_relative 'board'
require_relative 'human_player'
require_relative 'computer_player'

class Game
  attr_accessor :board, :player_one, :player_two,
                :current_player, :last_move

  def initialize(rows = [3, 4, 5])
    @board = Board.new(rows)
    @player_one = HumanPlayer.new
    @player_two = ComputerPlayer.new
    @current_player = player_one
    @last_move = nil
  end

  def play
    until over?
      system('clear')
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
    unless last_move.nil? || current_player.class == ComputerPlayer
      puts "The computer took #{last_move[1]} bean(s) from row #{(last_move[0] + 97).chr}"
    end
    @last_move = current_player.get_move
    board.remove_from_row(last_move)
    switch_players!
  end

  def switch_players!
    if current_player == player_one
      @current_player = player_two
    else
      @current_player = player_one
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
