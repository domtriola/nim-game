require "nim"

describe Nim do
  describe "#sum" do
    it "returns non-zero nim-sums" do
      expect(Nim.sum([1,2])).to eq(3)
      expect(Nim.sum([1,3,4])).to eq(6)
    end

    it "returns zero nim-sums" do
      expect(Nim.sum([1,2,3])).to eq(0)
      expect(Nim.sum([1,4,5])).to eq(0)
    end
  end

  describe "#convert_from_base_ten" do
    it "converts numbers from base 10 to binary" do
      expect(Nim.convert_from_base_ten(1, 2)).to eq("1")
      expect(Nim.convert_from_base_ten(2, 2)).to eq("10")
      expect(Nim.convert_from_base_ten(3, 2)).to eq("11")
      expect(Nim.convert_from_base_ten(4, 2)).to eq("100")
    end
  end

  describe "#convert_from_binary_to_base_ten" do
    it "converts binary numbers to base ten" do
      expect(Nim.convert_from_binary_to_base_ten("1")).to eq(1)
      expect(Nim.convert_from_binary_to_base_ten("10")).to eq(2)
      expect(Nim.convert_from_binary_to_base_ten("11")).to eq(3)
      expect(Nim.convert_from_binary_to_base_ten("100")).to eq(4)
    end
  end
end
