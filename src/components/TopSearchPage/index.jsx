import React, { Component } from 'react';
import { Input } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

class TopSearchPage extends Component {
  handleFormSubmit = (value) => {
    const { onSearch } = this.props;
    // eslint-disable-next-line no-console
    console.log(value);
    onSearch(value);
  };

  render() {
    const { placeholder, btnText, children } = this.props;
    const mainSearch = (
      <div
        style={{
          textAlign: 'center',
        }}
      >
        <Input.Search
          placeholder={placeholder && placeholder.length > 0 ? placeholder : '请输入'}
          enterButton={btnText && btnText.length > 0 ? btnText : '搜索'}
          size="large"
          onSearch={this.handleFormSubmit}
          style={{
            maxWidth: 522,
            width: '100%',
          }}
        />
      </div>
    );

    return <PageHeaderWrapper content={mainSearch}>{children}</PageHeaderWrapper>;
  }
}

export default TopSearchPage;
