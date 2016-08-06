require './lib/game.rb'

if __FILE__ == $PROGRAM_NAME
  puts "What size stacks would you like?
  (enter numbers separated by commas, or press just press enter for default)"
  rows = gets.chomp.split(/,\s|,/).map(&:to_i)
  Game.new(rows).play
end
