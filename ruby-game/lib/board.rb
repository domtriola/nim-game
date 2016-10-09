require_relative 'nim'

class Board
  attr_accessor :rows

  def initialize(rows)
    @rows = rows
  end

  def remove_from_row(move)
    rows[move[0]] -= move[1]
  end

  def add_to_row(move)
    rows[move[0]] += move[1]
  end
end
