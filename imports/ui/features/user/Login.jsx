import React from 'react';
import { Row, Col, FormGroup, ControlLabel, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import validate from '../../../modules/validate';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const component = this;

    validate(component.form, {
      rules: {
        username: {
          required: true,
        },
        password: {
          required: true,
        },
      },
      messages: {
        username: {
          required: 'Need an username here.',

        },
        password: {
          required: 'Need a password here.',
        },
      },
      submitHandler() { component.handleSubmit(); },
    });
  }

  handleSubmit() {
    const { history } = this.props;

    Meteor.loginWithPassword(this.username.value, this.password.value, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Welcome back!', 'success');
        history.push('/dashboard');
      }
    });
  }

  render() {
    return (<div className="Login">
      <Row>
        <Col xs={12} sm={6} md={5} lg={4}>
          <h4 className="page-header">Log In</h4>
          <Row>
            <Col xs={12}>

            </Col>
          </Row>
          <form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
            <FormGroup>
              <ControlLabel>username</ControlLabel>
              <input
                type="username"
                name="username"
                ref={username => (this.username = username)}
                className="form-control"
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel className="clearfix">
                <span className="pull-left">Password</span>
                <Link className="pull-right" to="/recover-password">Forgot password?</Link>
              </ControlLabel>
              <input
                type="password"
                name="password"
                ref={password => (this.password = password)}
                className="form-control"
              />
            </FormGroup>
            <Button type="submit" bsStyle="success">Log In</Button>

              <p>{'Don\'t have an account?'} <Link to="/signup">Sign Up</Link>.</p>

          </form>
        </Col>
      </Row>
    </div>);
  }
}

Login.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Login;
