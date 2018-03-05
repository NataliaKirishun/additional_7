module.exports = function solveSudoku(matrix) {

    let simple_matrix = convertToSimpleArray(matrix);
   function convertToSimpleArray(array){
        let res=[];
        for (let i=0; i<array.length; i++)
            if (!Array.isArray(array[i]))
                res.push(array[i]);
            else
                res=res.concat(convertToSimpleArray(array[i]));
        return res;
    };
    function check(number, row, col) {
        for (let i = 0; i < 9; i++) {
            let x = ((Math.floor(row / 3) * 3) + Math.floor(i / 3)) * 9 + (Math.floor(col / 3) * 3) + (i % 3);
            if (number === simple_matrix[(row * 9) + i] ||
                number === simple_matrix[col + (i * 9)] ||
                number === simple_matrix[x]) {
                return false;
            }
        }
        return true;
    }

    function get_number(index) {
        if (index >= simple_matrix.length) {
            return true;
        } else if (simple_matrix[index] !== 0) {
            return get_number(index + 1);
        }
        for (let i = 1; i <= 9; i++) {
            if (check(i, Math.floor(index / 9), index % 9)) {
                simple_matrix[index] = i;
                if (get_number(index + 1)) {
                    return true;
                }
            }
        }
        simple_matrix[index] = 0;
        return false;
    }

    function convertToHardArray(arr) {
        let result = [];
        for (let i = 0; i < arr.length; i += 9) {
            result.push(arr.slice(i, i + 9));
        }
        return result;
    }


    if (get_number(0)) return convertToHardArray(simple_matrix);
    };








