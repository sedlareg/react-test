import React, { Component, PropTypes } from 'react';

class RepoDetails extends Component {
  static propTypes = {
    params: PropTypes.object,
    repositories: PropTypes.object
  };

  renderRepository () {
    const repository = this.props.repositories.find((repo) => repo.name === this.props.params.repo_name);
    let stars = [];
    for (var i = 0; i < repository.stargazers_count; i++) {
      stars.push('*');
    }
    return (
      <div>
        <h2>{repository.name}</h2>
        <p>{repository.description}</p>
        <span>{stars}</span>
      </div>
    );
  }
  render () {
    if (this.props.repositories.length > 0) {
      return this.renderRepository();
    } else {
      return <h4>Loading...</h4>;
    }
  }
}
export default RepoDetails;
