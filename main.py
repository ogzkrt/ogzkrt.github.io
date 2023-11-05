def print_three(s):
    result = ''
    for i in range(0, len(s), 3):
        result += s[i:i+3] + ' '
    return result


def print_two(s):
    result = ''
    for i in range(0, len(s), 2):
        result += s[i:i+2] + ' '
    return result


def format_string(s):

    # remove space and dash
    result = s.replace(' ', '').replace('-', '')

    if len(result) >= 3:
        if len(result) % 3 == 1:
            s1 = print_three(result[-5])
            s2 = print_two(result[-4:])
            return s1 + ' ' + s2
        if len(result) % 2 == 2:
            s1 = print_three(result[-3])
            s2 = print_two(result[-2:])
            return s1 + ' ' + s2
        else:
            return print_three(result)

    else:
        return result


if __name__ == '__main__':

    s = '98-98'
    r = format_string(s)
    print(r)
