

const areas = document.querySelectorAll(".playground > li")
const oButton = document.querySelector(".o-button")
const xButton = document.querySelector(".x-button")
const status = document.querySelector(".status")
const sample = [
    'XXXOOO...', 'OOOXXX...', 'XOXOXOXOX', 'XXX......', 'OOO......',
    'XOXOXOXXO', 'XOXOXOXO.', 'OXOXOXOXO', 'XOXOXOX..', 'XO.XO.XO.',
    'XO.XOX.OX', 'XOX.OX..O', 'XXOXOOOX.', 'OXOXXOXXO', 'XXOOXOXOX',
    'XXXOOOXX.', 'XOXXOXOOX', 'OXOXOXOX.', 'XOXOXOXX.', 'XOXXOXXOO',
    'XOX.XOXOX', 'XO.OXOXOX', 'XO.XOXOXO', 'XXOXOXOOX', 'XXXOXOOO.',
    'XOXOXOXO.', 'XO.XOX.XO', 'OXOXOXXOX', 'XOXXOX.OX', 'OXOXOXO.X',
    'XXOOOXXX.', 'OXOXXOXOX', 'XXOXOOXOX', 'XXXOXOXOO', 'OOXXXOO.X',
    'OXOXXOX.O', 'XXOOXOX.X', 'OXOXXOXOX', 'XOXXOXXOX', 'XOXOXOXOX',
    'XXOXOXOXO', 'OXXOXOXOX', 'XXOXOXOX.', 'OXOXOXOX.', 'XO.OXOXOX',
    'XXOXOXOXX', 'OXXOXOXXO', 'XXOXOXOXO', 'OXOXOXOXX', 'XOXXOXXXO',
    'XOXOXOXOX', 'OXOXOXOXO', 'XXOXOXOXX', 'XOXXOXOXO', 'XXOXOXO.X',
    'OXXOXOXOX', 'OXOXOXOXX', 'XOXOXOXOX', 'OXOXOXOX.', 'XXOXOXXXO',
    'XOXXOXOX.', 'XXOXOXOXO', 'OXOXOXXOX', 'XXOXOXO.X', 'OXOXOXOXX',
    'XOXOXOXOX', 'XO.OXOXOX', 'XXOXOXOX.', 'OXOXOXOXX', 'XOXOXOXO.',
    'XXOXOXOXO', 'OXOXOXOX.', 'XXOXOXOXX', 'OXOXOXO.X', 'XOXXOXOXO',
    'XXOXOXOX.', 'OXOXOXOXO', 'XXOXOXOXX', 'XOXXOXOX.', 'XXOXOXO.X',
    'OXOXOXOX.', 'XO.OXOXOX', 'XXOXOXOXO', 'OXOXOXXOX', 'XXOXOXOXX',
    'OXOXOXOX.', 'XXOXOXOXO', 'XOXXOXO.X', 'XXOXOXOXX', 'OXOXOXOXO',
    'XXOXOXO.X', 'OXOXOXOXX', 'XXOXOXOXO', 'OXOXOXOX.', 'XXOXOXOXX',
    'XO.OXOXOX', 'XXOXOXOXO', 'OXOXOXOX.', 'XXOXOXOXO', 'XOXXOXOX.',
]

let score = 0
let answer

init()

function init () {
    let idx = 0;
    status.innerText = score
    testCase = sample[Math.floor(Math.random()*sample.length)]
    areas.forEach((area)=>{
        area.innerHTML = testCase[idx];
        idx++
    })
    answer = setBoard(areas)
    console.log(answer)
}

function setBoard(areas) {
    const board = new Array(3).fill().map(()=>[])
    for (let i = 0; i < 9; i++) {
        board[i%3].push(areas[i].innerHTML)
    }
    const tempBoard = [...board]
    oCnt = 0
    xCnt = 0
    spaceCnt = 0
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (tempBoard[i][j] === 'O') {
                oCnt++
            } else if (tempBoard[i][j] === 'X') {
                xCnt++
            } else {
                spaceCnt++
            }
        }
    }
    let difference = xCnt - oCnt
    if (difference === 0) {
        if (isAvailable(tempBoard) === 'O') {
            return true
        }
    } else if (difference === 1) {
        if (!spaceCnt) {
            if (isAvailable(tempBoard) === 'No') {
                return true
            }
        } 
        if (isAvailable(tempBoard) === 'X') {
            return true
        } 
    } else {
        return false
    }
}

function isAvailable(board) {
    let row = -1
    let winner = 'No'
    for (let i = 0 ; i < 3; i++) {
        if (board[i][0] !== '.' && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
            if (row === -1) {
                row = i
            } else {
                return false
            }
        }
    }
    if (row !== -1) {
        winner = board[row][0]
    }

    let col = -1
    for (let i = 0; i < 3 ; i++) {
        if (board[0][i] !== '.' && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
            if (col === -1) {
                col = i 
            } else {
                return false
            }
        }
    }
    if (col !== -1) {
        winner = board[0][col]
    }

    let cross = 3

    if (board[1][1] !== '.') {
        console.log(123)
        if ((board[0][0] === board[1][1]) && (board[1][1] === board[2][2]) && (board[0][2] === board[1][1]) && (board[1][1] === board[2][0])) {
            // 'X cross'
            cross = 0
        } 
        } else if ((board[0][0] === board[1][1]) && (board[1][1] === board[2][2])) {
            // '\ cross'
            cross = 1 
        } else if ((board[0][2] === board[1][1]) && (board[1][1] === board[2][0])) {
            // '/ cross'
            cross = 2
        }
        console.log(cross)
    if (cross !== -1) {
        winner = board[1][i]
    }
    if (row === 0 && col === 3) {
        if (cross === 1) {
            return false
        }
    } else if (row === 3 && col === 0) {
        if (cross === 2) {
            return false
        }
    }
    console.log(winner)
    return winner
}

oButton.addEventListener("click", () => {
    if (answer) {
        alert('맞았다. 정상적 틱택토였다...')
        score++
    } else {
        score--
        alert('비정상적 틱택토였다....')
    }
    setTimeout(() => {
        init()
    }, 0);
})
xButton.addEventListener("click", () => {
    if (!answer) {
        alert('맞았다. 비정상적 틱택토였다....')
        score++
    } else {
        alert('정상적 틱택토였다...')
        score--
    }
    setTimeout(() => {
        init()
    }, 0);
})

