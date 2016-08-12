require "game"

describe ComputerPlayer do
  let(:computer) { ComputerPlayer.new }
  let(:board) { Board.new([1,2,4]) }

  before(:each) do
    computer.display(board)
  end

  describe "#display" do
    it "should set board to an instance variable @board" do
      computer.display(board)
      expect(computer.board).to eq(board)
    end
  end

  describe "#get_move" do
    context "when 0 nim-sum move is possible" do
      it "should provide a move that results in a 0 nim-sum" do
        expect(computer.get_move).to eq([2, 1])
      end

      it "should avoid zero nim-sum traps if there are fewer than 4 beans" do
        no_zero_sum = Board.new([1,2,1])
        computer.display(no_zero_sum)
        10.times do
          expect(computer.get_move).to eq([1, 1])
        end
      end

      it "should choose the winning move if one exists" do
        no_zero_sum = Board.new([1,2])
        computer.display(no_zero_sum)
        10.times do
          expect(computer.get_move).to eq([1, 2])
        end

        no_zero_sum = Board.new([5])
        computer.display(no_zero_sum)
        10.times do
          expect(computer.get_move).to eq([0, 4])
        end
      end
    end

    context "when no 0 nim-sum move is possible" do
      it "should provide a random move" do
        no_zero_sum = Board.new([1,2,3])
        computer.display(no_zero_sum)
        expect(computer.get_move.count).to eq(2)
      end
    end
  end
end
