require_relative 'nim'

class ComputerPlayer
  attr_accessor :board

  def get_move
    zero_sums = []
    all_moves = []
    board.rows.each_with_index do |row, row_index|
      (1..row).each do |bean_count|
        move = [row_index, bean_count]
        zero_sums << move if makes_zero_nim_sum?(move)
        all_moves << move
      end
    end
    all_moves.each { |move| return move if best_move?(move) }
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

  def best_move?(move)
    board.remove_from_row(move)
    nonzero_rows = board.rows.reject { |row| row == 0 }
    if nonzero_rows.all? { |row| row == 1 }
      board.add_to_row(move)
      nonzero_rows.count.odd? ? true : false
    elsif board.rows.inject(:+) == 1
      board.add_to_row(move)
      true
    else
      board.add_to_row(move)
      false
    end
  end
end
