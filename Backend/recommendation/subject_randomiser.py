from random import randrange
import json

def main():
    all_subjects = {}

    with open('./recommendation/uts_subjects.json', encoding="utf8") as file:
        all_subjects = json.load(file)

    all_subjects_keys = [*all_subjects]
    selected_subjects = [];

    while (len(selected_subjects) < 10):
        length =  len(all_subjects_keys)
        random = randrange(0, length)
        if all_subjects_keys[random] not in selected_subjects:
            selected_subjects.append(all_subjects_keys[random])

    random_subjects = {}
    for subject_code in selected_subjects:
        random_subjects[subject_code] = all_subjects[subject_code]

    print(json.dumps(random_subjects))

    exit()

if __name__ == '__main__':
    main()
