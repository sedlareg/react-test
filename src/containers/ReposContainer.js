import React, {Component, PropTypes} from 'react';
import 'whatwg-fetch';
import { Link } from 'react-router';

class ReposContainer extends Component {
  static propTypes = {
    children: PropTypes.element,
    route: PropTypes.object
  };
  constructor () {
    super(...arguments);
    this.state = {
      repositories: []
    };
  }

  componentDidMount () {
    fetch('https://api.github.com/users/pro-react/repos')
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Server response wasn't OK");
        }
      })
      .then((responseData) => {
        this.setState({repositories: responseData});
      })
      .catch((error) => {
        console.log(error);
        this.props.history.pushState(null, '/error');
      });
  }

  render () {
    console.log(this.props.children);
    const repos = this.state.repositories.map((repo) => (
      <li key={repo.id}>
        <Link to={`/repo/${repo.name}`}>{repo.name}</Link>
      </li>
    ));

    const child = this.props.children && React.cloneElement(this.props.children,
        { repositories: this.state.repositories }
      );

    return (
      <div className='container'>
        <h1>{this.props.route.title}</h1>
        <ul>
          {repos}
        </ul>
        {child}
      </div>
    );
  }
}
export default ReposContainer;
