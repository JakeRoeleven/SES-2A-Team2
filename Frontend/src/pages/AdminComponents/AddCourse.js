import React from 'react'

export default function AddCourse() {
    return (
        <form action="./AdminDash" method="post">
            <table>
                <tr>
                    <td><label for="cid">Course ID</label></td>
                    <td><input type="text" id="cid" name="courseID"></input></td>
                </tr>
                <tr>
                    <td><label for="cname">Course Name</label></td>
                    <td><input type="text" id="courseName" name="courseName"></input></td>
                </tr>
                <tr>
                    <td><label for="cpoints">Course Points</label></td>
                    <td><input type="text" id="coursePoints" name="coursePoints"></input></td>
                </tr>
                <tr>
                    <td><label for="cpostgrad">Postgraduate</label></td>
                    <td><input type="text" id="postgraduate" name="postgraduate"></input></td>
                </tr>
                <tr>
                    <td><label for="crequirements">Course Pre-requisites</label></td>
                    <td><input type="text" id="courserequirements" name="courseRequirements"></input></td>
                </tr>
                <tr>
                    <td><label for="cantireqs">Course Anit-requisites</label></td>
                    <td><input type="text" id="cantireqs" name="cantireqs"></input></td>
                </tr>
                <tr>
                    <td><label for="cdescription">Course Description:</label></td>
                    <td><input type="text" id="cdescription" name="cdescription"></input></td>
                </tr>
                <tr>
                    <td><label for="clink">Course Link:</label></td>
                    <td><input type="text" id="clink" name="clink"></input></td>
                </tr>
                <tr>
                    <td></td>
                    <td><input type="submit" id="addcourse" name="addcourse" value="Add Course"></input></td>
                </tr>
            </table>
        </form>
    )
}
