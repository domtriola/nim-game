require 'byebug'

class Nim
  def sum(nums)
    binaries = nums.map { |num| convert_from_base_ten(num, 2) }
    max = binaries.map(&:length).max
    binaries = binaries.map { |binary| pad(binary, max) }
    result = nil
    binaries.each do |binary|
      if result == nil
        result = binary
      else
        binary.each_char.with_index do |char, index|
          if char == "1"
            result[index] = result[index] == "0" ? "1" : "0"
          end
        end
      end
    end
    convert_from_binary_to_base_ten(result.to_i.to_s)
  end

  def convert_from_base_ten(num, base)
    digit_strings = {
      0 => '0',
      1 => '1',
      2 => '2',
      3 => '3',
      4 => '4',
      5 => '5',
      6 => '6',
      7 => '7',
      8 => '8',
      9 => '9',
      10 => 'a',
      11 => 'b',
      12 => 'c',
      13 => 'd',
      14 => 'e',
      15 => 'f',
    }

    return '0' if num == 0
    result, power, satisfied = [], 0, false
    until satisfied
      quotient = num / base ** power
      satisfied = true if quotient == 0
      result.unshift(digit_strings[quotient % base]) unless satisfied
      power += 1
    end
    result.join
  end

  def convert_from_binary_to_base_ten(binary)
    result = 0
    binary.reverse.each_char.with_index do |char, index|
      result += char.to_i * 2 ** index
    end
    result
  end

  def pad(string, length)
    result = string
    until result.length == length
      result = "0" + result
    end
    result
  end
end
