import json

students = json.loads(open("C:\\Users\\Manal\\Desktop\\University\\SES2\\students.json", encoding="utf8").read())
courses = json.loads(open("C:\\Users\\Manal\\Desktop\\University\\SES2\\courses.json", encoding="utf8").read())

print("\n")
print("\n")
for student in students:
    impossibleCourses = []
    for course in student["courses_completed"]:
        if course.endswith("c"):
            course = course[:-1]
        if course not in courses.keys():
            impossibleCourses.append(course)
            continue
        for requisite in courses[course]["pre-requisites"]:
            if requisite == '-1':
                impossibleCourses.append(course)
                continue
            if requisite not in student["courses_completed"]:
                student["courses_completed"].append(requisite)
    for course in impossibleCourses:
        student["courses_completed"].remove(course)

newstudents = open("C:\\Users\\Manal\\Desktop\\University\\SES2\\newStudents.json", mode="w")
json.dump(students, newstudents)
newstudents.close