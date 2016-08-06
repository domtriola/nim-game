require "game"

describe Game do
  let(:game) { Game.new }

  it "initializes a default board with 3, 4, and 5 length rows" do
    expect(game.board.rows).to eq([3,4,5])
  end

  it "initializes a board with custom rows" do
    custom_game = Game.new([4,5,6])
    expect(custom_game.board.rows).to eq([4,5,6])
  end

  describe "#board" do
    it "exposes a @board instance variable" do
      ivar = game.instance_variable_get(:@board)

      expect(game.board).to be(ivar)
      expect(game.board).to be_an_instance_of(Board)
    end
  end

  describe "#player_one" do
    it "exposes a @player_one instance of HumanPlayer" do
      ivar = game.instance_variable_get(:@player_one)

      expect(game.player_one).to be(ivar)
      expect(game.player_one).to be_an_instance_of(HumanPlayer)
    end
  end

  describe "#board" do
    it "exposes a @player_two instance of ComputerPlayer" do
      ivar = game.instance_variable_get(:@player_two)

      expect(game.player_two).to be(ivar)
      expect(game.player_two).to be_an_instance_of(ComputerPlayer)
    end
  end

  describe "#current_player" do
    it "exposes a @current_player instance variable" do
      ivar = game.instance_variable_get(:@current_player)

      expect(game.current_player).to be(ivar)
      expect(game.current_player).to be(game.player_one)
    end
  end
end
