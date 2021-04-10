import React from 'react'

export default function addCourse() {
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
                    <td><label for="ctype">Course Type:</label></td>
                    <td><input type="text" id="ctype" name="ctype"></input></td>
                </tr>
                <tr>
                    <td></td>
                    <td><input type="submit" id="addcourse" name="addcourse" value="Add Course"></input></td>
                </tr>
            </table>
        </form>
    )
}
