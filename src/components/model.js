// Algoritma :
// 1. Buat fungsi checkType3(array,mark) untuk cek 3 kondisi [_,X,X],[X,_,X],[X,X,_] yang mengembalikan yang masih kosong
// 2. Terdapat 3 pilihan aksi yang dipilih berdasarkan prioritas
//     1. Menyerang --> Menggunakan fungsi checkType3 dengan mark diri sendiri
//     2. Bertahan --> Menggunakan fungsi checkType3 dengan mark lawan
//     3. Eksplorasi --> Memilih kotak kosong secara acak

class ModelAI {
    constructor(mark) {
        this.mark = mark //player marx X or O
        
        if (mark == 'O') this.opponent = 'X'
        else this.opponent = 'O'
    }
    action(board) {
        let attack = []
        let defend = []
        let check_self = -1
        let check_opponent = -1
        for (let i=0;i<3;i++) {
            let row_i = [i*3,i*3+1,i*3+2]
            let row = [board[row_i[0]],board[row_i[1]],board[row_i[2]]]
            check_self = this.checkType3(row,this.mark)
            check_opponent = this.checkType3(row,this.opponent)
            if (check_self>=0) attack.push(row_i[check_self])
            if (check_opponent>=0) defend.push(row_i[check_opponent])
            
            
            let col_i = [i,i+3,i+6]
            let col = [board[col_i[0]],board[col_i[1]],board[col_i[2]]]
            check_self = this.checkType3(col,this.mark)
            check_opponent = this.checkType3(col,this.opponent)
            if (check_self>=0) attack.push(col_i[check_self])
            if (check_opponent>=0) defend.push(col_i[check_opponent])
        }
        
        let diag1_i = [0,4,8]
        let diag1 = [board[diag1_i[0]],board[diag1_i[1]],board[diag1_i[2]]]
        check_self = this.checkType3(diag1,this.mark)
        check_opponent = this.checkType3(diag1,this.opponent)
        if (check_self>=0) attack.push(diag1_i[check_self])
        if (check_opponent>=0) defend.push(diag1_i[check_opponent])
        


        let diag2_i = [2,4,6]
        let diag2 = [board[diag2_i[0]],board[diag2_i[1]],board[diag2_i[2]]]
        check_self = this.checkType3(diag2,this.mark)
        check_opponent = this.checkType3(diag2,this.opponent)
        if (check_self>=0) attack.push(diag2_i[check_self])
        if (check_opponent>=0) defend.push(diag2_i[check_opponent])
        
        
        let empthySpace = this.getEmptySpace(board)
        let choice = empthySpace[Math.floor(Math.random() * empthySpace.length)]
        if (attack.length>0) {
            choice = attack[Math.floor(Math.random() * attack.length)]
        } else if (defend.length>0) {
            choice = defend[Math.floor(Math.random() * defend.length)]
        }            
        console.log(attack)
        console.log(defend)
        console.log(choice,"pilih")
        return choice
        
        
    }
    getEmptySpace(board) {
        let index_list = []
        for (let i=0;i<7;i++) {
            if (!board[i]) {
                console.log(i,board[i])
                index_list.push(i)
            }
        }
        return index_list
    }
    checkType3(row,mark) {
        if (row[0]==null && row[1]==mark && row[2]==mark) return 0
        if (row[1]==null && row[0]==mark && row[2]==mark) return 1
        if (row[2]==null && row[0]==mark && row[1]==mark) return 2
        return -1
    }
}
export {ModelAI};