class Nim
  def self.sum(nums)
    nums.inject(0) { |sum, num| sum ^ num }
  end
end
