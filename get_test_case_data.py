def generate_valid_tic_tac_toe_boards(idx, depth, string):
    if depth == 8:
        # 아주 말도 안되는 경우는 가지치기 해준다
        # 번갈아가며 두는 게임이므로 2개 이상 개수 차이가 나면 안된다.
        if abs(string.count('X')-string.count('O')) <= 1:
            # 빈 공간이 있을 때 단 한개의 경우라도 연결된 상황이 있어야 한다.
            if string.count('.') > 0:
                if string[0] == string[1] == string[2] != '.' or string[3] == string[4] == string[5] != '.' or string[6] == string[7] == string[8] != '.' or string[0] == string[3] == string[6] != '.' or string[1] == string[4] == string[7] != '.' or string[2] == string[5] == string[8] != '.' or string[0] == string[4] == string[8] != '.' or string[2] == string[4] == string[6] != '.':
                    valid_boards.append(string)
            else:
                valid_boards.append(string)
        return
    else:
        for i in range(idx+1, 9):
            # 재귀를 통해 모든 경우를 탐색할 수 있다.
            generate_valid_tic_tac_toe_boards(i, depth+1, string+'X')
            generate_valid_tic_tac_toe_boards(i, depth+1, string+'O')
            generate_valid_tic_tac_toe_boards(i, depth+1, string+'.')

valid_boards = []

generate_valid_tic_tac_toe_boards(0, 0, 'X')
generate_valid_tic_tac_toe_boards(0, 0, 'O')
generate_valid_tic_tac_toe_boards(0, 0, '.')

# 그럴듯한 테스트 케이스를 TXT 파일로 만든다
with open('valid_tic_tac_toe_boards.txt', 'w') as f:
    for board in valid_boards:
        f.write('\'' + board + '\'' + ',' + '\n')

print(f"총 {len(valid_boards)}개의 보드가 생성되어 'valid_tic_tac_toe_boards.txt' 파일에 저장되었습니다.")
