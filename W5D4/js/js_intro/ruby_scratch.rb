def transpose(arr)
  transposed = []
  new_row = []
  col = 0
  while col < arr.first.length
    arr.each do |row|
      new_row << row[col]
    end
    col += 1
    transposed << new_row
    new_row = []
  end
  transposed
end