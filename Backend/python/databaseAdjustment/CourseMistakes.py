import json

courses = json.loads(open("C:\\Users\\Manal\\Desktop\\University\\SES2\\courses.json", encoding="utf8").read())

requsisites = []
for course in courses:
    for req in courses[course]["pre-requisites"]:
        if req not in requsisites:
            requsisites.append(req)

mistakes = []
for req in requsisites:
    if req == '-1': #Flag for pre-requisites that are impossible to transfer to our system
        continue
    if req.endswith("c"):
        req = req[:-1]
    if req not in courses.keys():
        mistakes.append(req)

print(mistakes)