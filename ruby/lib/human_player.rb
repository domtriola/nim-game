class HumanPlayer
  def get_move
    puts "Which row would you like to take from?"
    puts "And how many beans would you like to take? (row, beans)"
    input = gets.chomp.split(/,\s|,/)
    row = input[0].ord - 97
    beans = input[1].to_i
    if beans < 1
      puts "You must choose at least one bean"
      return get_move
    end
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
