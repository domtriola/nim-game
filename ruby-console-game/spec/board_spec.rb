require "game"

describe Board do
  let(:board) { Board.new([3,4,5]) }

  it "exposes a @rows instance variable" do
    ivar = board.instance_variable_get(:@rows)

    expect(board.rows).to be(ivar)
    expect(board.rows).to eq([3,4,5])
  end

  describe "#remove_from_row" do
    it "removes beans from selected row" do
      board.remove_from_row([0,1])
      expect(board.rows).to eq([2,4,5])
    end
  end

  describe "#add_to_row" do
    it "adds beans to selected row" do
      board.add_to_row([0,1])
      expect(board.rows).to eq([4,4,5])
    end
  end
end
