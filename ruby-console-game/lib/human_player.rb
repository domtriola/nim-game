class HumanPlayer
  def get_move
    puts "Which row would you like to take from?
          And how many beans would you like to take? (row, beans)"
    input = gets.chomp.split(/,\s|,/)
    row = input[0].ord - 97
    beans = input[1].to_i
    [row, beans]
  end

  def display(board)
    board.rows.each_with_index do |row, index|
      beans = []
      row.times { beans << "O" }
      puts "#{(index + 97).chr}: #{beans.join(" ")}"
    end
  end
end
