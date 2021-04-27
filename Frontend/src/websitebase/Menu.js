import React from 'react';
import { Container, Menu } from 'semantic-ui-react';

export default () => (
  <Menu>
    <Container>
      <Menu.Menu position="left">
        <Menu.Item as="a" name="Course List">
          Course List
        </Menu.Item>

        <Menu.Item as="a" name="Completed Courses">
          Completed Courses
        </Menu.Item>

        <Menu.Item as="a" name="Course Preferences">
          Course Preferences
        </Menu.Item>

        <Menu.Item as="a" name="Course Recommendation">
          Course Recommendation
        </Menu.Item>
      </Menu.Menu>

      <Menu.Menu position="right">
        
        <Menu.Item as="a" name="login">
          Login
        </Menu.Item>

        <Menu.Item as="a" name="register">
          Register
        </Menu.Item>
      </Menu.Menu>
      
    </Container>
  </Menu>
);