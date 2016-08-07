require_relative 'nim'

class ComputerPlayer
  attr_accessor :board

  def get_move
    # choose best move based on nim_sum
  end

  def display(board)
    @board = board
  end
end
