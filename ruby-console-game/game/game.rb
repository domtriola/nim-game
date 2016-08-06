require_relative 'board'
require_relative 'human_player'
require_relative 'computer_player'

class Game
  attr_accessor :board, :player_one, :player_two

  def initialize(rows)
    @board = Board.new(rows)
  end

end
