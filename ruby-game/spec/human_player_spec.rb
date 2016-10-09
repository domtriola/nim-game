require "game"

describe HumanPlayer do
  let(:human) { HumanPlayer.new }
  let(:board) { Board.new([3,4,5]) }

  class NoMoreInput < StandardError
  end

  before do
    $stdout = StringIO.new
    $stdin = StringIO.new

    class HumanPlayer
      def gets
        result = $stdin.gets
        raise NoMoreInput unless result
        result
      end
    end

    def human.get_move!
      get_move rescue NoMoreInput
    end
  end

  after :all do
    $stdout = STDOUT
    $stdin = STDIN
  end

  describe "#get_move" do
    it "asks player which row they would like to take from, and how many beans" do
      human.get_move!
      expect($stdout.string.downcase).to match(/row/)
      expect($stdout.string.downcase).to match(/beans/)
    end

    it "takes a character for the row and number of beans to take" do
      $stdin.string << "a, 3"
      expect(human.get_move).to eq([0, 3])
    end
  end

  describe "#display" do
    it "prints the rows to the console" do
      human.display(board)
      expect($stdout.string).to match(/a: O O O/)
      expect($stdout.string).to match(/b: O O O O/)
      expect($stdout.string).to match(/c: O O O O O/)
    end
  end
end
