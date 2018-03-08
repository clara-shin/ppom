import React, { Component } from 'react';

import Guide from '../components/Guide';

export default class GuidePage extends Component {
  static defaultProps = {
    isFirstGuide: false,
  }

  render() {
    return (
      <div>
        <Guide {...this.props} />
      </div>
    );
  }
}
