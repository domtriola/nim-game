require_relative 'nim'

class ComputerPlayer
  attr_accessor :board

  def get_move
    zero_sums = []
    all_moves = []
    board.rows.each_with_index do |row, row_index|
      (1..row).each do |bean_count|
        move = [(index + 97).chr, bean_count]
        zero_sums << move if makes_zero_nim_sum?(move)
        all_moves << move
      end
    end
    return zero_sums.sample unless zero_sums.empty?
    all_moves.sample
  end

  def display(board)
    @board = board
  end

  def makes_zero_nim_sum?(move)
    board.remove_from_row(move)
    if Nim.sum(board.rows) == 0
      board.add_to_row(move)
      true
    else
      board.add_to_row(move)
      false
    end
  end
end
