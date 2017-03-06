require './lib/game.rb'
require 'byebug'

if __FILE__ == $PROGRAM_NAME
  puts "What size stacks would you like?
  (enter numbers separated by commas, or press just press enter for default)"
  rows = gets.chomp.split(/,\s|,/).map(&:to_i)
  rows.empty? ? Game.new().play : Game.new(rows).play
end
