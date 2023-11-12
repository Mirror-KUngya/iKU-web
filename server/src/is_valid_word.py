def is_valid_word(word, dictionary_file="data/korean5800.txt"):
    with open(dictionary_file, "r") as file:
        for line in file:
            if word.lower() == line.strip().lower():
                return True
    return False


# 사용 예시
word = "아빠"
if is_valid_word(word):
    print(f"{word} is a valid word.")
else:
    print(f"{word} is not a valid word.")
