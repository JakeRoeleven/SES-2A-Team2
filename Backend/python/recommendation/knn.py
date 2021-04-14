import json

#Cosine Similarity functions
def dotProd(a,b):
    sum=0
    for i in range(len(a)):
        sum+=a[i]*b[i]
    return sum

def trueLen(a):
    sum=0
    for x in a:
        sum+=x**2
    return sum**0.5

def cosSimilarity(a,b):
    top = dotProd(a,b)
    bottom = trueLen(a)*trueLen(b)
    return top/bottom

#Generic function to get candidate course set
def getMatchingCourseList(**keyValuePair):
    courseList = []
    for id in courses:
        flag = True
        for key in keyValuePair:
            if courses[id][key] != keyValuePair[key]:
                flag=False
                break
        if flag:
            courseList.append(id)
    return courseList

#Generic function to get candidate student list from candidate course set
def getStudentSet(courseList):
    #This will probably be a db call in the actual version
    studentList = []
    for id in students:
        for course in courseList:
            if course in students[id]["courses"]:
                studentList.append(id)
                break
    return studentList

#transforms a student in the format of the student dictionary within students into a vector for cosine similarity
def studentToVector(student):
    studentVector = []
    for key in student:
        if(key != "courses"): #exclude non booleans
            studentVector.append(int(student[key]))
    return studentVector

#will return the k nearest neighbours of newStudent in the candidate student list
#newStudent should be a dictionary in the same format as the student dictionary within students
def getKNNStudents(k, newStudent, studentList):
    relationships = {}
    neighbours = []
    newStudentVector = studentToVector(newStudent)
    for id in studentList:
        relationships[id]=cosSimilarity(newStudentVector, studentToVector(students[id]))
    while len(neighbours) < k:
        nearest = max(relationships.keys, key=(lambda k: relationships[k]))
        neighbours.append(nearest)
        relationships.pop(nearest)
    del relationships
    return neighbours

#Will give you x course recommendations based on your K nearest neighbours
def getRecommendations(KNN, x):
    KNNCourses = {}
    recommendations = []
    for id in KNN:
        for course in students[id]["courses"]:
            if course in KNNCourses:
                KNNCourses[course] += 1
            else:
                KNNCourses[course] = 1
    while len(recommendations) < x:
        recommended = max(KNNCourses.keys, key=(lambda k: KNNCourses[k]))
        recommendations.append(recommended)
        KNNCourses.pop(recommended)
    del KNNCourses
    return recommendations

def main(K, newStudent, amount, **keyValuePair):
    ####Converted JSON Format####
    #All courses (Dictionary)
    ##Course number (String Key)
    ##Course (Dictionary)
    ###Property name (String Key)
    ###--"course_name"
    ###--"credit_points"
    ###--"postgraduate"
    ###--"pre-requisites"
    ###--"anti-requisites"
    ###--"description"
    ###--"link"
    ###Property Data (Varies)
    cfile = open("C:\\Users\\Manal\\Desktop\\University\\SES2\\data_test.json", encoding="utf8")
    courses = json.load(cfile)

    ####Expected Converted JSON Format####
    #All students (Dictionary)
    ##student id (String Key)
    ##student (Dictionary)
    ###Property name (String Key)
    ###--"courses"
    ###--"math"
    ###--"physics"
    ###--"english"
    ###--"biology"
    ###--"it"
    ###--"chemistry"
    ###Property Data (Varies)
    ###--courses = String array
    ###--math = boolean (0 or 1)
    ###--"physics" = boolean (0 or 1)
    ###--"english" = boolean (0 or 1)
    ###--"biology" = boolean (0 or 1)
    ###--"it" = boolean (0 or 1)
    ###--"chemistry" = boolean (0 or 1)
    sfile = open("C:\\Users\\Manal\\Desktop\\University\\SES2\\students.json", encoding="utf8")
    students= json.load(sfile)

    studentList = getStudentSet(getMatchingCourseList(keyValuePair))
    KNN = getKNNStudents(K, newStudent, studentList)
    return getRecommendations(KNN, amount)