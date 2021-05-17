import json
import os
import sys

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
    if (bottom == 0): 
        return 0
    else: 
        return top/bottom

#Generic function to get candidate course set
def getMatchingCourseList(courses, **keyValuePair):
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
def getStudentSet(students, courseList):
    #This will probably be a db call in the actual version
    studentList = []
    for id in students:
        for course in courseList:
            if course in students[id]["courses_completed"]:
                studentList.append(id)
                break
    return studentList

#transforms a student in the format of the student dictionary within students into a vector for cosine similarity
def studentToVector(student):
    studentVector = []
    for value in student["interests"]:
        studentVector.append(value)
    return studentVector

#will return the k nearest neighbours of newStudent in the candidate student list
#newStudent should be a dictionary in the same format as the student dictionary within students
def getKNNStudents(k, newStudent, studentList, students):
    relationships = {}
    neighbours = []
    newStudentVector = studentToVector(newStudent)
    for id in studentList:
        relationships[id]=cosSimilarity(newStudentVector, studentToVector(students[id]))
    while len(neighbours) < k:
        nearest = max(relationships, key=(relationships.get))
        neighbours.append(nearest)
        relationships.pop(nearest)
    del relationships
    return neighbours

#Will give you x course recommendations based on your K nearest neighbours
def getRecommendations(KNN, x, students):
    KNNCourses = {}
    recommendations = []
    for id in KNN:
        for course in students[id]["courses_completed"]:
            if course in KNNCourses:
                KNNCourses[course] += 1
            else:
                KNNCourses[course] = 1
    while len(recommendations) < x and len(recommendations) < len(KNNCourses):
        recommended = max(KNNCourses, key=(KNNCourses.get))
        recommendations.append(recommended)
        KNNCourses.pop(recommended)
    del KNNCourses
    return recommendations

def main(courses, students, newStudent, K, amount, **keyValuePair):

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

    ####Expected Converted JSON Format####
    #All students (Dictionary)
    ##student id (String Key)
    ##student (Dictionary)
    ###Property name (String Key)
    ###--"courses_completed"
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

    studentList = getStudentSet(students, getMatchingCourseList(courses, **keyValuePair));
    KNN = getKNNStudents(K, newStudent, studentList, students);
    print(getRecommendations(KNN, amount, students));
    exit()


# Pass system arguments
data_in = json.loads(sys.stdin.read())
student_faculty = data_in['student']['major']
main(data_in['courses'], data_in['students'], data_in['student'], 2, 10)